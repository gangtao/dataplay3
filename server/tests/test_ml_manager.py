import time

from dataplay.mlsvc.manager import MLJobManager
from dataplay.mlsvc.job import MLJob, MLJobStatus


def test_classification():
    job_payload = {}
    job_payload['name'] = 'test_classification'
    job_payload['type'] = 'AutoClassificationJob'
    job_payload['dataset'] = 'iris'
    job_payload['features'] = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
    job_payload['targets'] = ['species']
    job_payload['job_option'] = {}
    job_payload['job_option']['time_left_for_this_task'] = 30
    job_payload['job_option']['per_run_time_limit'] = 10
    job_payload['validation_option'] = None

    job = MLJobManager.create_job(job_payload)

    status = None

    while True:
        status = MLJob.get_status_by_id(job.id)
        if status in [MLJobStatus.SUCCESS, MLJobStatus.FAILED]:
            break
        time.sleep(10)

    assert status == MLJobStatus.SUCCESS

    input_data = '''sepal_length,sepal_width,petal_length,petal_width,species
                    5.1,3.5,1.4,0.2,Iris Setosa
                    4.9,3.0,1.4,0.2,Iris Setosa'''

    # test input as csv string
    payload = {}
    payload['input_type'] = 'csv'
    payload['data'] = input_data
    output_data = MLJobManager.predict(job.id, payload)
    assert output_data is not None

    # test input as dataset
    payload = {}
    payload['input_type'] = 'dataset'
    payload['data'] = 'iris'
    output_data = MLJobManager.predict(job.id, payload)
    assert output_data is not None


def test_time_serials():
    job_payload = {}
    job_payload['name'] = 'test_time_serials'
    job_payload['type'] = 'TimeSerialsForecastsJob'
    job_payload['dataset'] = 'nasdaq'
    job_payload['features'] = ['Date']
    job_payload['targets'] = ['Open']
    job_payload['job_option'] = {}
    job_payload['validation_option'] = None

    job = MLJobManager.create_job(job_payload)

    status = None

    while True:
        status = MLJob.get_status_by_id(job.id)
        if status in [MLJobStatus.SUCCESS, MLJobStatus.FAILED]:
            break
        time.sleep(10)

    assert status == MLJobStatus.SUCCESS

    # test input dataset
    payload = {}
    payload['input_type'] = 'dataset'
    payload['data'] = 'nasdaq'
    output_data = MLJobManager.predict(job.id, payload)
    assert output_data is not None
