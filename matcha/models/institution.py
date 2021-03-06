from matcha.database import db
from matcha.models import PrimaryKeyIdBase


class Institution(PrimaryKeyIdBase):
    """
    A representation of a basic Institution object.
    """

    __tablename__ = 'institutions'

    name = db.Column(db.String(100), nullable=False, unique=True)

    @property
    def users(self):
        from matcha.models import AccessToken, User
        return User.query.filter(User.id.in_(self.access_tokens.with_entities(AccessToken.user_id)))
