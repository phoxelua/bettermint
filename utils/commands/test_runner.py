import unittest
from pathlib import Path
from flask_script import Command


class TestRunner(Command):
    """Runs unit tests."""

    def run(self):
        path_to_test = str(Path(__file__).parents[2]) + '/tests/'
        testsuite = unittest.TestLoader().discover(path_to_test)
        runner = unittest.TextTestRunner(verbosity=2)
        runner.run(testsuite)
