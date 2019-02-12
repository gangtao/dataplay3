from flask import Blueprint
from flask import request
from flask import current_app
from flask_api import status
import json

from .csv import CVSDataset

dataset_svc = Blueprint('dataset_svc', __name__)


@dataset_svc.route('/datasets', methods=['GET', 'POST'])
def datasets():
    try:
        if request.method == 'GET':
            files = CVSDataset.list_csv()
            return json.dumps(files), status.HTTP_200_OK
        elif request.method == 'POST':
            return json.dumps({}), status.HTTP_201_CREATED
        else:
            return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
    except Exception:
        return json.dumps({}), status.HTTP_500_INTERNAL_SERVER_ERROR


@dataset_svc.route('/datasets/<id>', methods=['GET'])
def dataset(id):
    try:
        if request.method == 'GET':
            current_app.logger.info('GET dataset')
            csv = CVSDataset(id)
            current_app.logger.info('GET dataset {}'.format(csv.payload()))
            return json.dumps(csv.payload()), status.HTTP_200_OK
        else:
            return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
    except Exception as e:
        current_app.logger.error(e)
        return json.dumps({}), status.HTTP_500_INTERNAL_SERVER_ERROR
