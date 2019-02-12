import os
from pathlib import Path
import pandas as pd

from .base import BaseDataset


csv_path = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '..', 'dataset')


class CVSDataset(BaseDataset):
    def __init__(self, name):
        BaseDataset.__init__(self)
        self._name = name
        self._payload = {}
        self._path = os.path.join(csv_path, f'{name}.csv')
        self._load()

    @staticmethod
    def list_csv():
        flist = [
            Path(f).stem
            for f in os.listdir(csv_path)
            if os.path.isfile(os.path.join(csv_path, f)) and Path(f).suffix == '.csv'
        ]

        return [{"id": f, "name": f} for f in flist]

    def _load(self):
        self._df = pd.read_csv(self._path)
        self._payload["id"] = self._name
        self._payload["name"] = self._name
        self._payload["cols"] = list(self._df.columns.values)
        self._payload["rows"] = self._df.get_values().tolist()

    def save(self):
        pass

    def payload(self):
        return self._payload
