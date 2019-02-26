import os
import pandas as pd
from abc import ABC, abstractmethod
from sanic.log import logger

from .constant import CSV_DATASET_PATH, QUERY_TYPE_NORMAL, QUERY_TYPE_SQL


class BaseDataset(ABC):
    def __init__(self, id):
        self.id = id
        self.name = None
        self.df = None
        self.payload = None
        self.description = ''

    @abstractmethod
    def _load(self):
        return self.df

    @staticmethod
    def list_datasets():
        return None

    def save(self):
        if self.df is None:
            self._load()
        file_name = f'{self.name}.csv'
        file_path = os.path.join(CSV_DATASET_PATH, file_name)
        self.df.to_csv(file_path)

    def query(self, query_str, query_type=QUERY_TYPE_NORMAL):
        if self.df is None:
            self._load()

        if query_str == '':
            return self.get_payload()

        if query_type == QUERY_TYPE_NORMAL:
            # http://jose-coto.com/query-method-pandas
            df = self.df.query(query_str)
            payload = {}
            payload["cols"] = list(df.columns.values)
            payload["rows"] = df.get_values().tolist()
            return payload
        elif query_type == QUERY_TYPE_SQL:
            # does not support yet,
            # TODO: integrate with https://github.com/yhat/pandasql/
            logger.warning(f'query type {query_type} is not supported')
            return None
        else:
            logger.warning(f'query type {query_type} is not supported')
            return None

    def get_payload(self):
        # lazy load dataset
        if self.df is None:
            self._load()

        if self.df is None:
            logger.warning('call payload with load is none')
            return None

        if self.payload is None:
            self.payload = {}
            self.df = self.df.where(pd.notnull(self.df), None)
            self.payload["id"] = self.name
            self.payload["name"] = self.name
            self.payload["cols"] = list(self.df.columns.values)
            self.payload["rows"] = self.df.get_values().tolist()
            logger.debug('payload is filled ')

        return self.payload
