from server.database import db
from server.models import PrimaryKeyIdBase, TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'User'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)
    password_salt = db.Column(db.String(29), nullable=False)

    user_to_institutions = db.relationship('UserToInstitution')

    @classmethod
    def by_email(cls, session, email: str) -> 'User':
        return session.query(cls).filter(
            cls.email == email
        ).first()


class UserToInstitution(PrimaryKeyIdBase):
    """A mapping between Users and Institutions."""

    __tablename__ = 'UserToInstitution'
    __table_args__ = (db.UniqueConstraint('user_id', 'institution'),)

    user_id = db.Column(db.ForeignKey('User.id'), nullable=False)
    institution = db.Column(db.String(100), nullable=False)
    """TODO: Should we be storing institutions as an enum in the database?"""

    access_token = db.Column(db.String(160), nullable=False)

    user = db.relationship('User')
