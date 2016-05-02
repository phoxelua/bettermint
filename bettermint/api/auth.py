import flask
import datetime
from werkzeug import exceptions

from bettermint.database import db
from bettermint.factories import UserFactory
from bettermint.models import User
from bettermint.lib.utils.bcrypt import hashpw
from bettermint.lib.utils.token import generate_token
from bettermint.lib.utils.web import write_success_data, snake_to_camel_case_dict, get_json_with_keys, is_valid_email


auth_api = flask.Blueprint('auth_api', __name__, url_prefix='/api/auth')


@auth_api.route('/token/', methods=['POST'])
def create_token():
    """
    If the provided email and password combination is valid, generates a JWT for client-use which expires in 7 days.
    """
    try:
        request_json = get_json_with_keys(flask.request, ['email', 'password'])
        email = request_json['email']
        password = request_json['password']
    except:
        raise exceptions.BadRequest(description='Email and password required.')

    existing_user = User.by_email(db.session, email)
    if not existing_user:
        raise exceptions.NotFound(description='User does not exist.')

    if hashpw(password, existing_user.password_salt) != existing_user.password_hash:
        raise exceptions.Unauthorized(description='Email and password were not correct.')

    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return write_success_data(snake_to_camel_case_dict({'token': token.decode("utf-8")}))


@auth_api.route('/signup/', methods=['POST'])
def signup():
    """
    Creates a new user with the provided credentials, and returns a token.
    """

    try:
        request_json = get_json_with_keys(flask.request, ['first_name', 'last_name', 'email', 'password'])
        first_name = request_json['first_name']
        last_name = request_json['last_name']
        email = request_json['email']
        password = request_json['password']
    except:
        raise exceptions.BadRequest(description='First name, last name, email, and password are required.')

    if not is_valid_email(email):
        raise exceptions.BadRequest('Invalid email.')

    if User.by_email(db.session, email):
        raise exceptions.Conflict(description='User already exists.')

    user = UserFactory.instance.create(first_name, last_name, email, password)
    db.session.add(user)
    db.session.commit()

    token = generate_token({'email': email}, datetime.timedelta(days=7))
    return write_success_data(snake_to_camel_case_dict({
        'token': token.decode("utf-8")
    }))
