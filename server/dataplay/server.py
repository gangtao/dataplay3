from flask import Flask

app = Flask(__name__, static_url_path="")


@app.route("/")
def index():
    return app.send_static_file("index.html")


def init():
    pass


if __name__ == "__main__":
    init()
    app.run(host="0.0.0.0", threaded=True)
