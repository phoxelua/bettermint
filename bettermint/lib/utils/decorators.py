import functools

import flask

from bettermint.database import db
from bettermint.models.user import User
from bettermint.lib.utils.token import decode_token


def require_authentication(func):
    """
    Decorator used for routes where authentication is required. If the appropriate credentials have not been provided
    in the header of the request, an exception will be thrown.

    Additionally, sets the ``user`` keyword argument for the wrapped function's usage.

    Args:
        func: The func to decorate.
    """

    @functools.wraps(func)
    def wrapped(*args, **kwargs):

        authorization_header = flask.request.headers.get('Authorization', None)
        if not authorization_header:
            raise Exception('Authorization header is not present.')

        token = authorization_header.replace('Bearer ', '', 1)
        if not token:
            raise Exception('Bearer token is not present.')

        decrypted = decode_token(token)
        user = User.by_email(db.session, decrypted['email'])
        kwargs['user'] = user

        return func(*args, **kwargs)
    return wrapped
