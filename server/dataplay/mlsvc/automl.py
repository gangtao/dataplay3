import os
import datetime
import autosklearn.classification
import autosklearn.regression
import sklearn.model_selection
import sklearn.metrics
from sklearn import preprocessing

# used for evaluate model representation
from autosklearn.pipeline.classification import SimpleClassificationPipeline  # noqa: F401
from autosklearn.pipeline.regression import SimpleRegressionPipeline  # noqa: F401
from autosklearn.evaluation.abstract_evaluator import (  # noqa: F401
    MyDummyClassifier,
    MyDummyRegressor,
)

from sanic.log import logger

from .job import MLJob, MLJobStatus
from ..confsvc.manager import ConfigurationManager

PREDICTION_COL = 'prediction'


class AutoMLJob(MLJob):
    def __init__(self, name, dataset, features, targets, job_option, validation_option):
        MLJob.__init__(self, name, dataset)
        self.job_option = job_option
        self.validation_option = validation_option
        self.features = features
        self.targets = targets
        self.validation_result = {}
        if self.job_option is None:
            self.job_option = {}
        if self.validation_option is None:
            self.validation_option = {}
        self._handle_job_option()
        self._handle_validation_option()

    def _build_meta(self):
        MLJob._build_meta(self)
        for attribute in [
            'job_option',
            'validation_option',
            'features',
            'targets',
            'validation_result',
            'training_error',
            'type',
            'start_time',
            'end_time',
            'model_representation',
            'model_stats',
        ]:
            if hasattr(self, attribute):
                self.metadata[attribute] = getattr(self, attribute)

    def _prepare(self):
        '''encoding catagorical data'''
        self.train_dataset_X = self.df[self.features].copy()
        self.train_dataset_y = self.df[self.targets].copy()
        self.feature_types = self.train_dataset_X.dtypes
        self.target_types = self.train_dataset_y.dtypes

        self.feature_encoder = {}
        for index, feature in enumerate(self.features):
            feature_type = self.feature_types[index]
            if feature_type in ['object', 'bool']:
                feature_df = self.train_dataset_X[feature]
                le = preprocessing.LabelEncoder()
                le.fit(feature_df)
                self.train_dataset_X[feature] = le.transform(feature_df)
                self.feature_encoder[feature] = {}
                self.feature_encoder[feature]['index'] = index
                self.feature_encoder[feature]['encoder'] = le

        self.target_encoder = {}
        for index, target in enumerate(self.targets):
            target_type = self.target_types[index]
            if target_type in ['object', 'bool']:
                target_df = self.train_dataset_y[target]
                le = preprocessing.LabelEncoder()
                le.fit(target_df)
                self.train_dataset_y[target] = le.transform(target_df)
                self.target_encoder[target] = {}
                self.target_encoder[target]['index'] = index
                self.target_encoder[target]['encoder'] = le

        self.X_train, self.X_test, self.y_train, self.y_test = sklearn.model_selection.train_test_split(
            self.train_dataset_X, self.train_dataset_y, **self.validation_option
        )

    def _handle_job_option(self):
        job_config = ConfigurationManager.get_confs('mljob')
        default_job_config = {}
        default_job_config['time_left_for_this_task'] = job_config.getint(
            'auto_ml', 'time_left_for_this_task'
        )
        default_job_config['per_run_time_limit'] = job_config.getint(
            'auto_ml', 'per_run_time_limit'
        )
        default_job_config['initial_configurations_via_metalearning'] = job_config.getint(
            'auto_ml', 'initial_configurations_via_metalearning'
        )
        default_job_config['ensemble_size'] = job_config.getint('auto_ml', 'ensemble_size')
        default_job_config['ensemble_nbest'] = job_config.getint('auto_ml', 'ensemble_nbest')
        default_job_config['ensemble_memory_limit'] = job_config.getint(
            'auto_ml', 'ensemble_memory_limit'
        )
        default_job_config['ml_memory_limit'] = job_config.getint('auto_ml', 'ml_memory_limit')

        for key in default_job_config:
            if key not in self.job_option:
                self.job_option[key] = default_job_config[key]

        self.job_option['tmp_folder'] = os.path.join(self.job_dir, 'tmp')
        self.job_option['output_folder'] = os.path.join(self.job_dir, 'output')

    def _handle_validation_option(self):
        validation_config = ConfigurationManager.get_confs('mljob')
        default_validation = {}
        default_validation['test_size'] = validation_config.getfloat(
            'validation_option', 'test_size'
        )
        default_validation['random_state'] = validation_config.getint(
            'validation_option', 'random_state'
        )
        default_validation['shuffle'] = validation_config.getboolean(
            'validation_option', 'shuffle'
        )

        for key in default_validation:
            if key not in self.validation_option:
                self.validation_option[key] = default_validation[key]

    def _parse_model_representation(self):
        # TODO : it is not safe to do so
        model_representation = eval(self.model.show_models())

        representations = []
        for model in model_representation:
            weight, modeli = model
            representation = {}
            representation['weight'] = weight
            representation['steps'] = []
            if hasattr(modeli, 'steps'):
                steps = modeli.steps
                for step in steps:
                    name, val = step
                    if name in ['classifier', 'preprocessor', 'regressor']:
                        type_name = type(val.choice).__name__
                        representation['steps'].append(f'{name}:{type_name}')
                    else:
                        representation['steps'].append(name)
                representations.append(representation)
            else:
                representation['steps'].append(type(modeli).__name__)

        self.model_representation = representations

    def train(self):
        logger.debug('start to train')
        self._update_status(MLJobStatus.TRAINING)
        self.start_time = datetime.datetime.now().timestamp()
        try:
            self._save_meta()
            self._prepare()
            logger.debug('prepare complete')
            self.model.fit(self.X_train, self.y_train)
            self._save_model()
            logger.debug('train complete')
            self._update_status(MLJobStatus.VALIDATING)
            self._validate()
            logger.debug('validation complete')
            self._update_status(MLJobStatus.SUCCESS)
            self.end_time = datetime.datetime.now().timestamp()
            self._parse_model_representation()
            self.model_stats = self.model.sprint_statistics()
            self._save_meta()
        except Exception as e:
            logger.exception(f'faile to train the auto ml job {e}')
            self._update_status(MLJobStatus.FAILED)
            self.training_error = str(e)
            self._save_meta()

    def predict(self, df):
        if not self.model:
            return

        df_copy = df.copy()

        X = df[self.features]
        # todo check if df contain required features
        for feature in self.features:
            if feature in self.feature_encoder:
                encoder = self.feature_encoder[feature]['encoder']
                logger.debug(f'transform feature {feature}')
                X[feature] = encoder.transform(X[feature])

        logger.debug(f'predict on inpit {X}')
        predict_result = self.model.predict(X)

        target = self.targets[0]
        if target in self.target_encoder:
            target_encoder = self.target_encoder[target]['encoder']
            transformed_predict_result = target_encoder.inverse_transform(predict_result)
            df_copy['prediction'] = transformed_predict_result
        else:
            df_copy['prediction'] = predict_result
        return df_copy


class AutoClassificationJob(AutoMLJob):
    def __init__(self, name, dataset, features, targets, job_option, validation_option):
        AutoMLJob.__init__(
            self, name, dataset, features, targets, job_option, validation_option
        )
        self.type = 'AutoClassificationJob'
        self.model = autosklearn.classification.AutoSklearnClassifier(**self.job_option)

    def _validate(self):
        predictions = self.model.predict(self.X_test)
        accuracy = sklearn.metrics.accuracy_score(self.y_test, predictions)
        self.validation_result['accuracy'] = accuracy

        f1 = sklearn.metrics.f1_score(self.y_test, predictions, average='micro')
        precision = sklearn.metrics.precision_score(self.y_test, predictions, average='micro')
        recall = sklearn.metrics.recall_score(self.y_test, predictions, average='micro')
        self.validation_result['f1'] = f1
        self.validation_result['precision'] = precision
        self.validation_result['recall'] = recall

        # caculate confusion matrix
        target = self.targets[0]
        labels = self.train_dataset_y[target].unique()
        confusion_matrix = {}
        confusion_matrix['value'] = sklearn.metrics.confusion_matrix(
            self.y_test, predictions, labels=labels
        ).tolist()
        if target in self.target_encoder:
            target_encoder = self.target_encoder[target]['encoder']
            labels = target_encoder.inverse_transform(labels)
        confusion_matrix['lables'] = labels.tolist()
        self.validation_result['confusion_matrix'] = confusion_matrix


class AutoRegressionJob(AutoMLJob):
    def __init__(self, name, dataset, features, targets, job_option, validation_option):
        AutoMLJob.__init__(
            self, name, dataset, features, targets, job_option, validation_option
        )
        self.type = 'AutoRegressionJob'
        self.model = autosklearn.regression.AutoSklearnRegressor(**self.job_option)

    def _validate(self):
        predictions = self.model.predict(self.X_test)
        r2 = sklearn.metrics.r2_score(self.y_test, predictions)
        mean_squared_error = sklearn.metrics.mean_squared_error(self.y_test, predictions)
        mean_absolute_error = sklearn.metrics.mean_absolute_error(self.y_test, predictions)
        median_absolute_error = sklearn.metrics.median_absolute_error(self.y_test, predictions)
        self.validation_result['r2'] = r2
        self.validation_result['mean_squared_error'] = mean_squared_error
        self.validation_result['mean_absolute_error'] = mean_absolute_error
        self.validation_result['median_absolute_error'] = median_absolute_error
