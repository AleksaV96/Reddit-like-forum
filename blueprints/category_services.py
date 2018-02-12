import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql

category_services = Blueprint("category_services", __name__)

@category_services.route("/", methods=["GET"])
def categories():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM category")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@category_services.route("/<int:category_id>", methods=["GET"])
def category(category_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM category WHERE id=%s", category_id)
    row = cursor.fetchone()

    return flask.jsonify(row)
