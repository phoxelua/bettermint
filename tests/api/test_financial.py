import json
import mock
import unittest
from datetime import timedelta

from flask import url_for

from bettermint.factories import UserFactory
from bettermint.lib.utils import status
from bettermint.lib.utils.token import generate_token
from bettermint.models.user import UserToInstitution
from tests.bettermint_test_case import BettermintTestCase


class TestFinancial(BettermintTestCase):

    @classmethod
    def setUpClass(cls):
        BettermintTestCase.setUpClass()
        cls.get_institutions_url = url_for('financial_api.get_institutions')

    def setUp(self):
        BettermintTestCase.setUp(self)
        self.user = UserFactory.instance.create('Ash', 'Ketchum', 'ashk@gmail.com', 'forever10')
        self.token = generate_token({'email': self.user.email}, timedelta(days=7))
        self.u2i = UserToInstitution(user=self.user, institution='amex', access_token='wontworkinreallife')
        self.user.save()
        self.u2i.save()

    def test_get_institutions_without_authorization_header_should_fail(self):
        self._request_endpoint('GET', self.get_institutions_url, {}, status.HTTP_401_UNAUTHORIZED)

    def test_get_institutions_without_bearer_token_should_fail(self):
        headers = self._create_headers()
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED)

    def test_get_institutions_with_nonexistent_user_should_fail(self):
        headers = self._create_headers(email='idontexist@gmail.com')
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_404_NOT_FOUND)

    def test_get_institutions_with_expired_token_should_fail(self):
        headers = self._create_headers(email='idontexist@gmail.com', expire_in=-100)
        self._request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED)

    def test_get_institutions_with_valid_user_and_expiration_should_succeed(self):
        headers = self._create_headers(email=self.user.email)
        response = self._request_endpoint('GET', self.get_institutions_url, headers)
        self.assertEqual(json.loads(response.data.decode('utf-8'))['institutions'], ['amex'])

    def test_delete_institution_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution=self.u2i.institution)
        headers = self._create_headers(email='idontexist@gmail.com')
        self._request_endpoint('DELETE', url, headers, expected_status_code=status.HTTP_404_NOT_FOUND)
        self.assertEqual(UserToInstitution.query.count(), 1)

    def test_delete_institution_with_expired_token_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution=self.u2i.institution)
        headers = self._create_headers(email='idontexist@gmail.com', expire_in=-100)
        self._request_endpoint('DELETE', url, headers,
                               expected_status_code=status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(UserToInstitution.query.count(), 1)

    def test_delete_nonexistent_institution_with_valid_user_should_fail(self):
        url = url_for('financial_api.delete_institutions', institution='ImNotReal')
        headers = self._create_headers(email=self.user.email)
        self._request_endpoint('DELETE', url, headers, expected_status_code=status.HTTP_404_NOT_FOUND)
        self.assertEqual(UserToInstitution.query.count(), 1)

    def test_delete_valid_institution_with_valid_user_should_succeed(self):
        url = url_for('financial_api.delete_institutions', institution=self.u2i.institution)
        headers = self._create_headers(email=self.user.email)
        self._request_endpoint('DELETE', url, headers)
        self.assertEqual(UserToInstitution.query.count(), 0)

    def test_get_transactions_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.get_transactions', institution=self.u2i.institution)
        headers = self._create_headers(email='idontexist@gmail.com')
        self._request_endpoint('GET', url, headers, expected_status_code=status.HTTP_404_NOT_FOUND)

    def test_get_transactions_with_expired_token_should_fail(self):
        url = url_for('financial_api.get_transactions', institution=self.u2i.institution)
        headers = self._create_headers(email=self.user.email, expire_in=-100)
        self._request_endpoint('GET', url, headers, expected_status_code=status.HTTP_401_UNAUTHORIZED)

    def test_get_transactions_with_nonexistent_institution_should_fail(self):
        url = url_for('financial_api.get_transactions', institution='ImNotReal')
        headers = self._create_headers(email=self.user.email)
        self._request_endpoint('GET', url, headers, expected_status_code=status.HTTP_404_NOT_FOUND)

    def test_get_transactions_with_valid_user_institution_should_succeed(self):
        url = url_for('financial_api.get_transactions', institution=self.u2i.institution)
        headers = self._create_headers(email=self.user.email)
        with mock.patch('bettermint.lib.plaid.plaid.PlaidClient.__init__', return_value=None) as mock_client, \
            mock.patch('bettermint.lib.plaid.plaid.PlaidClient.get_transactions') as mock_get_trasactions:
            self._request_endpoint('GET', url, headers)
            self.assertEqual(mock_client.call_count, 1)
            self.assertEqual(mock_get_trasactions.call_count, 1)

    def test_convert_token_with_nonexistent_user_should_fail(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(email='idontexist@gmail.com')
        self._request_endpoint('POST', url, headers, expected_status_code=status.HTTP_404_NOT_FOUND,
                               institution=self.u2i.institution, token=self.token)
        self.assertEqual(UserToInstitution.query.count(), 1)

    def test_convert_token_with_expired_token_should_fail(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(email=self.user.email, expire_in=-100)
        self._request_endpoint('POST', url, headers, expected_status_code=status.HTTP_401_UNAUTHORIZED,
                               institution=self.u2i.institution, token=self.token)
        self.assertEqual(UserToInstitution.query.count(), 1)

    def test_convert_token_with_valid_institution_should_succeed(self):
        url = url_for('financial_api.convert_token')
        headers = self._create_headers(email=self.user.email)
        with mock.patch('bettermint.lib.plaid.plaid.PlaidClient.__init__', return_value=None) as mock_client, \
            mock.patch('bettermint.lib.plaid.plaid.PlaidClient.exchange_token', return_value='axestoken') as mock_token:
            self._request_endpoint('POST', url, headers, institution='bofa  ', token=self.token)
            self.assertEqual(mock_client.call_count, 1)
            self.assertEqual(mock_token.call_count, 1)
        self.assertEqual(UserToInstitution.query.count(), 2)

    def _create_headers(self, email=None, expire_in=7):
        if email is not None:
            token = generate_token({'email': email}, timedelta(days=expire_in)).decode('utf-8')
        else:
            token = ''
        return {
            'Authorization': 'Bearer {}'.format(token)
        }

    def _request_endpoint(self, method, url, headers, expected_status_code=status.HTTP_200_OK, **payload):
        if method == 'GET':
            response = self.client.get(url, headers=headers)
        elif method == 'DELETE':
            response = self.client.delete(url, headers=headers)
        elif method == 'POST':
            response = self.client.post(url, headers=headers, data=payload)
        self.assertEqual(response.status_code, expected_status_code)
        return response


if __name__ == '__main__':
    unittest.main()
