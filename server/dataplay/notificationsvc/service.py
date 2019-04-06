from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .notification import get_notifications

notification_svc = Blueprint('notification_svc')


@notification_svc.get('/notices', strict_slashes=True)
@doc.summary('get list of notifications')
async def notices(request):
    try:
        notifications = get_notifications()
        return response.json(notifications, status=200)
    except Exception:
        logger.exception('faile to get current user')
        return response.json({}, status=500)
