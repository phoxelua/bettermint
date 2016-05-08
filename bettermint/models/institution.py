from bettermint.database import db
from bettermint.models import PrimaryKeyIdBase


class Institution(PrimaryKeyIdBase):
    """
    A representation of a basic Institution object.
    A User has multiple Institutions.
    """

    __tablename__ = 'Institution'
    __table_args__ = (db.UniqueConstraint('user_id', 'name'),)

    user = db.relationship('User')
    user_id = db.Column(db.ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    access_token = db.Column(db.String(160), nullable=False)
