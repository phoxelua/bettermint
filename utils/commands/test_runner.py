import imp
import os
import unittest
from pathlib import Path

from flask_script import Command


class TestRunner(Command):
    """Runs unit tests."""

    def is_valid_dir(self, cwd, d):
        return d in os.listdir(cwd)

    def is_valid_file(self, cwd, d):
        return d + '.py' in os.listdir(cwd)

    def extract_flags_and_path(self, args):
        fail_fast = False
        for a in args:
            if a == '--failfast':
                fail_fast = True
                args.remove('--failfast')
        return fail_fast, args[0].split('.')

    def run(self, remaining_args):
        path_to_test = str(Path(__file__).parents[2]) + '/tests/'
        if remaining_args:
            fail_fast, path = self.extract_flags_and_path(remaining_args)
            while path:
                dof = path.pop(0)
                if self.is_valid_dir(path_to_test, dof):
                    path_to_test += dof + '/'
                elif self.is_valid_file(path_to_test, dof):
                    m = imp.load_source(dof, path_to_test + '{}.py'.format(dof))
                    testsuite = unittest.TestLoader().loadTestsFromModule(m)
                    runner = unittest.TextTestRunner(verbosity=2, failfast=fail_fast)
                    runner.run(testsuite)
                    return
        testsuite = unittest.TestLoader().discover(path_to_test)
        runner = unittest.TextTestRunner(verbosity=2, failfast=fail_fast)
        runner.run(testsuite)
