import json

from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .manager import MLJobManager

ml_svc = Blueprint('ml_svc')


@ml_svc.get('/ml_jobs', strict_slashes=True)
@doc.route(
    summary='list all ml jobs', produces=[{"name": str, "id": str, "type": str, "status": str}]
)
async def list_ml_jobs(request):
    logger.debug('list ml jobs')
    try:
        jobs = MLJobManager.list_jobs()
        return response.json(jobs, status=200)
    except Exception:
        logger.exception('failed to list ml jobs')
        return response.json({}, status=500)


@ml_svc.get('/ml_jobs/<id>', strict_slashes=True)
@doc.route(
    summary='get one ml job details',
    produces={"name": str, "id": str, "type": str, "status": str},
)
async def get_dataset(request, id):
    try:
        job = MLJobManager.get_job(id)
        return response.json(job, status=200)
    except Exception:
        logger.exception('faile to get ml job')
        return response.json({}, status=500)


@ml_svc.post('/ml_jobs', strict_slashes=True)
@doc.route(summary='creat a ml job', produces={})
@doc.consumes(
    {
        "name": str,
        "type": str,
        "dataset": str,
        "features": [str],
        "targets": [str],
        "job_option": {},
        "validation_option": {},
    },
    location="body",
)
async def create_datasets(request):
    logger.debug(f'get create ml job request {request.body}')
    try:
        request_body = json.loads(request.body)
        MLJobManager.create_job(request_body)
        return response.json({}, status=201)
    except Exception:
        logger.exception('faile to create ml job')
        return response.json({}, status=500)
