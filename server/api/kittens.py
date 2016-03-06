import flask

from server.models import Kitten
from server.app import db

kittens_api = flask.Blueprint('kittens_api', __name__, url_prefix='/api/kittens')


@kittens_api.route('/', methods=['GET'])
def kittens_get():
    kittens = Kitten.query
    return flask.jsonify({
        'kittens': [{
            'id': kitten.id,
            'created': kitten.created.isoformat() + 'Z'
        } for kitten in kittens]
    })


@kittens_api.route('/', methods=['POST'])
def kittens_post():
    count = Kitten.query.count()

    if count >= 9:
        return flask.jsonify({'error': 'This basket is full of kittens!'}), 403

    new_kitten = Kitten()
    db.session.add(new_kitten)
    db.session.commit()

    return flask.jsonify({
        'id': new_kitten.id,
        'created': new_kitten.created.isoformat() + 'Z'
    })


@kittens_api.route('/<int:kitten_id>/', methods=['DELETE'])
def kittens_delete(kitten_id):
    kitten = Kitten.query.get_or_404(kitten_id)
    db.session.delete(kitten)
    db.session.commit()

    return ('', 204)
