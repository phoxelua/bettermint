from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request

from matcha.lib.utils.web import snake_to_camel_case_dict
from matcha.models import Goal


goals_api = Blueprint('goals_api', __name__, url_prefix='/goals')


# TODO: Replace with real shit
@goals_api.route('/', methods=['GET', 'POST'])
def get_goals():
    if request.method == 'GET':
        return jsonify(snake_to_camel_case_dict({
            'goals': [goal.serialize() for goal in Goal.query.all()],
        }))
    elif request.method == 'POST':
        return jsonify(snake_to_camel_case_dict({
            'goal': {
                'id': 1,
                'amount': 1000,
                'name': 'Cool Goal 1',
                'start_date': datetime.now(),
                'end_date': (datetime.now() + timedelta(days=30)),
            },
        }))
