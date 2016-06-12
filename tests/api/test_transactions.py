import json
import unittest

from flask import url_for

from matcha.constants import MatchaErrors
from matcha.lib.utils import status
from matcha.lib.utils.web import snake_to_camel_case_dict
from matcha.lib.utils.token import generate_token_for_user
from tests.matcha_test_case import MatchaTestCase
from tests.factories import AccessTokenFactory, UserFactory, TransactionFactory


class TestTransactions(MatchaTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

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

    def test_get_transactions_with_nonexistent_user_should_fail(self):
        url = url_for('transactions_api.get_transactions', institution=self.institution.name)
        headers = self.create_headers(user=self.deleted_user)
        self.request_endpoint('GET', url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.USER_DOES_NOT_EXIST)

    def test_get_transactions_with_expired_token_should_fail(self):
        url = url_for('transactions_api.get_transactions', institution=self.institution.name)
        headers = self.create_headers(user=self.user, expire_in=-100)
        self.request_endpoint('GET', url, headers, status.HTTP_401_UNAUTHORIZED, MatchaErrors.EXPIRED_TOKEN)

    def test_get_transactions_with_nonexistent_institution_should_fail(self):
        url = url_for('transactions_api.get_transactions', institution_name='ImNotReal')
        headers = self.create_headers(user=self.user)
        self.request_endpoint('GET', url, headers, status.HTTP_404_NOT_FOUND, MatchaErrors.STUPID_ERROR)

    def test_get_transactions_with_no_institution_should_succeed(self):
        other_transaction = TransactionFactory.create(user=self.user)
        url = url_for('transactions_api.get_transactions')
        headers = self.create_headers(user=self.user)
        response = self.request_endpoint('GET', url, headers, status.HTTP_200_OK)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['transactions'],
                             list(map(snake_to_camel_case_dict, [self.transaction.serialize(), other_transaction.serialize()])))

    def test_get_transactions_with_valid_user_institution_should_succeed(self):
        url = url_for('transactions_api.get_transactions', institution=self.institution.name)
        headers = self.create_headers(user=self.user)
        response = self.request_endpoint('GET', url, headers, status.HTTP_200_OK)
        self.assertListEqual(json.loads(response.data.decode('utf-8'))['transactions'],
                             [snake_to_camel_case_dict(self.transaction.serialize())])


if __name__ == '__main__':
    unittest.main()
