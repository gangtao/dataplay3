from sanic import Sanic
from sanic_openapi import swagger_blueprint, openapi_blueprint
from .datasvc.service import dataset_svc
from .datasvc.registry import DatasetTypeRegistry
from .usersvc.service import user_svc
from .dashboardsvc.service import dashboard_svc
from .filesvc import file_svc


PREFIX = '/api'

app = Sanic(__name__)
app.blueprint(openapi_blueprint)
app.blueprint(swagger_blueprint)

app.config.API_VERSION = '1.0.0'
app.config.API_TITLE = 'Dataplay API'
app.config.API_DESCRIPTION = 'Dataplay API'
app.config.API_CONTACT_EMAIL = 'gang.tao@outlook.com'


def init():
    dataset_registry = DatasetTypeRegistry()
    dataset_registry.register('CSV', 'dataplay.datasvc.csv')

    app.blueprint(file_svc)
    app.blueprint(dataset_svc, url_prefix=PREFIX)
    app.blueprint(user_svc, url_prefix=PREFIX)
    app.blueprint(dashboard_svc, url_prefix=PREFIX)


if __name__ == '__main__':
    init()
    app.run(host='0.0.0.0', port=8000, debug=True, workers=3)
