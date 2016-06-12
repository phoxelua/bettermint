from datetime import datetime, timedelta

from flask import Blueprint, jsonify

from matcha.lib.utils.decorators import require_authentication
from matcha.lib.utils.web import snake_to_camel_case_dict
from matcha.models import Institution, Transaction


transactions_api = Blueprint('transactions_api', __name__, url_prefix='/transactions')


@transactions_api.route('/', defaults={'institution_name': None}, methods=['GET'])
@transactions_api.route('/<institution_name>', methods=['GET'])
@require_authentication
def get_transactions(institution_name, user):
    """
    Get transactions associated with an institution.
    """
    transactions = Transaction.query.filter(Transaction.post_date >= datetime.now() - timedelta(days=7))
    if institution_name:
        instn = Institution.query.filter_by(name=institution_name).first_or_404()
        transactions = transactions.filter_by(institution=instn)
    return jsonify(snake_to_camel_case_dict({
        'transactions': [transaction.serialize() for transaction in transactions]
    }))
