from datetime import datetime
import functools

import flask
from webargs.flaskparser import use_kwargs
from werkzeug import exceptions

from matcha.lib.utils.token import decode_token
from matcha.lib.utils.web import camel_to_snake_case_dict, snake_to_camel_case_dict
from matcha.models.user import User


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
            raise exceptions.Unauthorized('Authorization header is not present.')

        token = authorization_header.replace('Bearer ', '', 1)
        if not token:
            raise exceptions.Unauthorized('Bearer token is not present.')

        try:
            decrypted = decode_token(token)
        except:
            raise exceptions.Unauthorized('Token is malformed.')

        if decrypted['expiration'] < datetime.utcnow().timestamp():
            raise exceptions.Unauthorized('Token has expired.')

        user = 'id' in decrypted and User.query.get(decrypted['id'])
        if not user:
            raise exceptions.NotFound('User does not exist.')

        kwargs['user'] = user
        return func(*args, **kwargs)
    return wrapped


def use_converted_kwargs(kwargs_):
    """
    Decorator which does the same thing as `use_kwargs`, but first converts all of the params to snake case.
    """

    def decorator(func):
        @functools.wraps(func)
        def wrapped(*args, **kwargs):
            kwargs = camel_to_snake_case_dict(kwargs)
            return func(*args, **kwargs)
        return use_kwargs(snake_to_camel_case_dict(kwargs_))(wrapped)
    return decorator
