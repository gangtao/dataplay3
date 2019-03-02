import json

from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .registry import get_dataset_class

dataset_svc = Blueprint('dataset_svc')


@dataset_svc.get('/datasets', strict_slashes=True)
@doc.produces([{"name": str, "id": str, "type": str}])
@doc.summary('list all datasets')
async def list_datasets(request):
    dataset_class = get_dataset_class('CSV')
    try:
        datasets = dataset_class.list_datasets()
        return response.json(datasets, status=200)
    except Exception:
        return response.json({}, status=500)


@dataset_svc.post('/datasets', strict_slashes=True)
@doc.summary('creat a dataset')
async def create_datasets(request):
    try:
        return response.json({}, status=201)
    except Exception:
        return response.json({}, status=500)


@dataset_svc.get('/datasets/<id>', strict_slashes=True)
@doc.summary('get one dataset')
async def get_dataset(request, id):
    dataset_class = get_dataset_class('CSV')
    try:
        logger.info('GET dataset')
        csv = dataset_class(id)
        logger.info(f'GET dataset {csv}')
        payload = csv.get_payload()
        return response.json(payload, status=200)
    except Exception as e:
        logger.error(e)
        return response.json({}, status=500)


@dataset_svc.post('/datasets/<id>/query', strict_slashes=True)
@doc.summary('run a dataset query')
async def query_dataset(request, id):
    logger.debug(f'get dataset query request {request.body} on {id}')
    dataset_class = get_dataset_class('CSV')
    try:
        request_body = json.loads(request.body)
        dataset = dataset_class(id)
        query_result = dataset.query(
            request_body['query'], request_body['type'])
        return response.json(query_result, status=200)
    except Exception as e:
        logger.error(e)
        return response.json({}, status=500)
