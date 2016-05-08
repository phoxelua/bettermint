import datetime

import flask
from flask import jsonify
from webargs import fields
from werkzeug import exceptions

from bettermint.factories import UserFactory
from bettermint.models import User
from bettermint.lib.utils.token import generate_token
from bettermint.lib.utils.web import snake_to_camel_case_dict, is_valid_email
from bettermint.lib.utils.security import PasswordManager
from bettermint.lib.utils.decorators import use_converted_kwargs


auth_api = flask.Blueprint('auth_api', __name__, url_prefix='/api/auth')


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
        raise exceptions.Unauthorized(description='Email and password were not correct.')

    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return jsonify(snake_to_camel_case_dict({'token': token.decode("utf-8")}))


@auth_api.route('/signup/', methods=['POST'])
@use_converted_kwargs({
    'first_name': fields.Str(required=True),
    'last_name': fields.Str(required=True),
    'email': fields.Str(required=True, validate=is_valid_email),
    'password': fields.Str(required=True),
})
def signup(first_name, last_name, email, password):
    """
    Creates a new user with the provided credentials, and returns a token.
    """
    if User.by_email(email):
        raise exceptions.Conflict(description='User already exists.')

    UserFactory.instance.create(first_name, last_name, email, password).save()
    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return jsonify(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
