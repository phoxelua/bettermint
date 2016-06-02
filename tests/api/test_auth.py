import json
import unittest

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.web import snake_to_camel_case_dict
from matcha.models import User
from tests.matcha_test_case import MatchaTestCase
from tests.factories import UserFactory


class TestAuth(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.token_url = url_for('auth_api.create_token')
        cls.signup_url = url_for('auth_api.signup')

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
        self._post_to_endpoint(self.token_url, status.HTTP_401_UNAUTHORIZED, MatchaErrors.INVALID_EMAIL_OR_PASSWORD, email=self.user.email, password='wrongpw')

    def test_token_creation_with_correct_password_should_succeed(self):
        self._post_to_endpoint(self.token_url, email=self.user.email, password='forever10')

    def test_signup_without_email_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, password='1234',
                               first_name='Joe', last_name='Blow')
        self.assertEqual(User.query.count(), 1)

    def test_signup_without_password_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, email='joeb@gmail.com',
                               first_name='Joe', last_name='Blow')
        self.assertEqual(User.query.count(), 1)

    def test_signup_without_first_name_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, password='1234',
                               email='joeb@gmail.com', last_name='Blow')
        self.assertEqual(User.query.count(), 1)

    def test_signup_without_last_name_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, password='1234',
                               email='joeb@gmail.com', first_name='Joe')
        self.assertEqual(User.query.count(), 1)

    def test_signup_invalid_email_fails(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, MatchaErrors.GENERIC_422, password='1234',
                               email='12a1421,!?', first_name=self.user.first_name, last_name=self.user.last_name)
        self.assertEqual(User.query.count(), 1)

    def test_signup_existing_user_fails(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_409_CONFLICT, MatchaErrors.USER_ALREADY_EXISTS, password='1234',
                               email=self.user.email, first_name=self.user.first_name, last_name=self.user.last_name)
        self.assertEqual(User.query.count(), 1)

    def test_signup_new_user_succeeds(self):
        self._post_to_endpoint(self.signup_url, password='1234', email='newdude@gmail.com',
                               first_name='New', last_name='Dude')
        self.assertEqual(User.query.count(), 2)

    def _post_to_endpoint(self, url, expected_status_code=status.HTTP_200_OK, expected_error_msg=None, **payload):
        response = self.client.post(url, data=json.dumps(snake_to_camel_case_dict(payload)),
                                    content_type='application/json')
        self.assertEqual(response.status_code, expected_status_code)
        if expected_error_msg:
            self.assertEqual(response.json['message'], expected_error_msg)


if __name__ == '__main__':
    unittest.main()
