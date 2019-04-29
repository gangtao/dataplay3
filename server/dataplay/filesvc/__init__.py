import os

from sanic import Blueprint
from sanic.log import logger


file_svc = Blueprint('file_svc')

dir_path = os.path.dirname(os.path.realpath(__file__))
static_path = os.path.join(dir_path, '..', 'static')
logger.info(f'using static path {static_path}')
file_svc.static('/ui', static_path)
