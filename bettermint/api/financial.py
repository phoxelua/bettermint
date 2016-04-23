import datetime

import flask

from bettermint.database import db
from bettermint.models.user import User, UserToInstitution
from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication
from bettermint.lib.utils.web import write_success_data


financial_api = flask.Blueprint('financial_api', __name__, url_prefix='/api/financial')


@require_authentication
@financial_api.route('/institution/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/institution/<institution>/<account_id>', methods=['GET'])
def get_institution(institution, account_id):
    """
    Get data associated with an institution.
    """

    user = User.by_email(db.session, 'jason.j.won@gmail.com')
    u2i = UserToInstitution.by_user_id_and_institution(db.session, user.id, institution)
    client = PlaidClient(u2i.access_token)
    json = client.get_transactions(start=datetime.datetime.now() - datetime.timedelta(days=7))
    return write_success_data(json)
