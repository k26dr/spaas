import os
from flask import Flask, jsonify, request
import uuid
import bcrypt
import psycopg2
from psycopg2.extras import DictCursor
import jwt
from datetime import datetime, timedelta


app = Flask(__name__)

conn = psycopg2.connect(dbname="spaas", user="ubuntu")

class ApplicationError(Exception):
    pass

@app.errorhandler(ApplicationError)
def handle_bad_request(e):
    return jsonify({ "error": str(e) }), 400

@app.errorhandler(Exception)
def handle_bad_request(e):
    print(e)
    return jsonify({ "error": str(e) }), 500

@app.before_request
def before_request_func():
    if request.headers.get('Content-Type', None) != "application/json":
        raise ApplicationError("'Content-Type: application/json' header must be set")

@app.route("/register", methods=["POST"])
def register():
    if "email" not in request.json or "password" not in request.json:
        raise ApplicationError("email and password must be specified in request body")
    hashed = bcrypt.hashpw(request.json["password"].encode("utf-8"), bcrypt.gensalt(14))
    with conn, conn.cursor() as cursor:
        user_id = str(uuid.uuid4())
        cursor.execute("INSERT INTO users (id, email, password) VALUES (%s, %s, %s)", (user_id, request.json["email"], hashed.decode("utf-8")))
    return { "user_id": user_id }

@app.route("/login", methods=["POST"])
def login():
    if "email" not in request.json or "password" not in request.json:
        raise ApplicationError("email and password must be specified in request body")
    with conn, conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute("SELECT * FROM users WHERE email=%s", (request.json["email"],))
        user = cursor.fetchone()
        if user is None:
            raise ApplicationError("Bad username/password combo")
    valid = bcrypt.checkpw(request.json["password"].encode("utf-8"), user["password"].encode("utf-8"))
    if not valid:
        raise ApplicationError("Bad username/password combo")

    payload = {
        'iss': 'api.spaasmobility.com',
        'sub': user["id"],
        'exp': datetime.utcnow() + timedelta(hours=12)
    }
    token = jwt.encode(payload, os.environ["JWTKEY"], algorithm='HS256').decode("utf-8")

    return jsonify({ "access_token": token })

app.run(host='0.0.0.0', port=3333)

@app.route("/device/<code>", methods=["GET"])
def get_device(code):
    with conn, conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute("SELECT * FROM devices WHERE code=%s", (code,))
        device = cursor.fetchone()
        if device is None:
            raise ApplicationError("Device not found")
    return device

