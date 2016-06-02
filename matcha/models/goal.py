from matcha.database import db
from matcha.models import TimestampBase


goal_transactions = db.Table('goal_transactions',
                             db.Column('goal_id', db.Integer, db.ForeignKey('goals.id')),
                             db.Column('transaction_id', db.Integer, db.ForeignKey('transactions.id')))
goal_accounts = db.Table('goal_accounts',
                         db.Column('goal_id', db.Integer, db.ForeignKey('goals.id')),
                         db.Column('account_id', db.Text, db.ForeignKey('accounts.id')))


class Goal(TimestampBase):
    """
    A representation of a basic goal object. Goals track a User defined financial progress over time.
    Goals can be periodic.

    A User has many Goals but a Goal has only one User.
    A Transaction has many Goals and a Goal has many Transactions.
    """

    __tablename__ = 'goals'

    name = db.Column(db.Text, nullable=False)
    progress = db.Column(db.Integer, default=0)
    amount = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    frequency = db.Column(db.Text, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('goals', cascade='all, delete-orphan', lazy='dynamic'))
    transactions = db.relationship('Transaction', secondary=goal_transactions, backref='goals')
    accounts = db.relationship('Account', secondary=goal_accounts, backref='goals')

    def serialize(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'name': self.name,
            'start_date': self.start_date.timestamp(),
            'end_date': self.end_date.timestamp()
        }
