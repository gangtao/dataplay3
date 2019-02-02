import os
from pathlib import Path

from .base import BaseDataset


csv_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', 'dataset')


def list_csv():
    flist = [
        Path(f).stem
        for f in os.listdir(csv_path)
        if os.path.isfile(os.path.join(csv_path, f)) and Path(f).suffix == '.csv'
    ]
    return flist


def save_scv(data):
    pass


class CVSDataset(BaseDataset):
    def __init__(self, name):
        BaseDataset.__init__(self)
        self._path = os.path.join(csv_path, f'{name}.csv')
        self._load()

    def _load(self):
        with open(self._path, "r") as file:
            self._content = file.read()

    def save(self):
        pass

    def content(self):
        return self._content
