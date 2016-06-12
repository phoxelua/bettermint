from flask import Blueprint, jsonify
from webargs import fields, missing
from werkzeug import exceptions

from matcha.lib.utils.decorators import require_authentication, use_converted_kwargs
from matcha.lib.utils.security import PasswordManager
from matcha.lib.utils.status import HTTP_204_NO_CONTENT
from matcha.lib.utils.web import snake_to_camel_case_dict
from matcha.models import UserProfile


profiles_api = Blueprint('profiles_api', __name__, url_prefix='/profiles')


@profiles_api.route('/', methods=['GET'])
@require_authentication
def get_profile(user):
    """
    Profile things.
    """

    user_profile = user.profile if user.profile else UserProfile(user=user).save()

    user_profile_json = {
        'email': user.email,
        'birthday': user_profile.birthday
    }

    return jsonify(snake_to_camel_case_dict({
        'user_profile': user_profile_json
    }))


@profiles_api.route('/edit', methods=['PUT'])
@use_converted_kwargs({
    'birthday': fields.Date(required=False),
    'email': fields.Str(required=False),
    'current_password': fields.Str(required=True),
    'new_password': fields.Str(required=False),
})
@require_authentication
def edit_profile(user, email, current_password, new_password, birthday):
    """
    Edit profile things.
    """

    if not PasswordManager.context.verify(current_password, user.password_hash):
        raise exceptions.Unauthorized('Existing password was not correct.')

    user_profile = user.profile if user.profile else UserProfile(user=user)

    if birthday is not missing:
        user_profile.birthday = birthday

    if email:
        user.email = email

    if new_password:
        hashed = PasswordManager.context.encrypt(new_password)
        user.password_hash = hashed

    user.save()
    user_profile.save()

    return ('', HTTP_204_NO_CONTENT)
