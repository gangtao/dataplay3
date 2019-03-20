import os
import pandas as pd
from sanic.log import logger

from .base import BaseDataset
from .constant import CSV_DATASET_PATH


class CSV(BaseDataset):
    def __init__(self, id, name, file, description):
        BaseDataset.__init__(self, id, name, file, description)
        self.path = os.path.join(CSV_DATASET_PATH, file)

    def _load(self):
        logger.debug(f'load csv from {self.path}')
        self.df = pd.read_csv(self.path)
        logger.debug(f'load csv from {self.path} success')

    def _save(self):
        if self.df is None:
            self._load()
        file_name = f'{self.id}.csv'
        file_path = os.path.join(CSV_DATASET_PATH, file_name)
        self.df.to_csv(file_path)
