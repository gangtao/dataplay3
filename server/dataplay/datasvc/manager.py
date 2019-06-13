import os
import base64

from sanic.log import logger
from ..confsvc.manager import ConfigurationManager
from .registry import get_dataset_class
from .csv import CSV_DATASET_PATH


class DatasetManager:
    @staticmethod
    def list_datasets():
        config = ConfigurationManager.get_confs('datasets')
        datasets = []
        for section in config.sections():
            item = {}
            item['id'] = section
            item['name'] = config.get(section, 'name')
            item['type'] = config.get(section, 'type')
            item['description'] = config.get(section, 'description')
            datasets.append(item)

        return datasets

    @staticmethod
    def get_dataset(id):
        config = ConfigurationManager.get_confs('datasets')
        content = config.get(id, 'content')
        name = config.get(id, 'name')
        description = config.get(id, 'description')
        dataset_type = config.get(id, 'type')
        dataset_class = get_dataset_class(dataset_type)

        dataset = dataset_class(id, name, content, description)
        return dataset

    @staticmethod
    def add_dataset(payload):
        domain = 'datasets'

        if 'id' not in payload:
            raise RuntimeError(f'dataset payload must contain id')

        if 'name' not in payload:
            raise RuntimeError(f'dataset payload must contain name')

        if 'payload' in payload:
            data = base64.b64decode(payload['payload'])
            name = f'{payload["name"]}.csv'
            payload['content'] = name
            payload['type'] = 'csv'
            DatasetManager.upload_dataset(name, data)

        section = payload.get('id')
        value = {}
        fields = ['content', 'name', 'type', 'description']
        for field in fields:
            field_value = payload.get(field)
            value[field] = field_value

        ConfigurationManager.add_section(domain, section, value)

    @staticmethod
    def delete_dataset(id):
        dataset = DatasetManager.get_dataset(id)
        domain = 'datasets'
        ConfigurationManager.remove_section(domain, id)

        try:
            dataset.delete()
        except Exception:
            logger.warning(f'faile to delete dataset {id}')

    @staticmethod
    def upload_dataset(name, content):
        # TODO check dir based on file type
        upload_dir = CSV_DATASET_PATH
        filepath = os.path.join(upload_dir, name)
        with open(filepath, "wb") as f:
            f.write(content)

    @staticmethod
    def query2dataset(
        source_dataset_id, query_type, query, dataset_id, dataset_name, dataset_description
    ):
        dataset = DatasetManager.get_dataset(source_dataset_id)
        query_df = dataset.query(query, query_type)
        content = query_df.to_csv()
        filename = f'{dataset_id}.csv'
        DatasetManager.upload_dataset(filename, content.encode())

        creation_payload = {}
        creation_payload['id'] = dataset_id
        creation_payload['name'] = dataset_name
        creation_payload['content'] = filename
        creation_payload['type'] = 'csv'
        creation_payload['description'] = dataset_description

        DatasetManager.add_dataset(creation_payload)
