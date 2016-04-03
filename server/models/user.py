from server.database import db
from server.models import TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'User'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    password_salt = db.Column(db.String(29), nullable=False)

    @classmethod
    def by_email(cls, session, email: str) -> 'User':
        return session.query(cls).filter(
            cls.email == email
        ).first()
