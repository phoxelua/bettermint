from logging import StreamHandler
from sys import stdout

from flask import Flask
from flask.ext.cors import CORS

from bettermint.database import db
from bettermint.constants import CONFIG_PY_PATH


def create_app():
    """Initializes everything for the app needs."""

    app = Flask(__name__)

    app.config.from_pyfile(CONFIG_PY_PATH)

    db.init_app(app)

    _register_apis(app)
    _register_views(app)

    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)

    CORS(app, supports_credentials=True)

    return app


def _register_apis(app):
    """Register all of the separate api endpoints."""

    from bettermint.api.auth import auth_api
    from bettermint.api.financial import financial_api

    for blueprint in [
        auth_api,
        financial_api,
    ]:
        app.register_blueprint(blueprint)


def _register_views(app):
    """Register all of the separate views."""

    from bettermint.views.index import index_view

    for view in [
        index_view
    ]:
        app.register_blueprint(view)
