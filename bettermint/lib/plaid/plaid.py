import datetime

from plaid import Client

from flask import current_app
from werkzeug import exceptions


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
        return self._process_transactions(response)

    def delete_user(self):
        """
        Deletes the user associated with this client from Plaid's cache. They will have to log in again next time.
        """

        response = self._client.connect_delete()
        if not response.ok:
            raise exceptions.BadRequest('TODO: SOMETHING FUCKED UP')

    def exchange_token(self, public_token):
        """
        Exchanges the public_token returned by the Plaid Link module for a complete Plaid access token.
        """

        response = self._client.exchange_token(public_token)

        if not response.ok:
            raise exceptions.BadRequest('TODO: SOMETHING FUCKED UP')

        return response.json()['access_token']

    def _process_transactions(self, response):
        """
        Processes a response with data containing transactions from Plaid to be in a specific format.

        Args:
            response: A response from plaid.Client.

        Returns:
            TODO

        Raises:
            TODO
        """

        if not response.ok:
            raise exceptions.BadRequest('TODO: SOMETHING FUCKED UP')

        response_json = response.json()
        transactions = [
            {
                '_id': transaction['_id'],
                '_account': transaction['_account'],
                'date': self._process_transaction_date(transaction['date']),
                'amount': transaction['amount'],
                'name': self._process_transaction_name(transaction['name']),
                'pending': transaction['pending']
            }
            for transaction
            in response_json['transactions']
        ]

        return transactions

    @staticmethod
    def _process_transaction_name(name):
        """
        Prettify the names of transactions.

        TODO: Should we do this at all, or send whatever we get from Plaid?
        """
        return titlecase(name)

    @staticmethod
    def _process_transaction_date(date):
        """Converts `date` from YYYY-MM-DD to epoch time."""
        return datetime.datetime.strptime(date, '%Y-%m-%d').timestamp()
