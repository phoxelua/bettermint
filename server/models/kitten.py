from datetime import datetime
from server.app import db


class Kitten(db.Model):
    __tablename__ = 'kittens'

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    modified = db.Column(db.DateTime, default=datetime.utcnow)
