from matcha.database import db
from matcha.models import TimestampBase


class User(TimestampBase):
    """A representation of a basic User object."""

    __tablename__ = 'users'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(256), nullable=False)

    profile = db.relationship('UserProfile')
    profile_id = db.Column(db.ForeignKey('user_profiles.id'), nullable=True)

    @property
    def institutions(self):
        from matcha.models import AccessToken, Institution
        return Institution.query.filter(Institution.id.in_(self.access_tokens.with_entities(AccessToken.institution_id)))

    @classmethod
    def by_email(cls, email: str) -> 'User':
        return User.query.filter_by(email=email).first()


class UserProfile(TimestampBase):
    """Associated information with a User."""

    __tablename__ = 'user_profiles'

    birthday = db.Column(db.Date, nullable=True)
    user = db.relationship('User', uselist=False)
