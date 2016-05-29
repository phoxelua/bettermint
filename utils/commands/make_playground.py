from flask_script import Command

from bettermint.models import User
from bettermint.factories import UserFactory
from tests.factories import AccessTokenFactory, GoalFactory, TransactionFactory


class MakePlayground(Command):
    """Creates a fake environment with Users, Institutions, Goals, and Transactions."""

    def run(self):
        """Runs this command."""
        if User.query.filter_by(email='matcha@gmail.com').first():
            print('Example user and data already exists.')
            return
        user = UserFactory.instance.create(first_name='John', last_name='Smith', email='matcha@gmail.com', password=('matcha'))
        user.save()
        print('Created user `matcha@gmail.com` with password `matcha`')
        tokens = AccessTokenFactory.create_batch(2, user=user)
        print('Created example institutions: {}'.format(', '.join(token.institution.name for token in tokens)))

        for i in range(2):
            goal = GoalFactory.create(user=user)
            TransactionFactory.create_batch(50, goals=[goal], institution=tokens[i].institution)
            goal.save()
            print('Created goal `{}` with `{}` Transactions'.format(goal.name, 100))
