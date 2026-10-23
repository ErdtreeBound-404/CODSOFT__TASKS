import os
import tempfile
import pytest
import database
from app import create_app

@pytest.fixture
def app(monkeypatch, tmp_path):
    db_path = tmp_path / "test.db"
    monkeypatch.setattr(database, "DB_PATH", db_path)
    application = create_app({"TESTING": True, "SECRET_KEY": "test-key-only", "WTF_CSRF_ENABLED": True})
    yield application

@pytest.fixture
def client(app):
    return app.test_client()

def csrf(client, path="/register"):
    response = client.get(path)
    assert response.status_code == 200
    import re
    match = re.search(rb'name="csrf_token" value="([^"]+)"', response.data)
    assert match, "CSRF token missing from form"
    return match.group(1).decode()

def register(client, username, password="long-enough-password"):
    token = csrf(client)
    return client.post("/register", data={"username": username, "password": password, "csrf_token": token}, follow_redirects=True)

def login(client, username, password="long-enough-password"):
    token = csrf(client, "/login")
    return client.post("/login", data={"username": username, "password": password, "csrf_token": token}, follow_redirects=True)

def test_password_is_hashed(app, client):
    register(client, "alice")
    with database.connect() as db:
        row = db.execute("SELECT password_hash FROM users WHERE username = ?", ("alice",)).fetchone()
    assert row["password_hash"] != "long-enough-password"
    assert row["password_hash"].startswith("scrypt:") or row["password_hash"].startswith("pbkdf2:")

def test_user_cannot_read_another_users_note(app, client):
    register(client, "alice")
    login(client, "alice")
    token = csrf(client, "/notes")
    client.post("/notes", data={"title": "Alice private", "content": "secret", "csrf_token": token})
    with database.connect() as db:
        note_id = db.execute("SELECT id FROM notes").fetchone()["id"]
    client.post("/logout", data={"csrf_token": csrf(client, "/notes")})
    register(client, "bobby")
    login(client, "bobby")
    response = client.get(f"/note/{note_id}")
    assert response.status_code == 404

def test_csrf_rejects_post_without_token(app, client):
    response = client.post("/register", data={"username": "alice", "password": "long-enough-password"})
    assert response.status_code == 400

def test_search_treats_input_as_data(app, client):
    register(client, "alice")
    login(client, "alice")
    response = client.get("/notes?q=%27%20OR%201%3D1--")
    assert response.status_code == 200
