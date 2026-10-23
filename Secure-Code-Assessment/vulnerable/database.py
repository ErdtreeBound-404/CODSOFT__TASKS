import sqlite3
from pathlib import Path
DB_PATH = Path(__file__).with_name("notes.db")
def connect():
    conn = sqlite3.connect(DB_PATH); conn.row_factory = sqlite3.Row; return conn
def init_db():
    with connect() as db:
        db.executescript("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT); CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, content TEXT);")
