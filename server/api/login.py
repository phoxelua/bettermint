import datetime

import flask
import jwt

from server.config import SECRET_KEY
from server.utilities.web import write_success_data, snake_to_camel_case_dict


login_api = flask.Blueprint('login_api', __name__, url_prefix='/api/login')


@login_api.route('/token/', methods=['POST'])
def generate_token():
    """
    If the provided email and password combination is valid, generates a JWT for client-use which expires in 7 days.
    """

    # TODO: Ensure that these parameters are valid and won't throw an error.
    request_json = flask.request.get_json()
    email = request_json['email']
    # password = request_json['password']

    # TODO: Check that the email and password combination are valid for a particular user before emitting this token.
    token = jwt.encode({
        'email': email,
        'expiration': (datetime.datetime.utcnow() + datetime.timedelta(days=7)).timestamp()
    }, SECRET_KEY, algorithm='HS256')

    return write_success_data(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
