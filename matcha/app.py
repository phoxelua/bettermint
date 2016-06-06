from datetime import datetime
from logging import StreamHandler
import os
from sys import stdout

from flask import Flask, jsonify
from flask.json import JSONEncoder
from flask_cors import CORS
from werkzeug.exceptions import default_exceptions
from werkzeug.exceptions import HTTPException

from matcha.database import db
from matcha.constants import Environment
from matcha.config import DevConfig, TestingConfig, ProdConfig


class MatchaJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        else:
            return JSONEncoder.default(self, obj)


def create_app():
    """Initializes everything for the app needs."""

    app = Flask(__name__)
    app.json_encoder = MatchaJSONEncoder

    _config_from_environment(app)

    db.init_app(app)

    _register_apis(app)
    _register_views(app)
    _register_as_json(app)

    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)

    CORS(app, supports_credentials=True)

    return app


def _register_as_json(app):

    def make_json_error(ex):
        response = jsonify(status=ex.code, message=str(ex.description))
        response.status_code = (ex.code if isinstance(ex, HTTPException) else 500)
        return response

    for code in default_exceptions.keys():
        app.register_error_handler(code, make_json_error)


def _register_apis(app):
    """Register all of the separate api endpoints."""

    from matcha.api.auth import auth_api
    from matcha.api.financial import financial_api
    from matcha.api.profile import profile_api

    for blueprint in [
        auth_api,
        financial_api,
        profile_api,
    ]:
        app.register_blueprint(blueprint)


def _register_views(app):
    """Register all of the separate views."""

    from matcha.views.index import index_view

    for view in [
        index_view
    ]:
        app.register_blueprint(view)


def _config_from_environment(app):
    """Configures the app based on environment variable ENVIRONMENT."""

    env = os.environ.get('ENVIRONMENT')
    if env == Environment.TESTING:
        config = TestingConfig
    elif env == Environment.PROD:
        config = ProdConfig
    else:
        config = DevConfig
    app.config.from_object(config)
