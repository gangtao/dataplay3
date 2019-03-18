from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .user import get_user, get_routes

user_svc = Blueprint('user_svc')


@user_svc.get('/currentUser', strict_slashes=True)
@doc.summary('get current user info')
def user(request):
    try:
        user = get_user()
        return response.json(user, status=200)
    except Exception:
        logger.exception('faile to get current user')
        return response.json({}, status=500)


@user_svc.get('/auth_routes', strict_slashes=True)
@doc.summary('get authorized routes')
def routes(request):
    try:
        routes = get_routes()
        return response.json(routes, 200)
    except Exception:
        logger.exception('faile to get get routes')
        return response.json({}, status=500)
