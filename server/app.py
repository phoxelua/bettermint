from flask.ext.sqlalchemy import SQLAlchemy
from logging import StreamHandler
from sys import stdout
from flask import Flask

db = SQLAlchemy()


def create_app():
    from server.api.kittens import kittens_api
    from server.views.index import index_view

    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    app.register_blueprint(kittens_api.blueprint, url_prefix='/api')
    app.register_blueprint(index_view)

    db.init_app(app)

    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)
    return app
