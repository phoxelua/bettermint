import bcrypt


def hashpw(password: str, salt: str):
    """A wrapper around bcrypt.hashpw which does the encoding/decoding for you."""
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt.encode('utf-8'))
    return hashed.decode('utf-8')


def gensalt():
    """A wrapper around bcrypt.hashpw which does the decoding for you."""
    return bcrypt.gensalt().decode('utf-8')
