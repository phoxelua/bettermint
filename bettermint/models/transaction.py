from bettermint.database import db
from bettermint.models import TimestampBase


class Transaction(TimestampBase):
    """
    A representation of a transaction object. Transactions incorporate any USD payment or exchange.

    A User has many Transactions but a Transaction has only one User.
    An Institution has many Transactoins but a Transaction has only one Institution.

    A Goal has many Transactions and a Transaction can have many Goals.
    A Transaction has many Categories and a Category has many Transactions.
    """

    __tablename__ = 'transactions'

    name = db.Column(db.Text, nullable=False)
    amount = db.Column(db.Float(scale=2), nullable=False)
    pending = db.Column(db.Boolean, nullable=False)
    post_date = db.Column(db.DateTime, nullable=False)

    # TODO: swap for account model laterz
    account_id = db.Column(db.Integer, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('transactions', cascade='all, delete-orphan', lazy='dynamic'))
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    institution = db.relationship('Institution', backref=db.backref('transactions',
                                  cascade='all, delete-orphan', lazy='dynamic', single_parent=True))
