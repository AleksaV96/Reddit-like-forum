import flask
import datetime
from flask import Blueprint
from flask import request
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

@thread_services.route("/<int:thread_id>", methods=["GET"])
def thread(thread_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id WHERE thread.id = %s", (thread_id))
    row = cursor.fetchone()

    return flask.jsonify(row)

@thread_services.route("/addThread", methods=["POST"])
def addThread():
    
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    thread(title, content, published, user_id, sub_id)
    VALUES(%s, %s, %s, %s, %s)'''   

    data["published"] = "2017-12-12"

    cursor.execute(q, (data["title"], data["content"], data["published"], data["user_id"], data["sub_id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201