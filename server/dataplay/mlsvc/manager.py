import os
from io import StringIO
from multiprocessing import Process
import _thread

import pandas as pd
from sanic.log import logger

from ..confsvc.manager import ConfigurationManager
from ..datasvc.manager import DatasetManager

from .job import MLJob
from .automl import AutoClassificationJob, AutoRegressionJob


class MLJobManager:
    @staticmethod
    def list_jobs():
        job_base_dir = ConfigurationManager.get_confs('mljob').get('job', 'dir')

        try:
            job_ids = [
                file
                for file in os.listdir(job_base_dir)
                if os.path.isdir(os.path.join(job_base_dir, file))
            ]
            results = []
            for job_id in job_ids:
                try:
                    logger.debug(f'find one job with id={job_id}')
                    item = {}
                    item['id'] = job_id
                    status = MLJob.get_status_by_id(job_id)
                    item['status'] = status.name
                    meta = MLJob.get_meta(job_id)
                    for key in ['type', 'name']:
                        item[key] = meta[key]
                    results.append(item)
                except Exception:
                    logger.exception(f'failed to retrieve job id={job_id}')
            return results
        except Exception:
            logger.exception('failed to list job')
            return []

    @staticmethod
    def get_job(job_id):
        result = {}
        meta = MLJob.get_meta(job_id)
        for key in meta:
            result[key] = meta[key]
        status = MLJob.get_status_by_id(job_id)
        result['status'] = status.name
        result['id'] = job_id
        return result

    @staticmethod
    def delete_job(job_id):
        MLJob.delete_job_by_id(job_id)

    @staticmethod
    def create_job(job_payload):
        job_type = job_payload['type']
        job_option = {}
        job_option_attrs = [
            'name',
            'dataset',
            'features',
            'targets',
            'job_option',
            'validation_option',
        ]

        for key in job_option_attrs:
            if key not in job_payload:
                job_payload[key] = {}
            job_option[key] = job_payload[key]

        if job_type == 'AutoClassificationJob':
            job = AutoClassificationJob(**job_option)
        elif job_type == 'AutoRegressionJob':
            job = AutoRegressionJob(**job_option)
        else:
            raise RuntimeError(f'job type={job_type} not supported!')

        is_multi_prorcess = ConfigurationManager.get_confs('mljob').getboolean(
            'job', 'multi_processes'
        )
        if is_multi_prorcess:
            # run train in a new process
            try:
                logger.debug(f'start new process to train ml job={job.id}')
                p = Process(target=job.train)
                p.start()
                # p.join()
                # TODO: update training status using web sock
            except:
                logger.exception(f'failed to run ml job process for job={job.id}')
        else:
            try:
                logger.debug(f'start new thread to train ml job {job.id}')
                _thread.start_new_thread(job.train, ())
                # TODO: update training status using web sock
            except:
                logger.exception(f'failed to run ml job thread for job={job.id}')

        return job

    @staticmethod
    def predict(job_id, payload):
        data = payload['data']
        input_type = payload['input_type']
        try:
            model = MLJob.get_model(job_id)
            if input_type == 'csv':
                csv_data = StringIO(data)
                df = pd.read_csv(csv_data, sep=",")
            elif input_type == 'dataset':
                dataset = DatasetManager.get_dataset(data)
                df = dataset.get_df()
            else:
                message = f'input type {input_type} is not supported for prediction'
                logger.error(message)
                raise RuntimeError(message)
            df_prediction = model.predict(df)
            output_data = df_prediction.to_csv()
            return output_data
        except Exception as e:
            logger.exception(f'failed to do prediction for data={data} id={job_id} error={e}')
            raise e
