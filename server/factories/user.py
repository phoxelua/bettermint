import bcrypt

from server.models.user import User
from server.factories.base import BaseFactory


class UserFactory(BaseFactory):
    """A factory which constructs different types of Users."""

    @classmethod
    def create(cls, email, password):
        """Creates a regular user."""

        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)

        user = User(
            email=email,
            password_hash=hashed.decode('utf-8'),
            password_salt=salt.decode('utf-8')
        )

        return user
