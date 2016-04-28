import datetime

from bettermint.database import db


class PrimaryKeyIdBase(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)


class TimestampBase(PrimaryKeyIdBase):
    __abstract__ = True

    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    modified = db.Column(db.DateTime, default=datetime.datetime.utcnow)
