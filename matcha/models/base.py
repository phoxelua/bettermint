import datetime
import json
from collections import OrderedDict

from matcha.database import db


class Base(db.Model):
    __abstract__ = True

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        d = OrderedDict(sorted([('{} <{}>'.format(c.name, c.type), str(getattr(self, c.name)))
                        for c in self.__table__.columns], key=lambda x: x[0]))
        return json.dumps(d, indent=2)


class PrimaryKeyIdBase(Base):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)


class TimestampBase(PrimaryKeyIdBase):
    __abstract__ = True

    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    modified = db.Column(db.DateTime, default=datetime.datetime.utcnow)
