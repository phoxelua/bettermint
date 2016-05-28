from bettermint.database import db
from bettermint.models import Base
from sqlalchemy.dialects.postgresql import ARRAY


class Category(Base):
    """
    A representation of a plaid category object.
    """

    __tablename__ = 'categories'

    plaid_id = db.Column(db.Integer, primary_key=True)
    plaid_type = db.Column(db.Text)
    # plaid_hierarchy = db.Column(ARRAY(db.Integer)) #fk sql cant do array fkin savages
