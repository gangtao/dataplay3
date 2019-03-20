from ..confsvc.manager import ConfigurationManager
from .registry import get_dataset_class


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
        file = config.get(id, 'file')
        name = config.get(id, 'name')
        description = config.get(id, 'description')
        dataset_type = config.get(id, 'type')
        dataset_class = get_dataset_class(dataset_type)

        dataset = dataset_class(id, name, file, description)
        return dataset
