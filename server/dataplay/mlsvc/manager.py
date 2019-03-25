import os
from multiprocessing import Process
import _thread

from sanic.log import logger

from ..confsvc.manager import ConfigurationManager

from .job import MLJob
from .automl import AutoClassificationJob, AutoRegressionJob


class MLJobManager:
    @staticmethod
    def list_jobs():
        job_base_dir = ConfigurationManager.get_confs('mljob').get('job', 'dir')

        job_ids = [
            file
            for file in os.listdir(job_base_dir)
            if os.path.isdir(os.path.join(job_base_dir, file))
        ]
        results = []
        for job_id in job_ids:
            logger.debug(f'find one job with id {job_id}')
            item = {}
            item['id'] = job_id
            status = MLJob.get_status_by_id(job_id)
            item['status'] = status.name
            meta = MLJob.get_meta(job_id)
            for key in ['type', 'name']:
                item[key] = meta[key]
            results.append(item)
        return results

    @staticmethod
    def get_job(job_id):
        result = {}
        meta = MLJob.get_meta(job_id)
        for key in meta:
            result[key] = meta[key]
        status = MLJob.get_status_by_id(job_id)
        result['status'] = status.name
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
            job_option[key] = job_payload[key]

        if job_type == 'AutoClassificationJob':
            job = AutoClassificationJob(**job_option)
        elif job_type == 'AutoRegressionJob':
            job = AutoRegressionJob(**job_option)
        else:
            raise RuntimeError(f'job type {job_type} not supported!')

        is_multi_prorcess = ConfigurationManager.get_confs('mljob').getboolean(
            'job', 'multi_processes'
        )
        if is_multi_prorcess:
            # run train in a new process
            try:
                p = Process(target=job.train)
                p.start()
                p.join()
            except:
                logger.exception(f'failed to run ml job process for job {job.id}')
        else:
            try:
                _thread.start_new_thread(job.train, ())
            except:
                logger.exception(f'failed to run ml job thread for job {job.id}')

        return job
