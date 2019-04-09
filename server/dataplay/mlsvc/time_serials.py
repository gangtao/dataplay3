import datetime
import pandas as pd
from fbprophet import Prophet

from sanic.log import logger

from .job import MLJob, MLJobStatus


class TimeSerialsForecastsJob(MLJob):
    def __init__(self, name, dataset, features, targets, job_option):
        MLJob.__init__(self, name, dataset)
        self.job_option = job_option
        self.features = features
        self.targets = targets
        if self.job_option is None:
            self.job_option = {}
        self._handle_job_option()
        self.type = 'TimeSerialsForecastsJob'
        self.model = Prophet()

    def _build_meta(self):
        MLJob._build_meta(self)
        for attribute in [
            'job_option',
            'features',
            'targets',
            'type',
            'start_time',
            'end_time',
        ]:
            if hasattr(self, attribute):
                self.metadata[attribute] = getattr(self, attribute)

    def _prepare(self):
        self.train_dataset = self.df.copy()
        if self.features is None or len(self.features) != 1:
            raise RuntimeError('feature size must be 1')

        if self.targets is None or len(self.targets) != 1:
            raise RuntimeError('target size must be 1')

        # convert time column to timestamp
        self.train_dataset['ds'] = pd.to_datetime(
            self.train_dataset[self.features[0]], format=self.job_option['time_format']
        )
        # convert target to numeric
        self.train_dataset['y'] = pd.to_numeric(
            self.train_dataset[self.targets[0]], errors='coerce').fillna(0)
        self.train_dataset = self.train_dataset[['ds', 'y']]

    def _handle_job_option(self):
        self.job_option['time_format'] = None

    def train(self):
        logger.debug('start to train')
        self._update_status(MLJobStatus.TRAINING)
        self.start_time = datetime.datetime.now().timestamp()
        try:
            self._save_meta()
            self._prepare()
            logger.debug('prepare complete')
            self.model.fit(self.train_dataset)
            logger.debug('train complete')
            self._save_model()
            self._update_status(MLJobStatus.SUCCESS)
            self.end_time = datetime.datetime.now().timestamp()
            self._save_meta()
        except Exception as e:
            self._update_status(MLJobStatus.FAILED)
            self.training_error = str(e)
            self._save_meta()

    def future(self, periods=365):
        return self.model.make_future_dataframe(periods=periods)

    def predict(self, df):
        if not self.model:
            return

        predict_dataset = df.copy()
        predict_dataset['ds'] = pd.to_datetime(
            df[self.features[0]], format=self.job_option['time_format']
        )
        predict_dataset = predict_dataset[['ds']]
        forecast = self.model.predict(predict_dataset)
        return forecast
