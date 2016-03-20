from server.database import db
from server.models import TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'User'

    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    password_salt = db.Column(db.String(31), nullable=False)
