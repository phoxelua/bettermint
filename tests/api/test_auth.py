import json
import unittest

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.web import snake_to_camel_case_dict
from tests.matcha_test_case import MatchaTestCase
from tests.factories import UserFactory


class TestAuth(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.token_url = url_for('auth_api.create_token')

    def setUp(self):
        super().setUp()
        self.user = UserFactory.create()

    def test_token_creation_without_email_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, password='1234')

    def test_token_creation_without_password_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, email=self.user.email)

    def test_token_creation_with_nonexistant_user_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_404_NOT_FOUND, MatchaErrors.STUPID_ERROR, email='idontexist@gmail.com', password='1234')

    def test_token_creation_with_incorrect_password_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_401_UNAUTHORIZED, MatchaErrors.INVALID_EMAIL_OR_PASSWORD, email=self.user.email,
                               password='wrongpw')

    def test_token_creation_with_correct_password_should_succeed(self):
        self._post_to_endpoint(self.token_url, email=self.user.email, password='forever10')

    def _post_to_endpoint(self, url, expected_status_code=status.HTTP_200_OK, expected_error_msg=None, **payload):
        response = self.client.post(url, data=json.dumps(snake_to_camel_case_dict(payload)),
                                    content_type='application/json')
        self.assertEqual(response.status_code, expected_status_code)
        if expected_error_msg:
            self.assertEqual(response.json['message'], expected_error_msg)


if __name__ == '__main__':
    unittest.main()
