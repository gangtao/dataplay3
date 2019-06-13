import pytest
import base64

from dataplay.datasvc.manager import DatasetManager


def test_adddataset():
    encoded_data = base64.b64encode(b'A,B,C,D\n1,2,3,4')
    payload = {
        "id": "b64test",
        "name": "b64test",
        "payload": encoded_data,
        "description": "b64test dataset",
    }

    try:
        DatasetManager.add_dataset(payload)

        DatasetManager.delete_dataset(payload['id'])
    except Exception:
        pytest.fail('should not raise execption')
