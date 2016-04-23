import functools

import flask


def require_authentication(func):
    """
    Decorator used for routes where authentication is required. If the appropriate credentials have not been provided
    in the header of the request, an exception will be thrown.

    Args:
        func: The func to decorate.
    """

    @functools.wraps(func)
    def wrapped(*args, **kwargs):
        user_id = flask.request.headers.get('user_id', None, int)
        token = flask.request.headers.get('token', None)

        if not user_id:
            raise Exception()
        if not token:
            raise Exception()
        # TODO: Decrypt the token and make sure it's valid.

        return func(*args, **kwargs)
    return wrapped
