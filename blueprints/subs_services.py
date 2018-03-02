import flask
from flask import Blueprint
from utils.db_connection import mysql

subs_services = Blueprint("subs_services", __name__)

@subs_services.route("/", methods=["GET"])
def subs():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM sub")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@subs_services.route("/<int:sub_id>", methods=["GET"])
def sub_threads(sub_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id WHERE thread.sub_id=%s", sub_id)
    row = cursor.fetchall()

    return flask.jsonify(row)

@subs_services.route("/sort/<int:sub_id>/asc", methods=["GET"])
def sort_sub_threads_asc(sub_id):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id WHERE thread.sub_id=%s ORDER BY published ASC", (sub_id))
    rows = cursor.fetchall()

    for row in rows:
        row["published"] = row["published"].isoformat()

    return flask.jsonify(rows)

@subs_services.route("/sort/<int:sub_id>/desc", methods=["GET"])
def sort_sub_threads_desc(sub_id):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id WHERE thread.sub_id=%s ORDER BY published DESC", (sub_id))
    rows = cursor.fetchall()

    for row in rows:
        row["published"] = row["published"].isoformat()

    return flask.jsonify(rows)


