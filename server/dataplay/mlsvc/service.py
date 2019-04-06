import json

from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .manager import MLJobManager

ml_svc = Blueprint('ml_svc')


@ml_svc.get('/ml_jobs', strict_slashes=True)
@doc.summary('list all ml jobs')
@doc.produces(
    [{"name": str, "id": str, "type": str, "status": str}], content_type="application/json"
)
@doc.consumes({"type": str})
async def list_jobs(request):
    logger.debug('list ml jobs with condition={request.args}')
    args = request.args
    try:
        jobs = MLJobManager.list_jobs()
        if args and 'type' in args:
            query_jobs = [job for job in jobs if job['type'] in args['type']]
            return response.json(query_jobs, status=200)
        else:
            return response.json(jobs, status=200)
    except Exception:
        logger.exception('failed to list ml jobs')
        return response.json({}, status=500)


@ml_svc.get('/ml_jobs/<id>', strict_slashes=True)
@doc.summary('get one ml job details')
@doc.produces(
    {"name": str, "id": str, "type": str, "status": str}, content_type="application/json"
)
async def get_job(request, id):
    try:
        job = MLJobManager.get_job(id)
        return response.json(job, status=200)
    except Exception:
        logger.exception('faile to get ml job')
        return response.json({}, status=500)


@ml_svc.delete('/ml_jobs/<id>', strict_slashes=True)
@doc.summary('delete one ml job by id')
async def delete_job(request, id):
    logger.debug(f'delete ml jobs {id}')
    try:
        MLJobManager.delete_job(id)
        return response.json({}, status=204)
    except Exception:
        logger.exception('faile to delete ml job')
        return response.json({}, status=500)


@ml_svc.post('/ml_jobs', strict_slashes=True)
@doc.summary('creat a ml job')
@doc.produces({}, content_type="application/json")
@doc.consumes(
    doc.JsonBody(
        {
            "name": str,
            "type": str,
            "dataset": str,
            "features": [str],
            "targets": [str],
            "job_option": {},
            "validation_option": {},
        }
    ),
    content_type="application/json",
    location="body",
)
async def create_job(request):
    logger.debug(f'get create ml job with payload={request.body}')
    try:
        request_body = json.loads(request.body)
        job = MLJobManager.create_job(request_body)
        return response.json(job, status=201)
    except Exception:
        logger.exception('faile to create ml job')
        return response.json({}, status=500)


@ml_svc.post('/ml_jobs/<id>/predict', strict_slashes=True)
@doc.summary('do a prediction based on a trained ml job')
@doc.produces(str, content_type="application/json")
@doc.consumes(
    doc.JsonBody({"payload": str, "type": str}),
    content_type="application/json",
    location="body",
)
async def predict(request, id):
    logger.debug(f'predict ml job with payload={request.body}')
    try:
        request_body = json.loads(request.body)
        predict_output = MLJobManager.predict(id, request_body['payload'])
        return response.json(predict_output, status=200)
    except Exception:
        logger.exception('faile to create ml job')
        return response.json({}, status=500)
