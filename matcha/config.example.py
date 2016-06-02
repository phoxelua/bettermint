class Config:
    CONFIG_NAME = 'base'

    # Flask
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Plaid
    PLAID_CLIENT_ID = 'yo-plaid-client-id-here'
    PLAID_SECRET = 'yo-plaid-secret-here'
    PLAID_URL = 'https://tartan.plaid.com'

    # Security
    NUM_HASH_ROUNDS = 8000


class DevConfig(Config):
    CONFIG_NAME = 'dev'

    # Flask
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://localhost'
    HOST = '127.0.0.1'
    PORT = 3001
    TOKEN_SECRET_KEY = 'something secret'


class TestingConfig(Config):
    CONFIG_NAME = 'testing'

    # Flask
    TESTING = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_DATABASE_URI = "sqlite://"

    # Security
    NUM_HASH_ROUNDS = 1


class ProdConfig(Config):
    CONFIG_NAME = 'prod'
