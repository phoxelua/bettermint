import datetime
import json
from collections import OrderedDict

from bettermint.database import db


class PrimaryKeyIdBase(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        d = OrderedDict([('{} <{}>'.format(c.name, c.type), str(getattr(self, c.name)))
                         for c in self.__table__.columns])
        return json.dumps(d, indent=2)


class TimestampBase(PrimaryKeyIdBase):
    __abstract__ = True

    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    modified = db.Column(db.DateTime, default=datetime.datetime.utcnow)
