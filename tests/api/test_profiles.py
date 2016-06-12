import json
import unittest

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.token import generate_token_for_user
from tests.matcha_test_case import MatchaTestCase
from tests.factories import UserFactory


class TestProfiles(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.get_profile_url = url_for('profiles_api.get_profile')
        cls.edit_profile_url = url_for('profiles_api.edit_profile')

    def setUp(self):
        super().setUp()
        self.user = UserFactory.create()
        self.token = generate_token_for_user(self.user)

        self.valid_edit_profile_payload = {
            'currentPassword': 'forever10',
            'birthday': '1990-01-01',
        }

        self.edit_profile_payload_with_bad_password = {
            'currentPassword': 'wrong',
            'birthday': '1990-01-01',
        }

        self.edit_profile_payload_with_bad_birthday = {
            'currentPassword': 'forever10',
            'birthday': 'not a date',
        }

        self.deleted_user = UserFactory.create()
        self.nonexistent_token = generate_token_for_user(self.deleted_user)
        self.deleted_user.delete()

    def test_get_profile_without_authorization_header_should_fail(self):
        self.request_endpoint('GET', self.get_profile_url, {}, status.HTTP_401_UNAUTHORIZED, MatchaErrors.AUTHORIZATION_HEADER_REQUIRED)

    def test_get_profile_without_bearer_token_should_fail(self):
        headers = self.create_headers()
        self.request_endpoint('GET', self.get_profile_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.BEARER_TOKEN_REQUIRED)

    def test_get_profile_with_nonexistent_user_should_fail(self):
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('GET', self.get_profile_url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST)

    def test_get_profile_with_expired_token_should_fail(self):
        headers = self.create_headers(user=self.user, expire_in=-100)
        self.request_endpoint('GET', self.get_profile_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN)

    def test_get_profile_with_valid_user_and_expiration_should_succeed(self):
        headers = self.create_headers(user=self.user)
        response = self.request_endpoint('GET', self.get_profile_url, headers)

        response_json = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_json['userProfile']['email'], self.user.email)

    def test_edit_profile_without_authorization_header_should_fail(self):
        self.request_endpoint('PUT', self.edit_profile_url, {}, status.HTTP_401_UNAUTHORIZED, MatchaErrors.AUTHORIZATION_HEADER_REQUIRED,
                              **self.valid_edit_profile_payload)

    def test_edit_profile_without_bearer_token_should_fail(self):
        headers = self.create_headers()
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.BEARER_TOKEN_REQUIRED,
                              **self.valid_edit_profile_payload)

    def test_edit_profile_with_nonexistent_user_should_fail(self):
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST,
                              **self.valid_edit_profile_payload, )

    def test_edit_profile_with_expired_token_should_fail(self):
        headers = self.create_headers(user=self.user, expire_in=-100)
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN,
                              **self.valid_edit_profile_payload)

    def test_edit_profile_with_valid_payload_should_succeed(self):
        headers = self.create_headers(user=self.user)
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_204_NO_CONTENT,
                              **self.valid_edit_profile_payload)

    def test_edit_profile_with_payload_with_bad_password_should_fail(self):
        headers = self.create_headers(user=self.user)
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.INVALID_PASSWORD,
                              **self.edit_profile_payload_with_bad_password)

    def test_edit_profile_with_payload_with_bad_birthday_should_fail(self):
        headers = self.create_headers(user=self.user)
        self.request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422,
                              **self.edit_profile_payload_with_bad_birthday)


if __name__ == '__main__':
    unittest.main()
