import logging
import os,htmlmin
from flask import (Flask,url_for,redirect,session,Response)
from dotenv import load_dotenv
from flask_session import Session
from datetime import timedelta
from config.routing import app_routing
load_dotenv()

app_flask = Flask(__name__,static_url_path='/resources',static_folder='resources')
port = os.getenv('FLASK_RUN_PORT', '8080')
host = os.getenv('FLASK_RUN_HOST', '0.0.0.0')
base_url = f"http://{host}:{port}"
debug = os.getenv('FLASK_RUN_DEBUG')
app_flask.secret_key = os.getenv('FLASK_RUN_SECRET_KEY','akmadnudin')
app_flask.config['SESSION_TYPE'] = 'filesystem'
app_flask.config['BASE_URL'] = base_url
app_flask.config['SESSION_PERMANENT'] = False
app_flask.config['SESSION_USE_SIGNER'] = True
app_flask.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=60)

@app_flask.before_request
def before_request():
    session.permanent=True

@app_flask.after_request
def after_request(response):
    if response.content_type == 'text/html; charset=utf-8':
        minified_html = htmlmin.minify(
            response.get_data(as_text=True),
            remove_comments=True,
            remove_empty_space=True,
            remove_all_empty_space=True,
        )
        response.set_data(minified_html)
    return response

def handle_exceptions(e):
    x_error_handler = f"Exceptions : {str(e)}"
    logging.error(x_error_handler)
    return x_error_handler

Session(app_flask)
app_flask.register_blueprint(app_routing)
if __name__ == '__main__':
    app_routing.run(host=host, port=port,debug=debug)
