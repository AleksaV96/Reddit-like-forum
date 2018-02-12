import flask
from flask import Blueprint
from utils.db_connection import mysql

thread_services = Blueprint("thread_services", __name__)

@thread_services.route("/", methods=["GET"])
def threads():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id")
    rows = cursor.fetchall()

    for row in rows:
        row["published"] = row["published"].isoformat()

    return flask.jsonify(rows)

