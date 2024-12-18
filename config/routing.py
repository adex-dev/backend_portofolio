import os,time
from pyexpat.errors import messages

from flask import Blueprint,render_template
from dotenv import load_dotenv

load_dotenv()

app_routing =Blueprint('main',__name__)
app_routing.secret_key = os.getenv('SECRET_KEY',"akmadnudin")
admin = "/admin-back/"
api = "/api"
proses_page ="process/"
messages_response = "Invalid Request"

app =app_routing

@app.route("/",methods=["GET"])
@app.route('/index',methods=["GET"])
def index():
    return render_template("index.html")