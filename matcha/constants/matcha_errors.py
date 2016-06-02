# TODO: replace with custom error messages when rest apis created
class MatchaErrors:
    AUTHORIZATION_HEADER_REQUIRED = 'Authorization header is not present.'
    BEARER_TOKEN_REQUIRED = 'Bearer token is not present.'
    EXPIRED_TOKEN = 'Token has expired.'
    USER_DOES_NOT_EXIST = 'User does not exist.'
    USER_ALREADY_EXISTS = 'User already exists.'
    INVALID_EMAIL_OR_PASSWORD = 'Email or password were not correct.'
    INVALID_PASSWORD = 'Existing password was not correct.'

    # TODO: remove these, are app should not being doing this
    STUPID_ERROR = 'The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.'
    GENERIC_422 = 'The request was well-formed but was unable to be followed due to semantic errors.'
