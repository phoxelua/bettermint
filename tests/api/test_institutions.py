import json
import unittest
from datetime import timedelta

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.token import generate_token_for_user
from matcha.models import Institution
from tests.matcha_test_case import MatchaTestCase
from tests.factories import AccessTokenFactory, UserFactory, TransactionFactory


class TestInstitutions(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.get_institutions_url = url_for('institutions_api.get_institutions')

    def setUp(self):
        super().setUp()
        self.access_token = AccessTokenFactory.create()
        self.user = self.access_token.user
        self.token = generate_token_for_user(self.user)
        self.institution = self.access_token.institution

        self.deleted_user = UserFactory.create()
        self.nonexistent_token = generate_token_for_user(self.deleted_user)
        self.deleted_user.delete()

    def test_get_institutions_without_authorization_header_should_fail(self):
        self.request_endpoint('GET', self.get_institutions_url, {}, status.HTTP_401_UNAUTHORIZED, MatchaErrors.AUTHORIZATION_HEADER_REQUIRED)

    def test_get_institutions_without_bearer_token_should_fail(self):
        headers = self.create_headers()
        self.request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.BEARER_TOKEN_REQUIRED)

    def test_get_institutions_with_nonexistent_user_should_fail(self):
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST)

    def test_get_institutions_with_expired_token_should_fail(self):
        headers = self.create_headers(user=self.user, expire_in=-100)
        self.request_endpoint('GET', self.get_institutions_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN)

    def test_get_institutions_with_valid_user_and_expiration_should_succeed(self):
        headers = self.create_headers(user=self.user)
        response = self.request_endpoint('GET', self.get_institutions_url, headers)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['institutions'], [self.institution.name])

    def test_delete_institution_with_nonexistent_user_should_fail(self):
        url = url_for('institutions_api.delete_institutions', institution_name=self.institution.name)
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('DELETE', url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST)
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_institution_with_expired_token_should_fail(self):
        url = url_for('institutions_api.delete_institutions', institution_name=self.institution.name)
        headers = self.create_headers(user=self.deleted_user, expire_in=-100)
        self.request_endpoint('DELETE', url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN)
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_nonexistent_institution_with_valid_user_should_fail(self):
        url = url_for('institutions_api.delete_institutions', institution_name='ImNotReal')
        headers = self.create_headers(user=self.user)
        self.request_endpoint('DELETE', url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.STUPID_ERROR)
        self.assertEqual(Institution.query.count(), 1)

    def test_delete_valid_institution_with_valid_user_should_succeed(self):
        url = url_for('institutions_api.delete_institutions', institution_name=self.institution.name)
        headers = self.create_headers(user=self.user)
        self.request_endpoint('DELETE', url, headers)
        self.assertEqual(Institution.query.count(), 0)


if __name__ == '__main__':
    unittest.main()
