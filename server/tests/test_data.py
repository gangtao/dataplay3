import json
from dataplay.datasvc.csv import CVSDataset


def is_json(content):
    try:
        json.loads(content)
    except ValueError as e:
        return False
    return True


def test_data_list():
    files = CVSDataset.list_csv()
    assert len(files) == 25

def test_query():
    dataset = CVSDataset('iris')
    query_result = dataset.query('sepal_length > sepal_width')
    assert query_result is not None

def test_dataset_to_json():
    files = CVSDataset.list_csv()
    for file in files:
        id = file['id']
        dataset = CVSDataset(id)
        assert dataset is not None
        assert type(dataset) == CVSDataset
        payload = json.dumps(dataset.get_payload())
        '''
        with open(f'{id}.json', 'w') as f:
            f.write(payload)
        '''

        assert is_json(payload)
