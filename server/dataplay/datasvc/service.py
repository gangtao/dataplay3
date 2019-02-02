from flask import Blueprint
from flask import request
from flask_api import status
import json

from .csv import list_csv

dataset_svc = Blueprint('dataset_svc', __name__)


@dataset_svc.route('/datasets', methods=['GET', 'POST'])
def datasets():
    try:
        if request.method == 'GET':
            files = list_csv()
            return json.dumps(files), status.HTTP_200_OK
        elif request.method == 'POST':
            return json.dumps({}), status.HTTP_201_CREATED
        else:
            return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
    except Exception:
        return json.dumps({}), status.HTTP_500_INTERNAL_SERVER_ERROR
