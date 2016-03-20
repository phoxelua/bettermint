#!/usr/bin/env python
from flask_script import Manager, Server
from flask_shellplus import Shell
from flask_migrate import Migrate, MigrateCommand
from utils.commands import WebpackServer, InitDB
from server.app import create_app
from server.database import db
from server import models


def _make_context():
    return dict(app=app, db=db, models=models)


app = create_app()

migrate = Migrate(app, db, directory='server/migrations')

manager = Manager(app)
manager.add_command("shell", Shell(make_context=_make_context))
manager.add_command("runserver", Server(host=app.config['HOST'], port=app.config['PORT']))
manager.add_command("webpack", WebpackServer())
manager.add_command("initdb", InitDB())
manager.add_command('db', MigrateCommand)


if __name__ == "__main__":
    manager.run()
