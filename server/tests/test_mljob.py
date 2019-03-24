import os
from dataplay.mlsvc.job import MLJob


class MyJob(MLJob):
    def __init__(self, name, df):
        MLJob.__init__(self, name, df)

    def train(self):
        pass


def test_job_create():
    job = MyJob('testjob', None)
    assert os.path.isdir(job.job_dir)
    job.clean()
    assert os.path.isdir(job.job_dir) == False
