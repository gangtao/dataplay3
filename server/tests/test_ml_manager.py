import time

from dataplay.mlsvc.manager import MLJobManager
from dataplay.mlsvc.job import MLJob, MLJobStatus

from dataplay.datasvc.manager import DatasetManager
from dataplay.confsvc.manager import ConfigurationManager
from dataplay.datasvc.registry import DatasetTypeRegistry


dataset_type_config = ConfigurationManager.get_confs('dataset_type')
dataset_registry = DatasetTypeRegistry()
for section in dataset_type_config.sections():
    module_name = dataset_type_config.get(section, 'module')
    class_name = dataset_type_config.get(section, 'class')
    dataset_registry.register(section, class_name, module_name)

def test_classification():
    job_payload = {}
    job_payload['name'] = 'test_classification'
    job_payload['type'] = 'AutoClassificationJob'
    job_payload['dataset'] = 'iris'
    job_payload['features'] = ['sepal_length',
                               'sepal_width', 'petal_length', 'petal_width']
    job_payload['targets'] = ['species']
    job_payload['job_option'] = {}
    job_payload['job_option']['time_left_for_this_task'] = 30
    job_payload['job_option']['per_run_time_limit'] = 10
    job_payload['validation_option'] = None

    job = MLJobManager.create_job(job_payload)

    status = None

    while True:
        status = MLJob.get_status_by_id(job.id)
        if status in [ MLJobStatus.SUCCESS , MLJobStatus.FAILED]:
            break
        time.sleep(10)

    assert status == MLJobStatus.SUCCESS
