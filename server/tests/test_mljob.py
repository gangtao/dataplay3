import os
from dataplay.mlsvc.job import MLJob
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
    job = MyJob('testjob', None)
    assert os.path.isdir(job.job_dir)
    job.clean()
    assert os.path.isdir(job.job_dir) is False


def test_job_auto_classification():
    dataset = DatasetManager.get_dataset('churn')
    assert dataset is not None
    df = dataset.get_df()
    assert df is not None

    features = ['Account Length', 'Area Code', 'Day Calls', 'State']
    targets = ['Churn?']

    job = AutoClassificationJob('testclassification', df, features, targets, None, None)
    job.train()

    predict_result = job.predict(df[features])
    predict_result[targets] = df[targets]
    assert df is not None
    predict_result.to_csv('/tmp/classification.csv', encoding='utf-8')


def test_job_auto_regression():
    dataset = DatasetManager.get_dataset('housing')
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

    job = AutoRegressionJob('testregression', df, features, targets, None, None)
    job.train()

    predict_result = job.predict(df[features])
    predict_result[targets] = df[targets]
    assert df is not None
    predict_result.to_csv('/tmp/regression.csv', encoding='utf-8')
