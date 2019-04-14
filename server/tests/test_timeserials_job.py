from dataplay.mlsvc.job import MLJobStatus
from dataplay.mlsvc.time_serials import TimeSerialsForecastsJob
from dataplay.datasvc.manager import DatasetManager


def test_job_time_serials():
    dataset_id = 'air_passengers'
    dataset = DatasetManager.get_dataset(dataset_id)
    assert dataset is not None
    df = dataset.get_df()
    assert df is not None

    features = ['Date']
    targets = ['Number']

    job_option = {}

    job = TimeSerialsForecastsJob('testtimeserials', dataset_id, features, targets, job_option)
    job.train()
    if hasattr(job, 'training_error'):
        print(f'training error was detected {job.training_error}')

    assert job.get_status() == MLJobStatus.SUCCESS
    predict_result = job.predict(df[features])
    assert predict_result is not None
    predict_result.to_csv('/tmp/tt.csv', encoding='utf-8')
    # job.clean()
