import os

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
        # TODO: validation payload
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
