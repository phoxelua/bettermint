from flask_testing import TestCase
from bettermint.database import db


class BettermintTestCase(TestCase):

    def create_app(self):
        from flask import current_app
        from bettermint.config import TestingConfig
        current_app.config.from_object(TestingConfig)
        return current_app

    def setUp(self):
        TestCase.setUp(self)
        db.create_all()

    def tearDown(self):
        TestCase.tearDown(self)
        db.session.remove()
        db.drop_all()
