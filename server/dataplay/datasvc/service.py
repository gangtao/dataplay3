from sanic import Blueprint
from sanic import response
from sanic.log import logger

from .csv import CVSDataset

dataset_svc = Blueprint('dataset_svc')


@dataset_svc.route('/datasets', methods=['GET', 'POST'])
async def datasets(request):
    try:
        if request.method == 'GET':
            files = CVSDataset.list_csv()
            return response.json(files, status=200)
        elif request.method == 'POST':
            return response.json({}, status=201)
        else:
            return response.json({}, status=405)
    except Exception:
        return response.json({}, status=500)


@dataset_svc.route('/datasets/<id>', methods=['GET'])
async def dataset(request, id):
    try:
        if request.method == 'GET':
            logger.info('GET dataset')
            csv = CVSDataset(id)
            logger.info('GET dataset {}'.format(csv.payload()))
            return response.json(csv.payload(), status=200)
        else:
            return response.json({}, status=405)
    except Exception as e:
        logger.error(e)
        return response.json({}, status=500)
