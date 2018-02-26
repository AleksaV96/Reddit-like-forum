import flask
import json
import os
import fnmatch
from flask import request
from flask import Blueprint
from utils.db_connection import mysql

user_services = Blueprint("user_services", __name__)

@user_services.route("/", methods=["GET"])
def users():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT id, username, name, surname FROM user")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@user_services.route("/<int:user_id>", methods=["GET"])
def user(user_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT id, username, name, surname FROM user WHERE id=%s", user_id)
    row = cursor.fetchone()

    return flask.jsonify(row)

@user_services.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = json.loads(request.form.to_dict()["userData"])
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE user SET name=%s, surname=%s WHERE id=%s", (data["name"], data["surname"], user_id))
    db.commit()

       

    return flask.jsonify({"success": True})
