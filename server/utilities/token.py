import datetime

import jwt

from server.config import SECRET_KEY


def generate_token(dictionary: dict, expiration: datetime.timedelta):
    """
    Generates a JWT encoding the data in `dictionary` with an additional key-value entry which describes
    how long from now the token expires.
    """

    dictionary['expiration'] = (datetime.datetime.utcnow() + expiration).timestamp()

    return jwt.encode(dictionary, SECRET_KEY, algorithm='HS256')
