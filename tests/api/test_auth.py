import json
import unittest

from flask import url_for

from bettermint.factories import UserFactory
from bettermint.lib.utils import status
from tests.bettermint_test_case import BettermintTestCase


class TestAuth(BettermintTestCase):

    @classmethod
    def setUpClass(cls):
        BettermintTestCase.setUpClass()
        cls.token_url = url_for('auth_api.create_token')
        cls.signup_url = url_for('auth_api.signup')

    def setUp(self):
        BettermintTestCase.setUp(self)
        self.user = UserFactory.instance.create('Ash', 'Ketchum', 'ashk@gmail.com', 'forever10')
        self.user.save()

    def test_token_creation_without_email_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_422_UNPROCESSABLE_ENTITY, password='1234')

    def test_token_creation_without_password_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_422_UNPROCESSABLE_ENTITY, email=self.user.email)

    def test_token_creation_with_nonexistant_user_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_404_NOT_FOUND, email='idontexist@gmail.com', password='1234')

    def test_token_creation_with_incorrect_password_should_fail(self):
        self._post_to_endpoint(self.token_url, status.HTTP_401_UNAUTHORIZED, email=self.user.email, password='wrongpw')

    def test_token_creation_with_correct_password_should_succeed(self):
        self._post_to_endpoint(self.token_url, email=self.user.email, password='forever10')

    def test_signup_without_email_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, password='1234',
                               firstName='Joe', lastName='Blow')

    def test_signup_without_password_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, email='joeb@gmail.com',
                               firstName='Joe', lastName='Blow')

    def test_signup_without_first_name_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, password='1234',
                               email='joeb@gmail.com', lastName='Blow')

    def test_signup_without_last_name_should_fail(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, password='1234',
                               email='joeb@gmail.com', firstName='Joe')

    def test_signup_invalid_email_fails(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_422_UNPROCESSABLE_ENTITY, password='1234',
                               email='12a1421,!?', firstName=self.user.first_name, lastName=self.user.last_name)

    def test_signup_existing_user_fails(self):
        self._post_to_endpoint(self.signup_url, status.HTTP_409_CONFLICT, password='1234',
                               email=self.user.email, firstName=self.user.first_name, lastName=self.user.last_name)

    def test_signup_new_user_succeeds(self):
        self._post_to_endpoint(self.signup_url, password='1234', email='newdude@gmail.com',
                               firstName='New', lastName='Dude')

    def _post_to_endpoint(self, url, expected_status_code=status.HTTP_200_OK, **payload):
        response = self.client.post(url, data=json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, expected_status_code)


if __name__ == '__main__':
    unittest.main()
