import flask
from flask import Blueprint
from utils.db_connection import mysql

profile_services = Blueprint("profile_services", __name__)

@profile_services.route("/<string:user_username>", methods=["GET"])
def profile(user_username):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE user.username = %s", (user_username))
    rows = cursor.fetchone()


    return flask.jsonify(rows)