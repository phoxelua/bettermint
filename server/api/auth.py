import datetime

import flask

from server.database import db
from server.factories.user import UserFactory
from server.models.user import User
from server.utilities.bcrypt import hashpw
from server.utilities.token import generate_token
from server.utilities.web import write_success_data, write_fail, snake_to_camel_case_dict, get_json_with_keys


auth_api = flask.Blueprint('auth_api', __name__, url_prefix='/api/auth')


@auth_api.route('/token/', methods=['POST'])
def create_token():
    """
    If the provided email and password combination is valid, generates a JWT for client-use which expires in 7 days.
    """

    request_json = get_json_with_keys(flask.request, ['email', 'password'])
    email = request_json['email']
    password = request_json['password']
    existing_user = User.by_email(db.session, email)

    if hashpw(password, existing_user.password_salt) == existing_user.password_hash:
        token = generate_token({'email': email}, datetime.timedelta(days=7))

        return write_success_data(snake_to_camel_case_dict({
            'token': token.decode("utf-8")
        }))
    else:
        return write_fail()


@auth_api.route('/signup/', methods=['POST'])
def signup():
    """
    Creates a new user with the provided credentials, and returns a token.
    """

    request_json = get_json_with_keys(flask.request, ['first_name', 'last_name', 'email', 'password'])

    first_name = request_json['first_name']
    last_name = request_json['last_name']
    email = request_json['email']
    password = request_json['password']

    # TODO: Check to make sure that a user with these credentials (this email) doesn't exist.
    user = UserFactory.instance.create(first_name, last_name, email, password)
    db.session.add(user)
    db.session.commit()

    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return write_success_data(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
