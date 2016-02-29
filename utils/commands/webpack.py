import signal
import subprocess
from flask.ext.script import Command


class Webpack(Command):
    """Runs Webpack module bundling and hot reloading."""

    def run(self):
        subprocess.Popen(['./node_modules/.bin/webpack-dev-server'])
        try:
            signal.pause()
        except KeyboardInterrupt:
            pass
