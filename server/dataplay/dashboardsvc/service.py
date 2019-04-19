import uuid
import json

from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

from .dashboard import get_dashboards, save_dashboards

dashboard_svc = Blueprint('dashboard_svc')


@dashboard_svc.get('/dashboards', strict_slashes=True)
@doc.summary('get list of all dashboard')
async def list_dashboard(request):
    try:
        dashboard = get_dashboards()
        return response.json(dashboard, status=200)
    except Exception:
        logger.exception("faile to list dashboard")
        return response.json({}, status=500)


@dashboard_svc.post('/dashboards', strict_slashes=True)
@doc.summary('create a new dashboard')
async def create_dashboard(request):
    logger.debug(f'create a new dashboard with payload={request.body}')
    try:
        dashboard = get_dashboards()
        request_body = json.loads(request.body)
        id = str(uuid.uuid1())
        dashboard[id] = request_body
        save_dashboards()
        return response.json(id, status=200)
    except Exception:
        logger.exception("faile to create dashboard")
        return response.json({}, status=500)


@dashboard_svc.get('/dashboards/<id>', strict_slashes=True)
@doc.summary('get dashboard by id')
async def get_dashboard(request, id):
    try:
        dashboards = get_dashboards()
        if id in dashboards:
            return response.json(dashboards[id], status=200)
        else:
            return response.json({}, status=404)
    except Exception:
        logger.exception(f'faile to get dashboard {id}')
        return response.json({}, status=500)


@dashboard_svc.delete('/dashboards/<id>', strict_slashes=True)
@doc.summary('delete dashboard by id')
async def delete_dashboard(request, id):
    try:
        dashboards = get_dashboards()
        if id in dashboards:
            del dashboards[id]
            save_dashboards()
            return response.json({}, status=200)
        else:
            return response.json({}, status=404)
    except Exception:
        logger.exception(f'faile to delete dashboard {id}')
        return response.json({}, status=500)
