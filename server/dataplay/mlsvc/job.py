import os
import uuid
import shutil
import json
from abc import ABC, abstractmethod
from enum import Enum
from joblib import dump, load

from sanic.log import logger

from ..confsvc.manager import ConfigurationManager
from ..utils.filelock import FileLock


class MLJobStatus(Enum):
    INITIALIZED = 0
    TRAINING = 1
    VALIDATING = 2
    SUCCESS = 3
    FAILED = 4


class MLJob(ABC):
    base_dir = ConfigurationManager.get_confs('mljob').get('job', 'dir')

    def __init__(self, name, df):
        self.id = str(uuid.uuid4())
        self.name = name
        self.df = df
        self.job_dir = os.path.join(MLJob.base_dir, self.id)
        self.metadata = {}
        self._init()

    @abstractmethod
    def train(self):
        return NotImplemented

    @abstractmethod
    def predict(self, df):
        return NotImplemented

    def _build_meta(self):
        self.metadata['name'] = self.name

    def _save_meta(self):
        self._build_meta()
        meta_file = os.path.join(self.job_dir, 'meta.json')
        with FileLock(meta_file):
            with open(meta_file, 'w') as f:
                f.write(json.dumps(self.metadata))

    def _save_model(self):
        logger.debug(
            f'save model for class={type(self).__name__} id={self.id} name={self.name}'
        )
        model_file = os.path.join(self.job_dir, 'model.joblib')
        dump(self, model_file)
        logger.debug('save model complete')

    @staticmethod
    def get_meta(id):
        meta_file = os.path.join(MLJob.base_dir, id, 'meta.json')
        with FileLock(meta_file):
            with open(meta_file) as f:
                return json.loads(f.read())

    @staticmethod
    def get_model(id):
        model_file = os.path.join(MLJob.base_dir, id, 'model.joblib')
        model = load(model_file)
        return model

    def _init(self):
        if os.path.isdir(self.job_dir):
            logger.error(f'job dir {self.job_dir} already exists')
            raise RuntimeError(f'job {self.id} already exists')

        try:
            os.makedirs(self.job_dir)
            self._update_status(MLJobStatus.INITIALIZED)
            self._save_meta()
        except OSError:
            logger.error(f'failed to create job dir {self.job_dir}')
        else:
            logger.debug(f'successfully created the directory {self.job_dir}')

    def _update_status(self, status):
        try:
            status_file = os.path.join(self.job_dir, 'status')
            with FileLock(status_file):
                with open(status_file, 'w') as f:
                    f.write(str(status.value))
        except Exception:
            raise RuntimeError(f'failed to update status for ml job {self.id}')

    @staticmethod
    def get_status_by_id(id):
        status_file = os.path.join(MLJob.base_dir, id, 'status')
        with FileLock(status_file):
            with open(status_file) as f:
                status_value = f.read()
                return MLJobStatus(int(status_value))

    def get_status(self):
        return MLJob.get_status_by_id(self.id)

    def clean(self):
        try:
            shutil.rmtree(self.job_dir)
        except Exception:
            logger.exception(f'failed to delete job dir {self.job_dir}')
        else:
            logger.debug(f'successfully deleted the directory {self.job_dir}')
