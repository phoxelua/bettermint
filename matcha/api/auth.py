from flask import Blueprint, jsonify
from webargs import fields
from werkzeug import exceptions
from matcha.models import User
from matcha.lib.utils.decorators import require_authentication, use_converted_kwargs
from matcha.lib.utils.security import PasswordManager
from matcha.lib.utils.status import HTTP_204_NO_CONTENT
from matcha.lib.utils.token import generate_token_for_user
from matcha.lib.utils.web import snake_to_camel_case_dict


auth_api = Blueprint('auth_api', __name__, url_prefix='/auth')


@auth_api.route('/token/', methods=['POST'])
@use_converted_kwargs({
    'email': fields.Str(required=True),
    'password': fields.Str(required=True),
})
def create_token(email, password):
    """
    If the provided email and password combination is valid, generates a JWT for client-use which expires in 7 days.
    """

    existing_user = User.query.filter_by(email=email).first_or_404()
    if not PasswordManager.context.verify(password, existing_user.password_hash):
        raise exceptions.Unauthorized(description='Email or password were not correct.')

    token = generate_token_for_user(existing_user)
    return jsonify(snake_to_camel_case_dict({'token': token.decode("utf-8")}))


@auth_api.route('/token/is_valid', methods=['POST'])
@require_authentication
def check_token(user):
    """
    Checks to see if `token` is valid (corresponds to a valid user, and is not expired).
    """

    return ('', HTTP_204_NO_CONTENT)
