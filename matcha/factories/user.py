from matcha.models.user import User, UserProfile
from matcha.factories.base import BaseFactory
from matcha.lib.utils.security import PasswordManager


class UserFactory(BaseFactory):
    """A factory which constructs different types of Users."""

    def create(self, first_name: str, last_name: str, email: str, password: str) -> User:
        """Creates a regular user."""
        hashed = PasswordManager.context.encrypt(password)

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=hashed,
            profile=UserProfile()
        )

        return user
