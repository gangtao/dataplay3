from flask import Blueprint
from flask import request
from flask_api import status
import json

dataset_svc = Blueprint('dataset_svc', __name__)


@dataset_svc.route('/datasets', methods=['GET', 'POST'])
def datasets():
    if request.method == 'GET':
        return json.dumps({}), status.HTTP_200_OK
    elif request.method == 'POST':
        return json.dumps({}), status.HTTP_201_CREATED
    else:
        return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
