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
    if request.method == "POST" and request.headers.get('Content-Type', None) != "application/json":
        raise ApplicationError("'Content-Type: application/json' header must be set")

@app.route("/register", methods=["POST"])
def register():
    if "email" not in request.json or "password" not in request.json:
        raise ApplicationError("email and password must be specified in request body")
    hashed = bcrypt.hashpw(request.json["password"].encode("utf-8"), bcrypt.gensalt(14))
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    try:
        with conn, conn.cursor() as cursor:
            user_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO users (id, email, first_name, last_name, password) VALUES (%s, %s, %s, %s, %s)", 
                (user_id, request.json["email"], first_name, last_name, hashed.decode("utf-8"))
            )
    except psycopg2.errors.IntegrityError:
        raise ApplicationError("Email is already registered")
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

@app.route("/device/<code>", methods=["POST"])
def add_device(code):
    user_id = auth_user(request)
    with conn, conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute("UPDATE devices SET user_id=%s WHERE code=%s", (user_id, code,))
        if cursor.rowcount != 1:
            raise ApplicationError("Device not found")
    return jsonify({ "success": True })

@app.route("/devices", methods=["GET"])
def get_devices():
    user_id = auth_user(request)
    with conn, conn.cursor(cursor_factory=DictCursor) as cursor:
        cursor.execute("SELECT * FROM devices WHERE user_id=%s", (user_id,))
        devices = cursor.fetchall()
        devices = [dict(device) for device in devices]
    return jsonify(devices)

def auth_user(request):
    access_token = request.headers.get('SPAAS-ACCESS-TOKEN')
    payload = jwt.decode(access_token, os.environ["JWTKEY"], algorithms=['HS256'])
    print(payload)
    return payload['sub']

app.run(host='0.0.0.0', port=3333)

