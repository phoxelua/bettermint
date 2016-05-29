import factory
from datetime import datetime

from bettermint.database import db
from bettermint.lib.utils.security import PasswordManager
from bettermint.models import User, Institution, AccessToken, Goal, Transaction


class ForceFlushModel(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        sqlalchemy_session = db.session
        force_flush = True


class UserFactory(ForceFlushModel):
    class Meta:
        model = User

    first_name = 'Ash'
    last_name = factory.Sequence(lambda n: str(n))
    email = factory.LazyAttribute(lambda a: '{0}.{1}@fake.com'.format(a.first_name, a.last_name).lower())
    password_hash = factory.LazyAttribute(lambda h: PasswordManager.context.encrypt('forever10'))

    @factory.post_generation
    def transactions(self, create, extracted, **kwargs):
        if create and extracted:
            for transaction in extracted:
                self.transactions.append(transaction)


class InstitutionFactory(ForceFlushModel):
    class Meta:
        model = Institution

    name = factory.Sequence(lambda n: 'Bank {}'.format(n))

    @factory.post_generation
    def transactions(self, create, extracted, **kwargs):
        if create and extracted:
            for transaction in extracted:
                self.transactions.append(transaction)


class AccessTokenFactory(ForceFlushModel):
    class Meta:
        model = AccessToken

    value = factory.Sequence(lambda n: 'value {}'.format(n))
    user = factory.SubFactory(UserFactory)
    institution = factory.SubFactory(InstitutionFactory)


class GoalFactory(ForceFlushModel):
    class Meta:
        model = Goal

    name = factory.Sequence(lambda n: 'Fake Goal {}'.format(n))
    progress = 0
    amount = 350
    start_date = datetime.utcnow()
    end_date = datetime.utcnow()
    user = factory.SubFactory(UserFactory)

    @factory.post_generation
    def transactions(self, create, extracted, **kwargs):
        if create and extracted:
            for transaction in extracted:
                self.transactions.append(transaction)


class TransactionFactory(ForceFlushModel):
    class Meta:
        model = Transaction

    name = factory.Sequence(lambda n: 'Fake Transaction {}'.format(n))
    amount = 25.00
    pending = False
    post_date = datetime.utcnow()
    user = factory.SubFactory(UserFactory)
    institution = factory.SubFactory(InstitutionFactory)

    @factory.post_generation
    def goals(self, create, extracted, **kwargs):
        if create and extracted:
            for goal in extracted:
                self.goals.append(goal)
