from sanic import Blueprint
from sanic import response

from .user import get_user, get_routes

user_svc = Blueprint('user_svc')


@user_svc.route('/currentUser', methods=['GET'])
def user(request):
    try:
        if request.method == 'GET':
            # TODO: Check if user logged in
            user = get_user()
            return response.json(user, status=200)
        else:
            return response.json({}, status=405)
    except Exception:
        return response.json({}, status=500)


@user_svc.route('/auth_routes', methods=['GET'])
def routes(request):
    try:
        if request.method == 'GET':
            # TODO: Check if user logged in
            routes = get_routes()
            return response.json(routes, 200)
        else:
            return response.json({}, status=405)
    except Exception:
        return response.json({}, status=500)
