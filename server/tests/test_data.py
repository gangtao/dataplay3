import json
import pytest
from dataplay.datasvc.manager import DatasetManager
from dataplay.datasvc.utils import df_to_cols_rows


def is_json(content):
    try:
        json.loads(content)
    except ValueError:
        return False
    return True


def test_data_list():
    DatasetManager.list_datasets()


def test_query():
    dataset = DatasetManager.get_dataset('iris')
    query_result = dataset.query('sepal_length > sepal_width')
    assert query_result is not None


def test_sqlquery():
    dataset = DatasetManager.get_dataset('iris')
    query_result = dataset.query('SELECT * FROM dataset LIMIT 10;', 'sql')
    assert query_result is not None

    cols, rows = df_to_cols_rows(query_result)
    assert rows is not None
    assert len(rows) == 10


def test_dataset_to_json():
    files = DatasetManager.list_datasets()
    for file in files:
        id = file['id']
        dataset = DatasetManager.get_dataset(id)
        assert dataset is not None
        payload = json.dumps(dataset.get_payload())
        '''
        with open(f'{id}.json', 'w') as f:
            f.write(payload)
        '''

        assert is_json(payload)


def test_query2dataset():
    payload = {
        "source_dataset_id": "iris",
        "query_type": "sql",
        "query": "SELECT * FROM dataset LIMIT 20;",
        "dataset_id": "query2dataset",
        "dataset_name": "query2dataset",
        "dataset_description": "test query to dataset",
    }

    try:
        DatasetManager.query2dataset(**payload)
        DatasetManager.delete_dataset(payload['dataset_id'])
    except Exception:
        pytest.fail('query to dataset should not raise error')
