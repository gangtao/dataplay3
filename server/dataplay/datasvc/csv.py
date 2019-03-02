import os
from pathlib import Path
import pandas as pd
from sanic.log import logger

from .base import BaseDataset
from .constant import CSV_DATASET_PATH


class CSV(BaseDataset):
    def __init__(self, id):
        BaseDataset.__init__(self, id)
        self.name = id
        self.path = os.path.join(CSV_DATASET_PATH, f'{id}.csv')

    @staticmethod
    def list_datasets():
        flist = [
            Path(f).stem
            for f in os.listdir(CSV_DATASET_PATH)
            if os.path.isfile(os.path.join(CSV_DATASET_PATH, f)) and Path(f).suffix == '.csv'
        ]

        return [{'id': f, 'name': f, 'type': 'CSV'} for f in flist]

    def _load(self):
        logger.debug(f'load csv from {self.path}')
        self.df = pd.read_csv(self.path)
        logger.debug(f'load csv from {self.path} success')
