from flask_script import Command
from server.app import db, app


class InitDB(Command):
    """Initialize database by creating tables."""

    def run(self):
        with app.app_context():
            db.create_all()
