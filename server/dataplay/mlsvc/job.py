import os
import uuid
import shutil
from abc import ABC, abstractmethod
from enum import Enum

from sanic.log import logger

from ..confsvc.manager import ConfigurationManager


class MLJobStatus(Enum):
    INITIALIZED = 0
    TRAINING = 1
    VALIDATING = 2
    SUCCESS = 3
    FAILED = 4


class MLJob(ABC):
    def __init__(self, name, df):
        self.id = str(uuid.uuid4())
        self.name = name
        self.df = df
        self.base_dir = ConfigurationManager.get_confs('mljob').get('job', 'dir')
        self.job_dir = os.path.join(self.base_dir, self.id)
        self._init()

    @abstractmethod
    def train(self):
        return NotImplemented

    @abstractmethod
    def predict(self, df):
        return NotImplemented

    def _init(self):
        if os.path.isdir(self.job_dir):
            logger.error(f'job dir {self.job_dir} already exists')
            raise RuntimeError(f'job {self.id} already exists')

        try:
            os.makedirs(self.job_dir)
            self._update_status(MLJobStatus.INITIALIZED)
        except OSError:
            logger.error(f'failed to create job dir {self.job_dir}')
        else:
            logger.debug(f'successfully created the directory {self.job_dir}')

    def _update_status(self, status):
        status_file = os.path.join(self.job_dir, 'status')
        with open(status_file, 'w') as f:
            f.write(str(status.value))

    def get_status(self):
        status_file = os.path.join(self.job_dir, 'status')
        with open(status_file, 'r') as f:
            status_value = f.read()
            return MLJobStatus(int(status_value))

    def clean(self):
        try:
            shutil.rmtree(self.job_dir)
        except Exception:
            logger.exception(f'failed to delete job dir {self.job_dir}')
        else:
            logger.debug(f'successfully deleted the directory {self.job_dir}')
