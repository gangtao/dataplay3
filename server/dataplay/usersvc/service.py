from flask import Blueprint
from flask import request
from flask_api import status
import json

from .user import get_user, get_routes

user_svc = Blueprint('user_svc', __name__)


@user_svc.route('currentUser', methods=['GET'])
def user():
    try:
        if request.method == 'GET':
            # TODO: Check if user logged in
            user = get_user()
            return json.dumps(user), status.HTTP_200_OK
        else:
            return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
    except Exception:
        return json.dumps({}), status.HTTP_500_INTERNAL_SERVER_ERROR


@user_svc.route('auth_routes', methods=['GET'])
def routes():
    try:
        if request.method == 'GET':
            # TODO: Check if user logged in
            routes = get_routes()
            return json.dumps(routes), status.HTTP_200_OK
        else:
            return json.dumps({}), status.HTTP_405_METHOD_NOT_ALLOWED
    except Exception:
        return json.dumps({}), status.HTTP_500_INTERNAL_SERVER_ERROR