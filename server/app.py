from logging import StreamHandler
from sys import stdout

from flask import Flask
from flask.ext.cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


def create_app(db):

    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    _register_apis(app)
    _register_views(app)

    db.init_app(app)

    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)

    CORS(app, supports_credentials=True)
    return app


def _register_apis(app):

    from server.api.kittens import kittens_api
    from server.api.login import login_api

    for blueprint in [
        kittens_api,
        login_api
    ]:
        app.register_blueprint(blueprint)


def _register_views(app):

    from server.views.index import index_view

    for view in [
        index_view
    ]:
        app.register_blueprint(view)


db = SQLAlchemy()
app = create_app(db)

migrate = Migrate(app, db, directory='server/migrations')
