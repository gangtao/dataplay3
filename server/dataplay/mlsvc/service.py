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
