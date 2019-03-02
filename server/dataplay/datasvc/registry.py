import importlib
import re

from sanic.log import logger


def is_valid_identifier(name):
    return re.match("^[a-zA-Z_][a-zA-Z0-9_-]*$", name) is not None


def get_dataset_class(name):
    if not is_valid_identifier(name):
        raise RuntimeError("Failed to load dataset with an invalid name: %s" % name)

    dataset_module = DatasetTypeRegistry().get(name)

    if dataset_module is None:
        raise RuntimeError("Failed to find dataset name: %s in registry" % name)

    try:
        dataset_module = importlib.import_module(dataset_module)
        dataset_class = getattr(dataset_module, name)
        return dataset_class
    except ImportError as e:
        logger.debug(e)
        logger.exception("Exception caught here.")
        raise ImportError('Failed to load dataset module "%s"' % name)
    except AttributeError as e:
        logger.debug(e)
        raise AttributeError('Failed to load dataset class "%s"' % name)


class DatasetTypeRegistry:
    instance = None

    def __init__(self):
        if not DatasetTypeRegistry.instance:
            DatasetTypeRegistry.instance = dict()

    def register(self, name, module):
        logger.debug("DatasetTypeRegistry registered name=%s, module=%s" % (name, module))

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
        DatasetTypeRegistry.instance[name] = module

    def get(self, name):
        return DatasetTypeRegistry.instance.get(name)
