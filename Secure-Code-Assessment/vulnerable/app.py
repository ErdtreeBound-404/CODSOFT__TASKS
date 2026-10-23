"""INTENTIONALLY VULNERABLE classroom baseline. Never deploy or expose to a network."""
from flask import Flask, request, redirect, session, render_template_string
from database import connect, init_db
app = Flask(__name__)
app.secret_key = "secret123"  # VULNERABILITY: hardcoded secret
init_db()
PAGE = """<!doctype html><title>Vulnerable Student Notes</title><h1>Vulnerable Student Notes</h1><p>{{ message }}</p><h2>Register / Login</h2><form method="post" action="/register"><input name="username" placeholder="username"><input name="password" placeholder="password"><button>Register</button></form><form method="post" action="/login"><input name="username"><input name="password"><button>Login</button></form><h2>Add note</h2><form method="post" action="/notes"><input name="title"><textarea name="content"></textarea><button>Add</button></form><form><input name="q" placeholder="search"><button>Search</button></form>{% for n in notes %}<p><a href="/note/{{n['id']}}">{{n['title']}}</a>: {{n['content']}}</p>{% endfor %}"""
@app.route('/')
def index():
    with connect() as db: notes=db.execute('SELECT * FROM notes').fetchall()
    return render_template_string(PAGE, notes=notes, message='Demo only')
@app.route('/register', methods=['POST'])
def register():
    with connect() as db:
        db.execute('INSERT OR REPLACE INTO users(username,password) VALUES (?,?)',(request.form.get('username'),request.form.get('password'))) # VULNERABILITY: plaintext password
    return redirect('/')
@app.route('/login', methods=['POST'])
def login():
    with connect() as db: user=db.execute('SELECT * FROM users WHERE username=? AND password=?',(request.form.get('username'),request.form.get('password'))).fetchone()
    if user: session['user_id']=user['id']
    return redirect('/')
@app.route('/notes', methods=['POST'])
def add_note():
    if 'user_id' not in session: return redirect('/')
    with connect() as db: db.execute('INSERT INTO notes(user_id,title,content) VALUES (?,?,?)',(session['user_id'],request.form.get('title'),request.form.get('content')))
    return redirect('/')
@app.route('/note/<int:note_id>')
def note(note_id):
    with connect() as db: row=db.execute(f'SELECT * FROM notes WHERE id = {note_id}').fetchone() # VULNERABILITY: no ownership check; interpolation pattern
    return (dict(row).__repr__() if row else 'Not found')
@app.route('/search')
def search():
    q=request.args.get('q','')
    with connect() as db: rows=db.execute(f"SELECT * FROM notes WHERE title LIKE '%{q}%' ").fetchall() # VULNERABILITY: SQL injection
    return repr([dict(r) for r in rows])
if __name__ == '__main__': app.run(host='127.0.0.1', port=5001, debug=False)
