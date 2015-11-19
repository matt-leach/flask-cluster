from flask import Flask

from secret import SECRET_KEY

app = Flask(__name__)
app.config.from_object(__name__)
