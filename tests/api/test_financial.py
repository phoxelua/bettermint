import json
import mock
import unittest
from datetime import timedelta

from flask import url_for

from bettermint.lib.utils import status
from bettermint.lib.utils.web import snake_to_camel_case_dict
from bettermint.lib.utils.token import generate_token_for_user
from bettermint.models import Institution
from tests.bettermint_test_case import BettermintTestCase
from tests.factories import AccessTokenFactory, UserFactory, TransactionFactory


class TestFinancial(BettermintTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.get_institutions_url = url_for('financial_api.get_institutions')

    def setUp(self):
        super().setUp()
        self.access_token = AccessTokenFactory.create()
        self.user = self.access_token.user
        self.token = generate_token_for_user(self.user)
        self.institution = self.access_token.institution
        self.transaction = TransactionFactory.create(user=self.user, institution=self.institution)

        self.deleted_user = UserFactory.create()
        self.nonexistent_token = generate_token_for_user(self.deleted_user)
        self.deleted_user.delete()

    def test_get_institutions_without_authorization_header_should_fail(self):
        self._request_endpoint('GET', self.get_institutions_url, {}, status.HTTP_401_UNAUTHORIZED, 'Authorization header is not present.')

    def test_get_institutions_without_bearer_token_should_fail(self):
        headers = self._create_headers()
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED, 'Bearer token is not present.')

    def test_get_institutions_with_nonexistent_user_should_fail(self):
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_404_NOT_FOUND, 'User does not exist.')

    def test_get_institutions_with_expired_token_should_fail(self):
        headers = self._create_headers(user=self.user, expire_in=-100)
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED, 'Token has expired.')

    def test_get_institutions_with_valid_user_and_expiration_should_succeed(self):
        headers = self._create_headers(user=self.user)
        response = self._request_endpoint('GET', self.get_institutions_url, headers)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['institutions'], [self.institution.name])

    def test_delete_institution_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution=self.institution.name)
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('DELETE', url, headers, status.HTTP_404_NOT_FOUND, 'User does not exist.')
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_institution_with_expired_token_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution=self.institution.name)
        headers = self._create_headers(user=self.deleted_user, expire_in=-100)
        self._request_endpoint('DELETE', url, headers, status.HTTP_401_UNAUTHORIZED, 'Token has expired.')
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_nonexistent_institution_with_valid_user_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution='ImNotReal')
        headers = self._create_headers(user=self.user)
        # TODO: should be fixed when we have actual RESTFUL resources
        self._request_endpoint('DELETE', url, headers, status.HTTP_404_NOT_FOUND, 'The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.')
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_valid_institution_with_valid_user_should_succeed(self):
        url = url_for('financial_api.delete_institutions', institution=self.institution.name)
        headers = self._create_headers(user=self.user)
        self._request_endpoint('DELETE', url, headers)
        self.assertEqual(Institution.query.count(), 0)

    def test_get_transactions_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.get_transactions', institution=self.institution.name)
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('GET', url, headers, status.HTTP_404_NOT_FOUND, 'User does not exist.')

    def test_get_transactions_with_expired_token_should_fail(self):
        url = url_for('financial_api.get_transactions', institution=self.institution.name)
        headers = self._create_headers(user=self.user, expire_in=-100)
        self._request_endpoint('GET', url, headers, status.HTTP_401_UNAUTHORIZED, 'Token has expired.')

    def test_get_transactions_with_nonexistent_institution_should_fail(self):
        url = url_for('financial_api.get_transactions', institution='ImNotReal')
        headers = self._create_headers(user=self.user)
        # TODO: should be fixed when we have actual RESTFUL resources
        self._request_endpoint('GET', url, headers, status.HTTP_404_NOT_FOUND, 'The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.')

    def test_get_transactions_with_no_institution_should_succeed(self):
        other_transaction = TransactionFactory.create(user=self.user)
        url = url_for('financial_api.get_transactions')
        headers = self._create_headers(user=self.user)
        response = self._request_endpoint('GET', url, headers, status.HTTP_200_OK)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['transactions'],
                             list(map(snake_to_camel_case_dict, [self.transaction.serialize(), other_transaction.serialize()])))

    def test_get_transactions_with_valid_user_institution_should_succeed(self):
        url = url_for('financial_api.get_transactions', institution=self.institution.name)
        headers = self._create_headers(user=self.user)
        response = self._request_endpoint('GET', url, headers, status.HTTP_200_OK)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['transactions'],
                             [snake_to_camel_case_dict(self.transaction.serialize())])

    def test_convert_token_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('POST', url, headers, status.HTTP_404_NOT_FOUND, 'User does not exist.',
                               institution=self.institution.name, token=self.token)
        self.assertEqual(Institution.query.count(), 1)

    def test_convert_token_with_expired_token_should_fail(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(user=self.user, expire_in=-100)
        self._request_endpoint('POST', url, headers, status.HTTP_401_UNAUTHORIZED, 'Token has expired.',
                               institution=self.institution.name, token=self.token)
        self.assertEqual(Institution.query.count(), 1)

    def test_convert_token_with_valid_institution_should_succeed(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(user=self.user)
        with mock.patch('bettermint.lib.plaid.plaid.PlaidClient.__init__', return_value=None) as mock_client, \
                mock.patch('bettermint.lib.plaid.plaid.PlaidClient.exchange_token', return_value='axestoken') as mock_token:
            self._request_endpoint('POST', url, headers, institution='bofa', token=self.token)
            self.assertEqual(mock_client.call_count, 1)
            self.assertEqual(mock_token.call_count, 1)
        self.assertEqual(Institution.query.count(), 2)

    def _create_headers(self, user=None, expire_in=7):
        if user is not None:
            token = generate_token_for_user(user, timedelta(days=expire_in)).decode('utf-8')
        else:
            token = ''
        return {'Authorization': 'Bearer {}'.format(token)}

    def _request_endpoint(self, method, url, headers, expected_status_code=status.HTTP_200_OK, expected_error_msg=None, **payload):
        if method == 'GET':
            response = self.client.get(url, headers=headers)
        elif method == 'DELETE':
            response = self.client.delete(url, headers=headers)
        elif method == 'POST':
            response = self.client.post(url, headers=headers, data=payload)
        self.assertEqual(response.status_code, expected_status_code)
        if expected_error_msg:
            self.assertEqual(response.json['message'], expected_error_msg)
        return response


if __name__ == '__main__':
    unittest.main()
