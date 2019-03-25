from dataplay.confsvc.manager import ConfigurationManager
from dataplay.datasvc.registry import DatasetTypeRegistry


dataset_type_config = ConfigurationManager.get_confs('dataset_type')
dataset_registry = DatasetTypeRegistry()
for section in dataset_type_config.sections():
    module_name = dataset_type_config.get(section, 'module')
    class_name = dataset_type_config.get(section, 'class')
    dataset_registry.register(section, class_name, module_name)
