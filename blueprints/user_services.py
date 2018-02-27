import flask
import json
import os
import fnmatch
from flask import request
from flask import Blueprint
from utils.db_connection import mysql

user_services = Blueprint("user_services", __name__)

@user_services.route("/changeProfile", methods=["PUT"])
def update_user():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE user SET name=%s, surname=%s, email=%s WHERE id=%s'''
    cursor.execute(q, (data["name"], data["surname"], data["email"], data["id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201
