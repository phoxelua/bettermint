from datetime import timedelta

from flask_testing import TestCase

from matcha.database import db
from matcha.lib.utils import status
from matcha.lib.utils.token import generate_token_for_user
from matcha.lib.utils.web import snake_to_camel_case_dict


class MatchaTestCase(TestCase):

    def create_app(self):
        from flask import current_app
        from matcha.config import TestingConfig
        current_app.config.from_object(TestingConfig)
        return current_app

    def setUp(self):
        TestCase.setUp(self)
        db.create_all()

    def tearDown(self):
        TestCase.tearDown(self)
        db.session.remove()
        db.drop_all()

    def create_headers(self, user=None, expire_in=7):
        if user is not None:
            token = generate_token_for_user(user, timedelta(days=expire_in)).decode('utf-8')
        else:
            token = ''
        return {'Authorization': 'Bearer {}'.format(token)}

    def request_endpoint(self, method, url, headers, expected_status_code=status.HTTP_200_OK, expected_error_msg=None, **payload):
        if method == 'GET':
            response = self.client.get(url, headers=headers)
        elif method == 'DELETE':
            response = self.client.delete(url, headers=headers)
        elif method == 'POST':
            response = self.client.post(url, headers=headers, data=snake_to_camel_case_dict(payload))
        elif method == 'PUT':
            response = self.client.put(url, headers=headers, data=snake_to_camel_case_dict(payload))
        self.assertEqual(response.status_code, expected_status_code)
        if expected_error_msg:
            self.assertEqual(response.json['message'], expected_error_msg)
        return response
