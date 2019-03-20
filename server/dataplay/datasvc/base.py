import pandas as pd
from pandasql import sqldf
from abc import ABC, abstractmethod
from sanic.log import logger

from .constant import QUERY_TYPE_NORMAL, QUERY_TYPE_SQL


class BaseDataset(ABC):
    def __init__(self, id, name, content, description):
        self.id = id
        self.name = name
        self.content = content
        self.description = description
        self.df = None
        self.payload = None

    @abstractmethod
    def _load(self):
        return self.df

    @abstractmethod
    def save(self):
        pass

    @abstractmethod
    def delete(self):
        pass

    def query(self, query_str, query_type=QUERY_TYPE_NORMAL):
        if self.df is None:
            self._load()

        if query_str == '':
            return self.get_payload()

        payload = {}
        query_result = None

        if query_type == QUERY_TYPE_NORMAL:
            # http://jose-coto.com/query-method-pandas
            query_result = self.df.query(query_str)
        elif query_type == QUERY_TYPE_SQL:
            # TODO: integrate with https://github.com/yhat/pandasql/
            dataset = self.df
            query_result = sqldf(query_str, locals())
        else:
            logger.warning(f'query type {query_type} is not supported')
            return None

        payload["cols"] = list(query_result.columns.values)
        payload["rows"] = query_result.get_values().tolist()
        return payload

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
