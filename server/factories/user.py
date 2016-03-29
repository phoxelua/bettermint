from server.models.user import User
from server.factories.base import BaseFactory
from server.utilities.bcrypt import hashpw, gensalt


class UserFactory(BaseFactory):
    """A factory which constructs different types of Users."""

    def create(self, email: str, password: str) -> User:
        """Creates a regular user."""

        salt = gensalt()
        hashed = hashpw(password, salt)

        user = User(
            email=email,
            password_hash=hashed,
            password_salt=salt
        )

        return user
