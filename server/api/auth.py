import datetime

import flask

from server.database import db
from server.factories.user import UserFactory
from server.utilities.web import write_success_data, snake_to_camel_case_dict
from server.utilities.token import generate_token


auth_api = flask.Blueprint('auth_api', __name__, url_prefix='/api/auth')


@auth_api.route('/token/', methods=['POST'])
def create_token():
    """
    If the provided email and password combination is valid, generates a JWT for client-use which expires in 7 days.
    """

    # TODO: Ensure that these parameters are valid and won't throw an error.
    # TODO: Write a wrapper which does the get_json and error check, and grabs whatever values you want (with a key check)
    # TODO: Make sure this wrapper uses camel_to_snake_case_dict
    request_json = flask.request.get_json()
    email = request_json['email']
    # password = request_json['password']

    # TODO: Check that the email and password combination are valid for a particular user before emitting this token.
    token = generate_token({'email': email}, datetime.timedelta(days=7))

    # TODO: somehow do the snake_to_camel_case_dict implicitly.  maybe write_success_data shouldn't use default flask jsonify
    return write_success_data(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))


@auth_api.route('/signup/', methods=['POST'])
def signup():
    """
    Creates a new user with the provided credentials, and returns a token.
    """

    # TODO: Ensure that these parameters are valid and won't throw an error.
    request_json = flask.request.get_json()
    email = request_json['email']
    password = request_json['password']

    # TODO: Check to make sure that a user with these credentials (this email) doesn't exist.
    user = UserFactory.instance.create(email, password)
    db.session.add(user)
    db.session.commit()

    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return write_success_data(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
