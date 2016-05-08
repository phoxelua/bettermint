from bettermint.database import db
from bettermint.models import TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'User'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    institutions = db.relationship('Institution', backref="post",
                                   cascade="all, delete-orphan", lazy='dynamic')

    @classmethod
    def by_email(cls, email: str) -> 'User':
        return User.query.filter_by(email=email).first()
