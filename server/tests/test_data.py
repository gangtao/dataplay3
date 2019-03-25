import json
from dataplay.datasvc.manager import DatasetManager


def is_json(content):
    try:
        json.loads(content)
    except ValueError:
        return False
    return True


def test_data_list():
    files = DatasetManager.list_datasets()
    assert len(files) == 4


def test_query():
    dataset = DatasetManager.get_dataset('iris')
    query_result = dataset.query('sepal_length > sepal_width')
    assert query_result is not None


def test_sqlquery():
    dataset = DatasetManager.get_dataset('iris')
    query_result = dataset.query('SELECT * FROM dataset LIMIT 10;', 'sql')
    assert query_result is not None
    assert query_result['rows'] is not None
    assert len(query_result['rows']) == 10


def test_dataset_to_json():
    files = DatasetManager.list_datasets()
    for file in files:
        id = file['id']
        dataset = DatasetManager.get_dataset(id)
        assert dataset is not None
        # assert type(dataset) == CSV
        payload = json.dumps(dataset.get_payload())
        '''
        with open(f'{id}.json', 'w') as f:
            f.write(payload)
        '''

        assert is_json(payload)
