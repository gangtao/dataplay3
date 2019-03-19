import importlib
import re

from sanic.log import logger


def is_valid_identifier(name):
    return re.match("^[a-zA-Z_][a-zA-Z0-9_-]*$", name) is not None


def get_dataset_class(name):
    item = DatasetTypeRegistry().get(name)
    class_name = item['class']
    if not is_valid_identifier(class_name):
        raise RuntimeError("Failed to load dataset with an invalid name: %s" % name)

    dataset_module = item['module']

    if dataset_module is None:
        raise RuntimeError("Failed to find dataset name: %s in registry" % name)

    try:
        dataset_module = importlib.import_module(dataset_module)
        dataset_class = getattr(dataset_module, class_name)
        return dataset_class
    except ImportError:
        logger.exception('Failed to load dataset module')
        raise ImportError('Failed to load dataset module "%s"' % class_name)
    except AttributeError:
        logger.exception('Failed to load dataset module')
        raise AttributeError('Failed to load dataset class "%s"' % class_name)


class DatasetTypeRegistry:
    instance = None

    def __init__(self):
        if not DatasetTypeRegistry.instance:
            DatasetTypeRegistry.instance = dict()

    def register(self, name, class_name, module):
        logger.debug(
            "DatasetTypeRegistry registered name=%s, class=%s, module=%s"
            % (name, class_name, module)
        )

        if not isinstance(module, str):
            logger.exception("Wrong module provided, %s is not a module." % (module))
            raise RuntimeError('Error while register dataset type "%s %s"' % (name, module))

        try:
            importlib.import_module(module)
        except Exception as e:
            logger.exception("Wrong module provided, failed to load %s as a module." % (module))
            raise RuntimeError(
                'Error while register dataset type "%s %s":%s' % (name, module, str(e))
            )

        item = {}
        item['class'] = class_name
        item['module'] = module
        DatasetTypeRegistry.instance[name] = item

    def get(self, name):
        return DatasetTypeRegistry.instance.get(name)
