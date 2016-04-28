import datetime

import flask

from bettermint.database import db
from bettermint.models.user import User, UserToInstitution
from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication
from bettermint.lib.utils.web import write_success_data, write_success


financial_api = flask.Blueprint('financial_api', __name__, url_prefix='/api/financial')


@financial_api.route('/institution/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/institution/<institution>/<account_id>', methods=['GET'])
@require_authentication
def get_institution(institution, account_id, user):
    """
    Get data associated with an institution.
    """

    u2i = UserToInstitution.by_user_id_and_institution(db.session, user.id, institution)
    client = PlaidClient(u2i.access_token)
    json = client.get_transactions(start=datetime.datetime.now() - datetime.timedelta(days=7))
    return write_success_data(json)


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
