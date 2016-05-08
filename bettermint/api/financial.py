from datetime import datetime, timedelta

import flask
from flask import jsonify
from webargs import fields
from webargs.flaskparser import use_kwargs
from werkzeug import exceptions

from bettermint.lib.plaid.plaid import PlaidClient
from bettermint.lib.utils.decorators import require_authentication
from bettermint.models.user import UserToInstitution


financial_api = flask.Blueprint('financial_api', __name__, url_prefix='/api/financial')


@financial_api.route('/institution', methods=['GET'])
@require_authentication
def get_institutions(user):
    """
    Gets all institutions associated with `user`.
    """
    institutions = UserToInstitution.query.with_entities(UserToInstitution.institution).filter_by(user=user)
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
    u2i = UserToInstitution.query.filter_by(institution=institution, user=user).first_or_404()
    u2i.delete()
    return jsonify({})


@financial_api.route('/transactions/<institution>', defaults={'account_id': None}, methods=['GET'])
@financial_api.route('/transactions/<institution>/<account_id>', methods=['GET'])
@require_authentication
def get_transactions(institution, account_id, user):
    """
    Get transactions associated with an institution.
    """
    u2i = UserToInstitution.query.filter_by(user=user, institution=institution).first_or_404()
    client = PlaidClient(u2i.access_token)
    json = client.get_transactions(start=datetime.now() - timedelta(days=7))
    return jsonify(json)


@financial_api.route('/token/convert', methods=['POST'])
@financial_api.route('/signup/', methods=['POST'])
@use_kwargs({
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
    UserToInstitution(
        user=user,
        institution=institution,
        access_token=access_token
    ).save()

    return jsonify({})
