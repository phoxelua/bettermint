from bettermint.database import db
from bettermint.models import PrimaryKeyIdBase, TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'User'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    user_to_institutions = db.relationship('UserToInstitution')

    @classmethod
    def by_email(cls, email: str) -> 'User':
        return User.query.filter_by(email=email).first()


class UserToInstitution(PrimaryKeyIdBase):
    """A mapping between Users and Institutions."""

    __tablename__ = 'UserToInstitution'
    __table_args__ = (db.UniqueConstraint('user_id', 'institution'),)

    user_id = db.Column(db.ForeignKey('User.id'), nullable=False)
    institution = db.Column(db.String(100), nullable=False)
    """TODO: Should we be storing institutions as an enum in the database?"""

    access_token = db.Column(db.String(160), nullable=False)

    user = db.relationship('User')

    @classmethod
    def by_user_id_and_institution(cls, session, user_id: int, institution: str) -> 'UserToInstitution':
        return session.query(cls).filter(
            cls.user_id == user_id,
            cls.institution == institution
        ).first()
