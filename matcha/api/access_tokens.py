from flask import Blueprint, jsonify
from webargs import fields

from matcha.lib.plaid.plaid import PlaidClient
from matcha.lib.utils.decorators import require_authentication, use_converted_kwargs
from matcha.models import Institution, AccessToken


access_tokens_api = Blueprint('access_tokens_api', __name__, url_prefix='/access_tokens')


@access_tokens_api.route('/', methods=['POST'])
@use_converted_kwargs({
    'institution_name': fields.Str(required=True),
    'token': fields.Str(required=True),
})
@require_authentication
def create_access_token(institution_name, token, user):
    """
    Converts a Plaid public key token to an access token.
    """
    AccessToken(user=user, institution=Institution(name=institution_name), value=PlaidClient().exchange_token(token)).save()
    return jsonify({})
