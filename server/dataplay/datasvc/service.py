import json

from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .registry import get_dataset_class

dataset_svc = Blueprint('dataset_svc')


@dataset_svc.get('/datasets', strict_slashes=True)
@doc.route(summary='list all datasets', produces=[{"name": str, "id": str, "type": str}])
async def list_datasets(request):
    dataset_class = get_dataset_class('csv')
    try:
        datasets = dataset_class.list_datasets()
        return response.json(datasets, status=200)
    except Exception:
        logger.exception('faile to list dataset')
        return response.json({}, status=500)


@dataset_svc.post('/datasets', strict_slashes=True)
@doc.route(summary='creat a dataset', produces={"name": str, "id": str, "type": str})
async def create_datasets(request):
    try:
        # TODO: not implemented yet
        return response.json({}, status=201)
    except Exception:
        logger.exception('faile to create dataset')
        return response.json({}, status=500)


@dataset_svc.get('/datasets/<id>', strict_slashes=True)
@doc.route(
    summary='get one dataset',
    produces={"name": str, "id": str, "cols": [str], "rows": [[object]]},
)
async def get_dataset(request, id):
    dataset_class = get_dataset_class('csv')
    try:
        logger.info('GET dataset')
        csv = dataset_class(id)
        logger.info(f'GET dataset {csv}')
        payload = csv.get_payload()
        return response.json(payload, status=200)
    except Exception:
        logger.exception('faile to get dataset')
        return response.json({}, status=500)


@dataset_svc.post('/datasets/<id>/query', strict_slashes=True)
@doc.route(summary='run a dataset query', produces={"cols": [str], "rows": [[object]]})
async def query_dataset(request, id):
    logger.debug(f'get dataset query request {request.body} on {id}')
    dataset_class = get_dataset_class('csv')
    try:
        request_body = json.loads(request.body)
        dataset = dataset_class(id)
        query_result = dataset.query(request_body['query'], request_body['type'])
        return response.json(query_result, status=200)
    except Exception:
        logger.exception('faile to query dataset')
        return response.json({}, status=500)
