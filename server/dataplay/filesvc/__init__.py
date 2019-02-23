import os

from sanic import Blueprint
from sanic.log import logger


file_svc = Blueprint('file_svc')

dir_path = os.path.dirname(os.path.realpath(__file__))
static_path = os.path.join(dir_path, '..', 'static')
static_file = os.path.join(static_path, 'index.html')
logger.info(f'using static path {static_path}')
file_svc.static('/ui', static_path)
file_svc.static('/ui', static_file)


for f in os.listdir(static_path):
    if os.path.isfile(os.path.join(static_path, f)):
        file_svc.static(f'/{f}', os.path.join(static_path, f))
