class Config:
    CONFIG_NAME = 'base'

    # Flask
    DEBUG = False
    TESTING = False

    # Plaid
    PLAID_CLIENT_ID = 'yo-plaid-client-id-here'
    PLAID_SECRET = 'yo-plaid-secret-here'
    PLAID_URL = 'https://tartan.plaid.com'


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


class ProdConfig(Config):
    CONFIG_NAME = 'prod'
