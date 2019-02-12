from flask import Flask
from .datasvc.service import dataset_svc
from .usersvc.service import user_svc

app = Flask(__name__, static_url_path="")

PREFIX = '/api/'


@app.route('/')
def index():
    return app.send_static_file('index.html')


def init():
    app.register_blueprint(dataset_svc, url_prefix=PREFIX)
    app.register_blueprint(user_svc, url_prefix=PREFIX)


if __name__ == '__main__':
    init()
    app.run(host='0.0.0.0', threaded=True)
