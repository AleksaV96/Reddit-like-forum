import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql

article_services = Blueprint("article_services", __name__)

@article_services.route("/", methods=["GET"])
def articles():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM article LEFT JOIN user ON article.author_id = user.id LEFT JOIN category ON article.category_id = category.id")
    rows = cursor.fetchall()

    for r in rows:
        r["published"] = datetime.datetime.isoformat(r["published"])

    return flask.jsonify(rows)

@article_services.route("/<int:article_id>", methods=["GET"])
def article(article_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM article LEFT JOIN user ON article.author_id = user.id LEFT JOIN category ON article.category_id = category.id WHERE article.id=%s", article_id)
    row = cursor.fetchone()

    return flask.jsonify(row)
