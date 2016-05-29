from bettermint.database import db
from bettermint.models import Base


class Category(Base):
    """
    A representation of a plaid category object.
    """

    __tablename__ = 'categories'

    plaid_id = db.Column(db.Integer, primary_key=True)
    plaid_type = db.Column(db.Text)

    # TODO: change to ARRAY type once Postgres test db in place
    plaid_hierarchy = db.Column(db.Text)
