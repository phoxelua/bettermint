from flask_script import Command
from bettermint.app import create_app
from bettermint.database import db


class InitDB(Command):
    """Initialize database by creating tables."""

    def run(self):
        """Runs this command."""

        app = create_app()

        with app.app_context():
            db.create_all()
