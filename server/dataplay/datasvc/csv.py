import os
from pathlib import Path
import pandas as pd
from sanic.log import logger

from .base import BaseDataset
from .constant import CSV_DATASET_PATH


class CVSDataset(BaseDataset):
    def __init__(self, name):
        BaseDataset.__init__(self, name)
        self.id = name
        self.path = os.path.join(CSV_DATASET_PATH, f'{name}.csv')

    @staticmethod
    def list_csv():
        flist = [
            Path(f).stem
            for f in os.listdir(CSV_DATASET_PATH)
            if os.path.isfile(os.path.join(CSV_DATASET_PATH, f)) and Path(f).suffix == '.csv'
        ]

        return [{"id": f, "name": f} for f in flist]

    def _load(self):
        logger.debug(f'load csv from {self.path}')
        self.df = pd.read_csv(self.path)
        logger.debug(f'load csv from {self.path} success')
