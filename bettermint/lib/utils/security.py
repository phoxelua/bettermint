from flask import current_app
from passlib.context import CryptContext

from bettermint.lib.utils.lazy import Lazy


class PasswordManager:
    """A wrapper around passlib."""

    context = Lazy(lambda: CryptContext(
        schemes=['pbkdf2_sha512'],
        default='pbkdf2_sha512',
        all__vary_rounds=0.1,
        pbkdf2_sha512__default_rounds=current_app.config['NUM_HASH_ROUNDS'],
    ))
