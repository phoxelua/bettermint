from faker import Faker
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
        amex = AccessTokenFactory.create(user=user, institution__name='amex').institution
        bofa = AccessTokenFactory.create(user=user, institution__name='bofa').institution
        print('Created example institutions: amex, boa')

        fake = Faker()

        goal = GoalFactory.create(user=user, name='Roth IRA', amount=5500)
        for i in range(51):
            TransactionFactory.create(goals=[goal], institution=amex,
                                      name=fake.bs(), amount=fake.pydecimal(right_digits=2),
                                      post_date=fake.date_time_this_year())
        goal.save()
        print('Created goal `{}` with `{}` Transactions'.format(goal.name, 50))

        goal = GoalFactory.create(user=user, name='Spend less on food', amount=1000)
        for j in range(51):
            TransactionFactory.create(goals=[goal], institution=bofa,
                                      name=fake.bs(), amount=fake.pydecimal(right_digits=2),
                                      post_date=fake.date_time_this_month())
        goal.save()
        print('Created goal `{}` with `{}` Transactions'.format(goal.name, 30))
