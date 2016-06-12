from flask import Blueprint, jsonify
from webargs import fields
from werkzeug import exceptions


from matcha.lib.utils.decorators import use_converted_kwargs
from matcha.lib.utils.token import generate_token_for_user
from matcha.lib.utils.web import snake_to_camel_case_dict, is_valid_email
from matcha.factories import UserFactory
from matcha.models import User

users_api = Blueprint('users_api', __name__, url_prefix='/users')


@users_api.route('/', methods=['POST'])
@use_converted_kwargs({
    'first_name': fields.Str(required=True),
    'last_name': fields.Str(required=True),
    'email': fields.Str(required=True, validate=is_valid_email),
    'password': fields.Str(required=True),
})
def create_user(first_name, last_name, email, password):
    """
    Creates a new user with the provided credentials, and returns a token.
    """

    if User.by_email(email):
        raise exceptions.Conflict(description='User already exists.')

    user = UserFactory.instance.create(first_name, last_name, email, password).save()
    token = generate_token_for_user(user)
    return jsonify(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
