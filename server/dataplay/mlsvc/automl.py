from .job import MLJob

import autosklearn.classification
import autosklearn.regression
import sklearn.model_selection
import sklearn.metrics
from sklearn import preprocessing

from sanic.log import logger


class AutoMLJob(MLJob):
    def __init__(self, name, df, features, targets, job_option, validation_option):
        MLJob.__init__(self, name, df)
        self.job_option = job_option
        self.validation_option = validation_option
        self.features = features
        self.targets = targets
        self.validation_result = {}
        self._handle_option()

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
            self.train_dataset_X, self.train_dataset_y, random_state=42
        )

    def predict(self, df):
        if not self.model:
            return

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
            df['prediction'] = transformed_predict_result
        else:
            df['prediction'] = predict_result
        return df

    def _handle_option(self):
        self.options = {}
        self.options['time_left_for_this_task'] = 30
        self.options['per_run_time_limit'] = 10


class AutoClassificationJob(AutoMLJob):
    def __init__(self, name, df, features, targets, job_option, validation_option):
        AutoMLJob.__init__(self, name, df, features, targets, job_option, validation_option)

    def train(self):
        logger.debug('start to train')
        self._prepare()
        logger.debug('prepare complete')
        self.model = autosklearn.classification.AutoSklearnClassifier(**self.options)
        self.model.fit(self.X_train, self.y_train)
        logger.debug('train complete')
        self.model_print = self.model.show_models()
        self.model_statistics = self.model.sprint_statistics()
        self._validate()
        logger.debug('validation complete')

    def _validate(self):
        predictions = self.model.predict(self.X_test)
        accuracy = sklearn.metrics.accuracy_score(self.y_test, predictions)
        self.validation_result['accuracy'] = accuracy


class AutoRegressionJob(AutoMLJob):
    def __init__(self, name, df, features, targets, job_option, validation_option):
        AutoMLJob.__init__(self, name, df, features, targets, job_option, validation_option)

    def train(self):
        logger.debug('start to train')
        self._prepare()
        logger.debug('prepare complete')
        self.model = autosklearn.regression.AutoSklearnRegressor(**self.options)
        self.model.fit(self.X_train, self.y_train)
        logger.debug('train complete')
        self.model_print = self.model.show_models()
        self.model_statistics = self.model.sprint_statistics()
        self._validate()
        logger.debug('validation complete')

    def _validate(self):
        predictions = self.model.predict(self.X_test)
        r2 = sklearn.metrics.r2_score(self.y_test, predictions)
        self.validation_result['r2'] = r2
