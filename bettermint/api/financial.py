from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request
from webargs import fields
from werkzeug import exceptions

from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication, use_converted_kwargs
from bettermint.lib.utils.web import snake_to_camel_case_dict
from bettermint.models import Institution, AccessToken


financial_api = Blueprint('financial_api', __name__, url_prefix='/api/financial')


@financial_api.route('/institution', methods=['GET'])
@require_authentication
def get_institutions(user):
    """
    Gets all institutions associated with `user`.
    """
    return jsonify({
        'institutions': [i.name for i in user.institutions]
    })


@financial_api.route('/institution/<institution>', methods=['DELETE'])
@require_authentication
def delete_institutions(institution, user):
    """
    Deletes an institution associated with `user`.
    """
    if not institution:
        raise exceptions.BadRequest('Institution is required.')
    instn = user.institutions.filter_by(name=institution).first_or_404()
    instn.delete()
    return jsonify({})


@financial_api.route('/transactions/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/transactions/<institution>/<account_id>', methods=['GET'])
@require_authentication
def get_transactions(institution, account_id, user):
    """
    Get transactions associated with an institution.
    """
    access_token = AccessToken.query.filter_by(user=user).join(Institution).filter_by(name=institution).first_or_404()
    client = PlaidClient(access_token)
    transactions = client.get_transactions(start=datetime.now() - timedelta(days=7))
    return jsonify({
        'transactions': transactions
    })


@financial_api.route('/token/convert', methods=['POST'])
@use_converted_kwargs({
    'institution': fields.Str(required=True),
    'token': fields.Str(required=True),
})
@require_authentication
def convert_token(institution, token, user):
    """
    Converts a Plaid public key token to an access token.
    """
    AccessToken(user=user, institution=Institution(name=institution), value=PlaidClient().exchange_token(token)).save()
    return jsonify({})

# TODO: Replace with real shit
@financial_api.route('/goals', methods=['GET', 'POST'])
def goals():
    if request.method == 'GET':
        return jsonify(snake_to_camel_case_dict({
            'goals': [{
                'id': 1,
                'amount': 1000,
                'name': 'Cool Goal 1',
                'start_date': datetime.now().timestamp(),
                'end_date': (datetime.now() + timedelta(days=30)).timestamp(),
            }],
        }))
    elif request.method == 'POST':
        return jsonify(snake_to_camel_case_dict({
            'goal': {
                'id': 1,
                'amount': 1000,
                'name': 'Cool Goal 1',
                'start_date': datetime.now().timestamp(),
                'end_date': (datetime.now() + timedelta(days=30)).timestamp(),
            },
        }))
