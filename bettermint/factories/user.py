from bettermint.models.user import User
from bettermint.factories.base import BaseFactory
from bettermint.lib.utils.security import pwd_context


class UserFactory(BaseFactory):
    """A factory which constructs different types of Users."""

    def create(self, first_name: str, last_name: str, email: str, password: str) -> User:
        """Creates a regular user."""
        hashed = pwd_context.encrypt(password)

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=hashed
        )

        return user
