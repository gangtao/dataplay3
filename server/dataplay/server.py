from flask import Flask
from dataplay.datasvc.service import dataset_svc

app = Flask(__name__, static_url_path="")


@app.route("/")
def index():
    return app.send_static_file("index.html")


def init():
    app.register_blueprint(dataset_svc, url_prefix='/')


if __name__ == "__main__":
    init()
    app.run(host="0.0.0.0", threaded=True)
