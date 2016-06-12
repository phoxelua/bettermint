from flask import Blueprint, jsonify
from werkzeug import exceptions

from matcha.lib.utils.decorators import require_authentication


institutions_api = Blueprint('institutions_api', __name__, url_prefix='/institutions')


@institutions_api.route('/', methods=['GET'])
@require_authentication
def get_institutions(user):
    """
    Gets all institutions associated with `user`.
    """
    return jsonify({
        'institutions': [i.name for i in user.institutions]
    })


@institutions_api.route('/<string:institution_name>', methods=['DELETE'])
@require_authentication
def delete_institutions(institution_name, user):
    """
    Deletes an institution associated with `user`.
    """
    if not institution_name:
        raise exceptions.BadRequest('Institution is required.')
    instn = user.institutions.filter_by(name=institution_name).first_or_404()
    instn.delete()
    return jsonify({})
