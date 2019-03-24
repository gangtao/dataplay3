import os
import uuid
from abc import ABC, abstractmethod

from sanic.log import logger

from ..confsvc.manager import ConfigurationManager


class MLJob(object):
    def __init__(self, name, df):
        self.id = str(uuid.uuid4())
        self.name = name
        self.dataset = df
        self.base_dir = ConfigurationManager.get_confs(
            'mljob').get('job', 'dir')
        self.job_dir = os.path.join(self.base_dir, self.id)
        self._init()

    @abstractmethod
    def train(self):
        return NotImplemented

    def _init(self):
        if os.path.isdir(self.job_dir):
            logger.error(f'job dir {self.job_dir} already exists')
            raise RuntimeError(f'job {self.id} already exists')

        try:
            os.makedirs(self.job_dir)
        except OSError:
            logger.error(f'failed to create job dir {self.job_dir}')
        else:
            logger.debug(f'successfully created the directory {self.job_dir}')

    def clean(self):
        try:
            os.rmdir(self.job_dir)
        except OSError:
            logger.error(f'failed to delete job dir {self.job_dir}')
        else:
            logger.debug(f'successfully deleted the directory {self.job_dir}')
