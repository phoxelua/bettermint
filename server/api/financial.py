import flask

from server.database import db
from server.models.user import User, UserToInstitution
from server.plaid.plaid import PlaidClient
from server.utilities.decorators import require_authentication


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
    client.get_transactions()
