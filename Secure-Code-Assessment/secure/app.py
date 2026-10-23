import os
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, session, abort, flash
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash
from database import connect, init_db


def create_app(test_config=None):
    app = Flask(__name__)
    secret = os.environ.get("SECRET_KEY")
    if test_config and test_config.get("TESTING"):
        secret = test_config.get("SECRET_KEY", "test-only-key-not-for-production")
    if not secret:
        raise RuntimeError("SECRET_KEY environment variable is required. Set a long random value before starting.")
    app.config.update(SECRET_KEY=secret, SESSION_COOKIE_HTTPONLY=True,
                      SESSION_COOKIE_SAMESITE="Lax", SESSION_COOKIE_SECURE=False)
    if test_config:
        app.config.update(test_config)
    CSRFProtect(app)
    init_db()

    def login_required(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            if "user_id" not in session:
                return redirect(url_for("login"))
            return view(*args, **kwargs)
        return wrapped

    @app.route("/")
    def index():
        return redirect(url_for("notes") if "user_id" in session else url_for("login"))

    @app.route("/register", methods=["GET", "POST"])
    def register():
        if request.method == "POST":
            username = request.form.get("username", "").strip()
            password = request.form.get("password", "")
            if len(username) < 3 or len(username) > 40 or len(password) < 10:
                flash("Use a username of 3–40 characters and a password of at least 10 characters.")
                return render_template("register.html"), 400
            try:
                with connect() as db:
                    db.execute("INSERT INTO users(username, password_hash) VALUES (?, ?)",
                               (username, generate_password_hash(password)))
            except Exception:
                flash("Could not create account. Try a different username.")
                return render_template("register.html"), 400
            flash("Account created. Please log in.")
            return redirect(url_for("login"))
        return render_template("register.html")

    @app.route("/login", methods=["GET", "POST"])
    def login():
        if request.method == "POST":
            username = request.form.get("username", "").strip()
            password = request.form.get("password", "")
            with connect() as db:
                user = db.execute("SELECT id, password_hash FROM users WHERE username = ?", (username,)).fetchone()
            if user and check_password_hash(user["password_hash"], password):
                session.clear()
                session["user_id"] = user["id"]
                return redirect(url_for("notes"))
            flash("Invalid username or password.")
        return render_template("login.html")

    @app.route("/logout", methods=["POST"])
    @login_required
    def logout():
        session.clear()
        return redirect(url_for("login"))

    @app.route("/notes", methods=["GET", "POST"])
    @login_required
    def notes():
        if request.method == "POST":
            title = request.form.get("title", "").strip()
            content = request.form.get("content", "").strip()
            if not title or not content or len(title) > 120 or len(content) > 10000:
                flash("Title and content are required; title max 120 and content max 10,000 characters.")
            else:
                with connect() as db:
                    db.execute("INSERT INTO notes(user_id, title, content) VALUES (?, ?, ?)",
                               (session["user_id"], title, content))
                return redirect(url_for("notes"))
        q = request.args.get("q", "").strip()[:100]
        with connect() as db:
            if q:
                rows = db.execute("SELECT id, title, content FROM notes WHERE user_id = ? AND title LIKE ? ORDER BY id DESC",
                                  (session["user_id"], f"%{q}%")).fetchall()
            else:
                rows = db.execute("SELECT id, title, content FROM notes WHERE user_id = ? ORDER BY id DESC",
                                  (session["user_id"],)).fetchall()
        return render_template("notes.html", notes=rows, query=q)

    @app.route("/note/<int:note_id>")
    @login_required
    def note_detail(note_id):
        with connect() as db:
            note = db.execute("SELECT id, title, content FROM notes WHERE id = ? AND user_id = ?",
                              (note_id, session["user_id"])).fetchone()
        if not note:
            abort(404)
        return render_template("note.html", note=note)

    @app.route("/note/<int:note_id>/delete", methods=["POST"])
    @login_required
    def delete_note(note_id):
        with connect() as db:
            cursor = db.execute("DELETE FROM notes WHERE id = ? AND user_id = ?",
                                (note_id, session["user_id"]))
        if cursor.rowcount == 0:
            abort(404)
        flash("Note deleted.")
        return redirect(url_for("notes"))

    return app

if __name__ == "__main__":
    application = create_app()
    application.run(host="127.0.0.1", port=5000, debug=False)
