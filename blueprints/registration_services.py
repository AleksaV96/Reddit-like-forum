import flask
import pymysql
from flask import Flask
from flask import Blueprint
from utils.db_connection import mysql
from flaskext.mysql import MySQL
from flask import request

registration_services = Blueprint("registration_services", __name__)
mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)

@registration_services.route("/registration", methods=["POST"])
def addUser():
    
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    user(username, email, password)
    VALUES(%s, %s, %s)'''

    cursor.execute(q, (data["username"], data["email"], data["password"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201
