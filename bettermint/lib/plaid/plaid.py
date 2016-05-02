import datetime
from plaid import Client
from flask import current_app

from bettermint.lib.plaid.institutions import PlaidInstitutions


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
            client_id=current_app.config['PLAID_CLIENT_ID'],
            secret=current_app.config['PLAID_SECRET'],
            access_token=access_token
        )

        self._client.config({
            'url': 'https://tartan.plaid.com'
        })

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

    def delete_user(self):
        """
        Deletes the user associated with this client from Plaid's cache. They will have to log in again next time.
        """
        self._client.connect_delete()

    def exchange_token(self, public_token):
        """
        Exchanges the public_token returned by the Plaid Link module for a complete Plaid access token.
        """

        response = self._client.exchange_token(public_token)

        if response.ok:
            return response.json()['access_token']
