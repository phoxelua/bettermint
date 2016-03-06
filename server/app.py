from logging import StreamHandler
from sys import stdout

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


def create_app(db):
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

db = SQLAlchemy()
app = create_app(db)
migrate = Migrate(app, db, directory='server/migrations')
