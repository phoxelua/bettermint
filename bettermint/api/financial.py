import datetime

import flask
from werkzeug import exceptions

from bettermint.database import db
from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication
from bettermint.lib.utils.web import write_fail, write_success_data, write_success
from bettermint.models.user import User, UserToInstitution


financial_api = flask.Blueprint('financial_api', __name__, url_prefix='/api/financial')


@financial_api.route('/institution', methods=['GET'])
@require_authentication
def get_institutions(user):
    """
    Gets all institutions associated with `user`.
    """

    u2is = db.session.query(UserToInstitution).filter(
        UserToInstitution.user == user
    ).all()

    institutions = [u2i.institution for u2i in u2is]

    return write_success_data({
        'institutions': institutions
    })


@financial_api.route('/institution/<institution>', methods=['DELETE'])
@require_authentication
def delete_institutions(institution, user):
    """
    Deletes an institution associated with `user`.
    """

    if not institution:
        raise exceptions.BadRequest('Institution is required.')

    u2i = db.session.query(UserToInstitution).filter(
        UserToInstitution.user == user,
        UserToInstitution.institution == institution
    ).one()

    db.session.delete(u2i)
    db.session.commit()

    return write_success()


@financial_api.route('/transactions/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/transactions/<institution>/<account_id>', methods=['GET'])
@require_authentication
def get_transactions(institution, account_id, user):
    """
    Get transactions associated with an institution.
    """

    u2i = UserToInstitution.by_user_id_and_institution(db.session, user.id, institution)

    if u2i:
        client = PlaidClient(u2i.access_token)
        transactions = client.get_transactions(start=datetime.datetime.now() - datetime.timedelta(days=7))
        return write_success_data({
            'transactions': transactions
        })
    else:
        return write_fail("That user isn't associated with that institution!")


@financial_api.route('/token/convert', methods=['POST'])
@require_authentication
def convert_token(user: User):
    """
    Converts a Plaid public key token to an access token.
    """

    request_json = flask.request.get_json()

    institution = request_json['institution']
    client = PlaidClient()
    access_token = client.exchange_token(request_json['token'])
    u2i = UserToInstitution(
        user=user,
        institution=institution,
        access_token=access_token
    )

    db.session.add(u2i)
    db.session.commit()

    return write_success()
