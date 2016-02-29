#!/usr/bin/env python
from flask.ext.script import Manager, Shell, Server
from utils.commands import Webpack
from server.app import create_app, db
from server import models

app = create_app()


def _make_context():
    return dict(app=app, db=db, models=models)

manager = Manager(app)
manager.add_command("shell", Shell(make_context=_make_context))
manager.add_command("runserver", Server(host=app.config['HOST'], port=app.config['PORT']))
manager.add_command("webpack", Webpack())

if __name__ == "__main__":
    manager.run()
