import re

from flask import jsonify
from werkzeug.exceptions import BadRequest


def is_snake_case(name):
    """Determine whether a name is in snake_case."""

    return "_" in name


def is_camel_case(name):
    """Determine whether a name is in camelCase."""

    return (name != name.lower() and name != name.upper())


def snake_to_camel_case(name):
    """Convert `name` from snake_case to camelCase."""

    first, *rest = name.split('_')
    return first + ''.join(word.capitalize() for word in rest)


def camel_to_snake_case(name):
    """
    Convert `name` from camelCase to snake_case.  Cheers to Stack Overflow.
    http://stackoverflow.com/questions/1175208/elegant-python-function-to-convert-camelcase-to-camel-case
    """

    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def _apply_on_dict_keys_recursively(function, condition: "Callable[[str], bool]", dictionary: dict):
    """
    Applies ``function`` on a JSON-serializable dictionary's keys if ``condition``.

    Since ``dictionary`` is intended to be serialized to JSON, int keys will be converted to strings, and non-int keys
    are not supported.
    """

    for key, elem in dictionary.items():
        dictionary.pop(key)

        if isinstance(key, int):
            key = str(key)
        elif not isinstance(key, str):
            raise Exception("Non-string keys are not supported.")

        if condition(key):
            dictionary[function(key)] = elem
        else:
            dictionary[key] = elem

        if isinstance(elem, dict):
            _apply_on_dict_keys_recursively(function, condition, elem)
        elif isinstance(elem, list):
            for item in elem:
                if isinstance(item, dict):
                    _apply_on_dict_keys_recursively(function, condition, item)


def camel_to_snake_case_dict(dictionary):
    """Converts a JSON-serializable object's keys from camelCase to snake_case."""

    _apply_on_dict_keys_recursively(camel_to_snake_case, is_camel_case, dictionary)
    return dictionary


def snake_to_camel_case_dict(dictionary):
    """Converts a JSON-serializable object's keys from snake_case to camelCase."""

    _apply_on_dict_keys_recursively(snake_to_camel_case, is_snake_case, dictionary)
    return dictionary


def write_fail(message, code=None):
    """Returns a simple failure object with message and an optional error code"""

    obj = {'success': False, 'message': message}
    if code is not None:
        obj['error_code'] = code

    return jsonify(obj)


def write_success():
    """Returns a simple success object."""

    return jsonify({
        'success': True
    })


def write_success_data(data, message=None):
    """Returns a success object with data, and optionally, a message."""

    obj = {'success': True, 'data': data}
    if message:
        obj['message'] = message

    return jsonify(obj)


def get_json_with_keys(request, keys):
    """Given a Flask request, converts it to json and checks if particular keys are in the json."""

    try:
        request_json = camel_to_snake_case_dict(request.get_json())
        for key in keys:
            assert key in request_json
    except BadRequest as e:
        raise Exception("Could not get json from request.") from e
    except AssertionError as e:
        raise Exception("Expected key was not in json.") from e
