import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

admin_services = Blueprint("admin_services", __name__)

@admin_services.route("/users", methods=["GET"])
def get_users():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@admin_services.route("/changeSub", methods=["PUT"])
def update_sub():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE sub SET subname=%s, description=%s WHERE id=%s'''
    cursor.execute(q, (data["subname"], data["description"], data["id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@admin_services.route("/addSub", methods=["POST"])
def add_sub():
    
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    sub(subname, description)
    VALUES(%s, %s)'''   

    cursor.execute(q, (data["subname"], data["description"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@admin_services.route("/deleteUser/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM user WHERE id=%s", (user_id))
    db.commit()

    return ""

@admin_services.route("/deleteSub/<int:sub_id>", methods=["DELETE"])
def delete_sub(sub_id):
    db = mysql.get_db()
    cursor = db.cursor()

    cursor.execute("SELECT id FROM thread WHERE sub_id=%s", (sub_id))
    thread_ids = cursor.fetchall()
    comment_ids = []
    for thrd_id in thread_ids:
        cursor.execute("SELECT id FROM comment WHERE thread_id=%s", (thrd_id["id"]))
        comment_ids += cursor.fetchall()

    for com_id in comment_ids:
        cursor.execute("DELETE FROM userscomments WHERE comment_id=%s", (com_id["id"]))

    for com_id in comment_ids:
        cursor.execute("DELETE FROM comment WHERE id=%s", (com_id["id"]))
    
    cursor.execute("DELETE FROM thread WHERE sub_id=%s", (sub_id))
    cursor.execute("DELETE FROM sub WHERE id=%s", (sub_id))

    db.commit()

    return ""

@admin_services.route("/changeProfile", methods=["PUT"])
def update_user_admin():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE user SET username=%s, name=%s, surname=%s, email=%s WHERE id=%s'''
    cursor.execute(q, (data["username"], data["name"], data["surname"], data["email"], data["id"]))
    db.commit()

    return flask.jsonify({"status": "done"}), 201