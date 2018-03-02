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

    data["published"] = datetime.datetime.today().strftime('%Y-%m-%d')

    cursor.execute(q, (data["title"], data["content"], data["published"], data["user_id"], data["sub_id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@thread_services.route("/<int:thread_id>", methods=["DELETE"])
def delete_thread(thread_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT id FROM comment WHERE thread_id=%s", (thread_id))
    comment_ids = cursor.fetchall()
    for com_id in comment_ids:
        cursor.execute("DELETE FROM userscomments WHERE comment_id=%s", (com_id["id"]))
    cursor.execute("DELETE FROM comment WHERE thread_id=%s", (thread_id))
    cursor.execute("DELETE FROM thread WHERE id=%s", (thread_id))
    db.commit()

    return ""

@thread_services.route("/comments/<int:thread_id>", methods=["GET"])
def comments(thread_id):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM comment, user, userscomments WHERE comment_id = comment.id AND user_id = user.id AND thread_id = %s", (thread_id))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@thread_services.route("/comments/addComment", methods=["POST"])
def post_comment():

    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    comment(content, published, thread_id)
    VALUES(%s, %s, %s)''' 

    data["published"] = data["published"] = datetime.datetime.today().strftime('%Y-%m-%d')

    cursor.execute(q, (data["content"], data["published"], data["thread_id"]))
    db.commit()

    cursor.execute("SELECT id FROM comment ORDER BY id DESC LIMIT 1")
    comment_id = cursor.fetchone()

    q = '''INSERT INTO
    userscomments(comment_id, user_id)
    VALUES(%s, %s)''' 

    cursor.execute(q, (comment_id["id"], data["user_id"]))
    db.commit()
    return flask.jsonify({"status": "done"}), 201

@thread_services.route("/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):

    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM userscomments WHERE comment_id=%s", (comment_id))
    cursor.execute("DELETE FROM comment WHERE id=%s", (comment_id))
    db.commit()

    return ""

@thread_services.route("/sort/asc", methods=["GET"])
def sort_threads_asc():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id ORDER BY published ASC")
    rows = cursor.fetchall()

    for row in rows:
        row["published"] = row["published"].isoformat()

    return flask.jsonify(rows)

@thread_services.route("/sort/desc", methods=["GET"])
def sort_threads_desc():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM thread LEFT JOIN user ON user.id = user_id LEFT JOIN sub ON sub.id = sub_id ORDER BY published DESC")
    rows = cursor.fetchall()

    for row in rows:
        row["published"] = row["published"].isoformat()

    return flask.jsonify(rows)

@thread_services.route("/comments/sort/<int:thread_id>/asc", methods=["GET"])
def sort_comments_asc(thread_id):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM comment, user, userscomments WHERE comment_id = comment.id AND user_id = user.id AND thread_id = %s ORDER BY published ASC", (thread_id))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@thread_services.route("/comments/sort/<int:thread_id>/desc", methods=["GET"])
def sort_comments_desc(thread_id):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM comment, user, userscomments WHERE comment_id = comment.id AND user_id = user.id AND thread_id = %s ORDER BY published DESC", (thread_id))
    rows = cursor.fetchall()

    return flask.jsonify(rows)
