from bettermint.database import db
from bettermint.models import TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'users'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(256), nullable=False)

    @property
    def institutions(self):
        from bettermint.models import AccessToken, Institution
        return Institution.query.filter(Institution.id.in_(self.access_tokens.with_entities(AccessToken.institution_id)))

    @classmethod
    def by_email(cls, email: str) -> 'User':
        return User.query.filter_by(email=email).first()
