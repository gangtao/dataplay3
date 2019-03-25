import os

from sanic.log import logger

from ..confsvc.manager import ConfigurationManager
from ..datasvc.manager import DatasetManager

from .job import MLJob, MLJobStatus


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
            with open(os.path.join(job_base_dir, job_id, 'status')) as f:
                status_value = f.read()
                item['status'] = MLJobStatus(int(status_value)).name
            results.append(item)
        return results
