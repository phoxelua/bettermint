from matcha.database import db
from matcha.models import Base


class AccessToken(Base):
    """
    A representation of a User Institution's access token.
    Granted to the User via Plaid.

    Users have many AccessTokens but an AccessToken has only one User.
    Institutions have many AccessTokens but an AccessToken has only one Institution.
    """

    __tablename__ = 'access_tokens'

    value = db.Column(db.String(160), nullable=False, unique=True)

    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    institution = db.relationship('Institution', backref=db.backref('access_tokens', cascade='all, delete-orphan', lazy='dynamic'))
    user = db.relationship('User', backref=db.backref('access_tokens', cascade='all, delete-orphan', lazy='dynamic'))
