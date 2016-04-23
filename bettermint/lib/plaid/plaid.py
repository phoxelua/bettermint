import datetime

from plaid import Client

from bettermint.config import PLAID_CLIENT_ID, PLAID_SECRET


class PlaidClient:
    """
    A wrapper class around the Plaid API client.
    """

    def __init__(self, access_token=None):
        """
        Initializes an instance.

        NOTE: we don't use the Lazy pattern here because the Plaid Client caches access tokens between method calls.
        """

        self._client = Client(
            client_id=PLAID_CLIENT_ID,
            secret=PLAID_SECRET,
            access_token=access_token
        )

        self._client.config({
            'url': 'https://tartan.plaid.com'
        })

    def add_user(self, institution, username: str, password: str):
        """
        Adds a user to Bettermint.

        Makes a request to the financial institution specified, using the credentials provided.  If the credentials
        succeed, an access token is granted, which gives access to the user's financial transactions from this
        institution.

        TODO: specify institutions as constants somewhere.
        TODO: make it work smoothly for mfa

        Args:
            institution: The financial institution to connect to.
            username: The username for the account.
            password: The password for the account.

        Returns:
            An access token for the account.
        """

        response = self._client.connect(institution, {
            'username': username,
            'password': password
        })

        print(response.json())

        # TODO: Factor this into another method so we can cleanly support MFA types
        response = self._client.connect_step(institution, None, options={'send_method': {'type': 'phone'}})

        print(response.json())

        code = input()

        response = self._client.connect_step(institution, code)

        print(response.json())

        return response.json()

    def get_transactions(
        self,
        start: datetime.datetime=datetime.datetime.utcnow() - datetime.timedelta(days=30),
        end: datetime.datetime=datetime.datetime.utcnow(),
        pending=False,
        account_id=None
    ):
        """
        Retrieves transactions from the institution specified by the stored access token.

        Args:
            start: The start date for the transaction history set. Default one month before today.
            end: The end date for the transaction history set. Default today.
            pending: Whether or not to fetch pending transactions.
            account_id: If not None, will fetch transactions only from this account id.

        Returns:
            TODO, a dictionary for now.

        Raises:
            TODO
        """

        options = {
            'pending': pending,
            'gte': start.isoformat(),
            'end': end.isoformat(),
            'account': account_id
        }

        response = self._client.connect_get(options)
        return response.json()
