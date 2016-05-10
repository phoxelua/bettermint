from datetime import datetime, timedelta

from flask import Blueprint, jsonify
from webargs import fields
from werkzeug import exceptions

from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication, use_converted_kwargs
from bettermint.models import Institution


financial_api = Blueprint('financial_api', __name__, url_prefix='/api/financial')


@financial_api.route('/institution', methods=['GET'])
@require_authentication
def get_institutions(user):
    """
    Gets all institutions associated with `user`.
    """
    institutions = Institution.query.with_entities(Institution.name).filter_by(user=user)
    return jsonify({
        'institutions': [i[0] for i in institutions]
    })


@financial_api.route('/institution/<institution>', methods=['DELETE'])
@require_authentication
def delete_institutions(institution, user):
    """
    Deletes an institution associated with `user`.
    """
    if not institution:
        raise exceptions.BadRequest('Institution is required.')
    instn = Institution.query.filter_by(name=institution, user=user).first_or_404()
    instn.delete()
    return jsonify({})


@financial_api.route('/transactions/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/transactions/<institution>/<account_id>', methods=['GET'])
@require_authentication
def get_transactions(institution, account_id, user):
    """
    Get transactions associated with an institution.
    """
    instn = Institution.query.filter_by(user=user, name=institution).first_or_404()
    client = PlaidClient(instn.access_token)
    json = client.get_transactions(start=datetime.now() - timedelta(days=7))
    return jsonify(json)


@financial_api.route('/token/convert', methods=['POST'])
@financial_api.route('/signup/', methods=['POST'])
@use_converted_kwargs({
    'institution': fields.Str(required=True),
    'token': fields.Str(required=True),
})
@require_authentication
def convert_token(institution, token, user):
    """
    Converts a Plaid public key token to an access token.
    """
    client = PlaidClient()
    access_token = client.exchange_token(token)
    Institution(user=user, name=institution, access_token=access_token).save()
    return jsonify({})
