import mock
import unittest

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.token import generate_token_for_user
from matcha.models import Institution
from tests.matcha_test_case import MatchaTestCase
from tests.factories import AccessTokenFactory, UserFactory


class TestAccessTokens(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

    def setUp(self):
        super().setUp()
        self.access_token = AccessTokenFactory.create()
        self.user = self.access_token.user
        self.token = generate_token_for_user(self.user)
        self.institution = self.access_token.institution

        self.deleted_user = UserFactory.create()
        self.nonexistent_token = generate_token_for_user(self.deleted_user)
        self.deleted_user.delete()

    def test_create_access_token_with_nonexistent_user_should_fail(self):
        url = url_for('access_tokens_api.create_access_token')
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('POST', url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST,
                              institution_name=self.institution.name, token=self.token)
        self.assertEqual(Institution.query.count(), 1)

    def test_create_access_token_with_expired_token_should_fail(self):
        url = url_for('access_tokens_api.create_access_token')
        headers = self.create_headers(user=self.user, expire_in=-100)
        self.request_endpoint('POST', url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN,
                              institution_name=self.institution.name, token=self.token)
        self.assertEqual(Institution.query.count(), 1)

    def test_create_access_token_with_valid_institution_should_succeed(self):
        url = url_for('access_tokens_api.create_access_token')
        headers = self.create_headers(user=self.user)
        with mock.patch('matcha.lib.plaid.plaid.PlaidClient.__init__', return_value=None) as mock_client, \
                mock.patch('matcha.lib.plaid.plaid.PlaidClient.exchange_token', return_value='axestoken') as mock_token:
            self.request_endpoint('POST', url, headers, institution_name='bofa', token=self.token)
            self.assertEqual(mock_client.call_count, 1)
            self.assertEqual(mock_token.call_count, 1)
        self.assertEqual(Institution.query.count(), 2)


if __name__ == '__main__':
    unittest.main()
