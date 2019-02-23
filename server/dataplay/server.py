import os
from sanic import Sanic
from sanic.log import logger
from .datasvc.service import dataset_svc
from .usersvc.service import user_svc
from .filesvc import file_svc

PREFIX = '/api'

app = Sanic(__name__)

def init():
    app.blueprint(file_svc)
    app.blueprint(dataset_svc, url_prefix=PREFIX)
    app.blueprint(user_svc, url_prefix=PREFIX)


if __name__ == '__main__':
    init()
    app.run(host='0.0.0.0', port=8000, debug=False, workers=3)
