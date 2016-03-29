from server.models.user import User
from server.factories.base import BaseFactory
from server.utilities.bcrypt import hashpw, gensalt


class UserFactory(BaseFactory):
    """A factory which constructs different types of Users."""

    def create(self, first_name: str, last_name: str, email: str, password: str) -> User:
        """Creates a regular user."""

        salt = gensalt()
        hashed = hashpw(password, salt)

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=hashed,
            password_salt=salt
        )

        return user
