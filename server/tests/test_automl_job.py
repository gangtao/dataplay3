import os
from dataplay.mlsvc.job import MLJob, MLJobStatus
from dataplay.mlsvc.automl import AutoClassificationJob, AutoRegressionJob
from dataplay.datasvc.manager import DatasetManager


class MyJob(MLJob):
    def __init__(self, name, df):
        MLJob.__init__(self, name, df)

    def train(self):
        pass

    def predict(self, df):
        pass


def test_job_create():
    job = MyJob('testjob', 'iris')
    assert os.path.isdir(job.job_dir)
    job.clean()
    assert os.path.isdir(job.job_dir) is False


def test_job_auto_classification():
    dataset_id = 'churn'
    dataset = DatasetManager.get_dataset(dataset_id)
    assert dataset is not None
    df = dataset.get_df()
    assert df is not None

    features = ['Account Length', 'Area Code', 'Day Calls', 'State']
    targets = ['Churn?']

    job_option = {}
    job_option['time_left_for_this_task'] = 30
    job_option['per_run_time_limit'] = 10

    job = AutoClassificationJob(
        'testclassification', dataset_id, features, targets, job_option, None
    )
    job.train()

    predict_result = job.predict(df[features])
    predict_result[targets] = df[targets]
    assert job.get_status() == MLJobStatus.SUCCESS
    # predict_result.to_csv('/tmp/classification.csv', encoding='utf-8')
    job.clean()


def test_job_auto_multi_classification():
    dataset_id = 'iris'
    dataset = DatasetManager.get_dataset(dataset_id)
    assert dataset is not None
    df = dataset.get_df()
    assert df is not None

    features = ['sepal_length', 'sepal_width']
    targets = ['species']

    job_option = {}
    job_option['time_left_for_this_task'] = 30
    job_option['per_run_time_limit'] = 10

    job = AutoClassificationJob(
        'testclassification', dataset_id, features, targets, job_option, None
    )
    job.train()

    predict_result = job.predict(df[features])
    predict_result[targets] = df[targets]
    assert job.get_status() == MLJobStatus.SUCCESS
    # predict_result.to_csv('/tmp/classification.csv', encoding='utf-8')
    job.clean()


def test_job_auto_regression():
    dataset_id = 'housing'
    dataset = DatasetManager.get_dataset(dataset_id)
    assert dataset is not None
    df = dataset.get_df()
    assert df is not None

    features = [
        'crime_rate',
        'business_acres',
        'avg_rooms_per_dwelling',
        'distance_to_employment_center',
    ]
    targets = ['median_house_value']

    job_option = {}
    job_option['time_left_for_this_task'] = 30
    job_option['per_run_time_limit'] = 10

    job = AutoRegressionJob('testregression', dataset_id, features, targets, job_option, None)
    job.train()

    predict_result = job.predict(df[features])
    predict_result[targets] = df[targets]
    assert job.get_status() == MLJobStatus.SUCCESS
    # predict_result.to_csv('/tmp/regression.csv', encoding='utf-8')
    job.clean()
