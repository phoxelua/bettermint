from bettermint.database import db
from bettermint.models import Base


class Account(Base):
    """
    A representation of an financial Account object.

    A User has many Accounts but an Account has only one User.
    An Institution has many Accounts but an Account has only one Institution.
    An Account has many Transactions but a Transaction can have only one Account.
    A Goal has many Accounts and an Account has many Goals.
    """

    __tablename__ = 'accounts'

    id = db.Column(db.Text, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    type = db.Column(db.Text, nullable=False)
    available_balance = db.Column(db.Float(scale=2), nullable=True)
    current_balance = db.Column(db.Float(scale=2), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('accounts', cascade='all, delete-orphan', lazy='dynamic'))
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    institution = db.relationship('Institution', backref=db.backref('accounts', cascade='all, delete-orphan', lazy='dynamic'))
