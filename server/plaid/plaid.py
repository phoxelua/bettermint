from plaid import Client

from server.config import PLAID_CLIENT_ID, PLAID_SECRET
from server.utilities.lazy import Lazy


class PlaidClient:
    """
    A wrapper class around the Plaid API client.
    """

    @classmethod
    def _create_instance(cls):
        """Creates and initializes a singleton instance."""

        instance = cls()

        instance._client = Client(
            client_id=PLAID_CLIENT_ID,
            secret=PLAID_SECRET
        )

        instance._client.config({
            'url': 'https://tartan.plaid.com'
        })

        return instance

    instance = Lazy(lambda cls: cls._create_instance())
    """The singleton instance of this class."""

    def add_user(self, institution, username: str, password: str):
        """
        Adds a user to Bettermint.

        Makes a request to the financial institution specified, using the credentials provided.  If the credentials
        succeed, an access token is granted, which gives access to the user's financial transactions from this
        institution.

        TODO: specify institutions as constants somewhere.
        """

        response = self._client.connect(institution, {
            'username': username,
            'password': password
        })

        print(response.json())

        response = self._client.connect_step(institution, None, options={'send_method': {'type': 'phone'}})

        print(response.json())

        code = input()

        response = self._client.connect_step(institution, code)

        print(response.json())
