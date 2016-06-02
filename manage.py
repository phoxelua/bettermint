#!/usr/bin/env python
from flask_script import Manager, Server
from flask_shellplus import Shell
from flask_migrate import Migrate, MigrateCommand
from utils.commands import WebpackServer, TestRunner, DropDB, MakePlayground

from matcha.app import create_app
from matcha.database import db
from matcha import models


def _make_context():
    return dict(app=app, db=db, models=models)

app = create_app()
migrate = Migrate(app, db, directory='alembic')

manager = Manager(app)
manager.add_command('shell', Shell(make_context=_make_context))
manager.add_command('runserver', Server(host=app.config['HOST'], port=app.config['PORT']))
manager.add_command('webpack', WebpackServer)
manager.add_command('dropdb', DropDB)
manager.add_command('db', MigrateCommand)
manager.add_command('make_playground', MakePlayground)

TestRunner.capture_all_args = True
manager.add_command('test', TestRunner)


if __name__ == '__main__':
    manager.run()
