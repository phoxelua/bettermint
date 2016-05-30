import unittest

from bettermint.models import User, AccessToken, Institution, Goal, Transaction, Account
from tests.bettermint_test_case import BettermintTestCase
from tests.factories import UserFactory, AccessTokenFactory, InstitutionFactory, GoalFactory, TransactionFactory, AccountFactory


class TestUserDeletion(BettermintTestCase):
    """Mainly sanity check: User deletes should/should not cascade to appropiate associations."""

    def test_should_delete_users_access_tokens(self):
        token = AccessTokenFactory.create()
        AccessTokenFactory.create(user=token.user)
        token.user.delete()
        self.assertEqual(User.query.count(), 0)
        self.assertEqual(AccessToken.query.count(), 0)
        self.assertEqual(Institution.query.count(), 2)

    def test_should_delete_users_goals_and_transactions(self):
        for i in range(2):
            user = UserFactory.create()
            GoalFactory.create(user=user, transactions=[TransactionFactory.create(user=user)])

        User.query.first().delete()
        self.assertEqual(User.query.count(), 1)
        self.assertEqual(Goal.query.count(), 1)
        self.assertEqual(Transaction.query.count(), 1)

    def test_should_delete_accounts(self):
        user = AccountFactory.create().user
        user.delete()
        self.assertEqual(User.query.count(), 0)
        self.assertEqual(Account.query.count(), 0)


class TestInstitutionDeletion(BettermintTestCase):
    """Mainly sanity check: Institution deletes should/should not cascade to appropiate associations."""

    def test_should_not_delete_users_belonging_to_it(self):
        token = AccessTokenFactory.create()
        token.institution.delete()
        self.assertEqual(User.query.count(), 1)
        self.assertEqual(AccessToken.query.count(), 0)
        self.assertEqual(Institution.query.count(), 0)

    def test_should_delete_transactions_belonging_to_it(self):
        institution = TransactionFactory.create().institution
        institution.delete()
        self.assertEqual(Institution.query.count(), 0)
        self.assertEqual(Transaction.query.count(), 0)

    def test_should_delete_accounts_belonging_to_it(self):
        institution = AccountFactory.create().institution
        institution.delete()
        self.assertEqual(Institution.query.count(), 0)
        self.assertEqual(Account.query.count(), 0)


class TestGoalDeletion(BettermintTestCase):
    """Mainly sanity check: Goal deletes should/should not cascade to appropiate associations."""

    def test_should_not_delete_related_transactions_or_user(self):
        user = UserFactory.create()
        goal = GoalFactory(user=user, transactions=[TransactionFactory.create(user=user)])
        goal.delete()
        self.assertEqual(User.query.count(), 1)
        self.assertEqual(Goal.query.count(), 0)
        self.assertEqual(Transaction.query.count(), 1)


class TestTransactionDeletion(BettermintTestCase):
    """Mainly sanity check: Transaction deletes should/should not cascade to appropiate associations."""

    def test_should_not_delete_related_goals_or_user(self):
        user = UserFactory.create()
        transaction = TransactionFactory(user=user, goals=[GoalFactory.create(user=user)])
        transaction.delete()
        self.assertEqual(User.query.count(), 1)
        self.assertEqual(Transaction.query.count(), 0)
        self.assertEqual(Goal.query.count(), 1)


class TestAccountDeletion(BettermintTestCase):
    """Mainly sanity check: Transaction deletes should/should not cascade to appropiate associations."""

    pass


if __name__ == '__main__':
    unittest.main()
