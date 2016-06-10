from matcha.database import db
from matcha.models import TimestampBase


class Transaction(TimestampBase):
    """
    A representation of a transaction object. Transactions are any USD payment or exchange.

    A User has many Transactions but a Transaction has only one User.
    An Institution has many Transactions but a Transaction has only one Institution.

    A Goal has many Transactions and a Transaction can have many Goals.
    A Transaction has many Categories and a Category has many Transactions.
    """

    __tablename__ = 'transactions'

    name = db.Column(db.Text, nullable=False)
    amount = db.Column(db.Float(scale=2), nullable=False)
    pending = db.Column(db.Boolean, nullable=False)
    post_date = db.Column(db.DateTime, nullable=False)

    account_id = db.Column(db.Text, db.ForeignKey('accounts.id'), nullable=False)
    account = db.relationship('Account', backref=db.backref('transactions', cascade='all, delete-orphan', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('transactions', cascade='all, delete-orphan', lazy='dynamic'))
    institution_id = db.Column(db.Integer, db.ForeignKey('institutions.id'), nullable=False)
    institution = db.relationship('Institution', backref=db.backref('transactions', cascade='all, delete-orphan', lazy='dynamic'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'pending': self.pending,
            'post_date': str(self.post_date)
        }
