import json
import unittest
from datetime import timedelta

from flask import url_for

from matcha.lib.utils import status
from matcha.lib.utils.token import generate_token_for_user
from tests.matcha_test_case import MatchaTestCase
from tests.factories import UserFactory


class TestProfile(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.get_profile_url = url_for('profile_api.get_profile')
        cls.edit_profile_url = url_for('profile_api.edit_profile')

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
        self._request_endpoint('GET', self.get_profile_url, {}, status.HTTP_401_UNAUTHORIZED)

    def test_get_profile_without_bearer_token_should_fail(self):
        headers = self._create_headers()
        self._request_endpoint('GET', self.get_profile_url, headers, status.HTTP_401_UNAUTHORIZED)

    def test_get_profile_with_nonexistent_user_should_fail(self):
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('GET', self.get_profile_url, headers, status.HTTP_404_NOT_FOUND)

    def test_get_profile_with_expired_token_should_fail(self):
        headers = self._create_headers(user=self.user, expire_in=-100)
        self._request_endpoint('GET', self.get_profile_url, headers, status.HTTP_401_UNAUTHORIZED)

    def test_get_profile_with_valid_user_and_expiration_should_succeed(self):
        headers = self._create_headers(user=self.user)
        response = self._request_endpoint('GET', self.get_profile_url, headers)

        response_json = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response_json['userProfile']['email'], self.user.email)

    def test_edit_profile_without_authorization_header_should_fail(self):
        self._request_endpoint('PUT', self.edit_profile_url, {}, status.HTTP_401_UNAUTHORIZED,
                               self.valid_edit_profile_payload)

    def test_edit_profile_without_bearer_token_should_fail(self):
        headers = self._create_headers()
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED,
                               self.valid_edit_profile_payload)

    def test_edit_profile_with_nonexistent_user_should_fail(self):
        headers = self._create_headers(user=self.deleted_user)
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_404_NOT_FOUND,
                               self.valid_edit_profile_payload)

    def test_edit_profile_with_expired_token_should_fail(self):
        headers = self._create_headers(user=self.user, expire_in=-100)
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED,
                               self.valid_edit_profile_payload)

    def test_edit_profile_with_valid_payload_should_succeed(self):
        headers = self._create_headers(user=self.user)
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_204_NO_CONTENT,
                               self.valid_edit_profile_payload)

    def test_edit_profile_with_payload_with_bad_password_should_fail(self):
        headers = self._create_headers(user=self.user)
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_401_UNAUTHORIZED,
                               self.edit_profile_payload_with_bad_password)

    def test_edit_profile_with_payload_with_bad_birthday_should_fail(self):
        headers = self._create_headers(user=self.user)
        self._request_endpoint('PUT', self.edit_profile_url, headers, status.HTTP_422_UNPROCESSABLE_ENTITY,
                               self.edit_profile_payload_with_bad_birthday)

    def _create_headers(self, user=None, expire_in=7):
        if user is not None:
            token = generate_token_for_user(user, timedelta(days=expire_in)).decode('utf-8')
        else:
            token = ''
        return {
            'Authorization': 'Bearer {}'.format(token)
        }

    def _request_endpoint(self, method, url, headers, expected_status_code=status.HTTP_200_OK, payload={}):
        if method == 'GET':
            response = self.client.get(url, headers=headers)
        elif method == 'DELETE':
            response = self.client.delete(url, headers=headers)
        elif method == 'POST':
            response = self.client.post(url, headers=headers, data=payload)
        elif method == 'PUT':
            response = self.client.put(url, headers=headers, data=payload)
        self.assertEqual(response.status_code, expected_status_code)
        return response


if __name__ == '__main__':
    unittest.main()
