from sanic import Blueprint
from sanic import response
from sanic.log import logger
from sanic_openapi import doc

import json

from .manager import ConfigurationManager


conf_svc = Blueprint('conf_svc')


@conf_svc.get('/confs', strict_slashes=True)
@doc.summary('list all configurations')
@doc.produces([str], content_type="application/json")
async def list_confs(request):
    try:
        config = ConfigurationManager.list_confs()
        return response.json(config, status=200)
    except Exception:
        logger.exception('failed to list configurations')
        return response.json({}, status=500)


@conf_svc.get('/confs/<domain>', strict_slashes=True)
@doc.summary('get content of configurations for specific domain')
@doc.produces({}, content_type="application/json")
async def get_confs(request, domain):
    try:
        config = ConfigurationManager.get_confs_values(domain)
        return response.json(config, status=200)
    except Exception:
        logger.exception('failed to get content of configurations')
        return response.json({}, status=500)


@conf_svc.post('/confs/<domain>', strict_slashes=True)
@doc.summary('save content of configurations for specific domain')
@doc.consumes(doc.JsonBody({}), content_type="application/json", location="body")
async def save_confs(request, domain):
    logger.debug(f'save configuration to domain={domain} with {request.body}')
    try:
        request_body = json.loads(request.body)
        ConfigurationManager.save_conf(domain, request_body)
        return response.json({}, status=200)
    except Exception:
        logger.exception('failed to save configurations')
        return response.json({}, status=500)
