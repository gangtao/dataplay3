import uuid


class BaseDataset(object):
    def __init__(self):
        # Generate an random UUID to reference this model
        self._uuid = str(uuid.uuid4())
        self._name = None
