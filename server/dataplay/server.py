from sanic import Sanic, response
from sanic_openapi import swagger_blueprint, openapi_blueprint
from .datasvc.service import dataset_svc
from .datasvc.registry import DatasetTypeRegistry
from .usersvc.service import user_svc
from .dashboardsvc.service import dashboard_svc
from .mlsvc.service import ml_svc
from .confsvc.service import conf_svc
from .filesvc import file_svc

from .confsvc.manager import ConfigurationManager

PREFIX = '/api'

app = Sanic(__name__)
app.blueprint(openapi_blueprint)
app.blueprint(swagger_blueprint)

app.config.API_VERSION = '1.0.0'
app.config.API_TITLE = 'Dataplay API'
app.config.API_DESCRIPTION = 'Dataplay API'
app.config.API_CONTACT_EMAIL = 'gang.tao@outlook.com'

server_config = ConfigurationManager.get_confs('server')
app.config.HOST = server_config.get('server', 'host')
app.config.PORT = server_config.getint('server', 'port')
app.config.DEBUG = server_config.getboolean('server', 'debug')
app.config.WORKERS = server_config.getint('server', 'workers')

dataset_type_config = ConfigurationManager.get_confs('dataset_type')
dataset_registry = DatasetTypeRegistry()
for section in dataset_type_config.sections():
    module_name = dataset_type_config.get(section, 'module')
    class_name = dataset_type_config.get(section, 'class')
    dataset_registry.register(section, class_name, module_name)

app.blueprint(file_svc)
app.blueprint(dataset_svc, url_prefix=PREFIX)
app.blueprint(user_svc, url_prefix=PREFIX)
app.blueprint(dashboard_svc, url_prefix=PREFIX)
app.blueprint(ml_svc, url_prefix=PREFIX)
app.blueprint(conf_svc, url_prefix=PREFIX)


@app.route('/')
def handle_request(request):
    return response.redirect('/ui')


if __name__ == '__main__':
    init()
    app.run(
        host=app.config.HOST,
        port=app.config.PORT,
        debug=app.config.DEBUG,
        workers=app.config.WORKERS,
    )
