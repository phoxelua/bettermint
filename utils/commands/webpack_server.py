import signal
import subprocess
from flask_script import Command


class WebpackServer(Command):
    """Runs WebpackServer module bundling and hot reloading."""

    def run(self):
        subprocess.Popen([
            './node_modules/babel-cli/bin/babel-node.js',
            './node_modules/webpack-dev-server/bin/webpack-dev-server.js'
        ])
        try:
            signal.pause()
        except KeyboardInterrupt:
            pass
