import datetime
import jwt

from flask import current_app

from matcha.models import User


def generate_token(dictionary: dict, expiration: datetime.timedelta):
    """
    Generates a JWT encoding the data in `dictionary` with an additional key-value entry which describes
    how long from now the token expires.
    """

    dictionary['expiration'] = (datetime.datetime.utcnow() + expiration).timestamp()

    return jwt.encode(dictionary, current_app.config['TOKEN_SECRET_KEY'], algorithm='HS256')


def decode_token(token: str):
    return jwt.decode(token, current_app.config['TOKEN_SECRET_KEY'], algorithm='HS256')


def generate_token_for_user(user: User, expiration: datetime.timedelta=datetime.timedelta(days=7)):
    """Generates a JWT for a particular user."""

    return generate_token({'id': user.id}, expiration)
