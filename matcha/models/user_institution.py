from matcha.database import db
from matcha.models import PrimaryKeyIdBase, User, Institution


class AccessToken(PrimaryKeyIdBase):
    """
    A representation of a User Institution's access token.
    Granted to the User via Plaid.
    """

    __tablename__ = 'access_tokens'

    user = db.relationship(User, backref=db.backref('access_tokens', cascade='all, delete-orphan', lazy='dynamic'))

    value = db.Column(db.String(160), nullable=False)
