import time
import sqlite3
from flask import *

app = Flask(__name__)
app.secret_key = "secret!"

DATABASE = 'todos.db'

# CREATE TABLE "todos" (
#	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
#	"title"	TEXT NOT NULL,
#	"body"	TEXT,
#	"timestamp"	INTEGER
# )

##############################################################
# from flask docs

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def query_db(query, args=(), one=False):
    if query.lower().startswith("select"):
        cur = get_db().execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv
    else:
        con = get_db()
        con.cursor().execute(query, args)
        con.commit()


# use like: user = query_db('select * from users where username = ?', [the_username], one=True)
###############################################################

@app.route("/addTodo", methods=["POST"])
def add_todo():
    if not request.json:
        return jsonify({"success": False, "error": "No json data found!"})
    try:
        title = request.json['title']
        body = request.json.get('body', '')
        timestamp = time.time()
        next_id = query_db("select max(id) from todos", one=True)[0]
        next_id = 1 if next_id is None else next_id+1
        query_db("insert into todos values (?,?,?,?)", [next_id, title, body, timestamp])
        return jsonify({"success": True, "todoId": next_id})
    except KeyError:
        return jsonify({"success": False, "error": "Required arguments not specified!"})

@app.route("/delTodo", methods=["POST"])
def del_todo():
    if not request.json:
        return jsonify({"success": False, "error": "No json data found!"})
    try:
        todo_id = request.json['todoId']
        query_db("delete from todos where id=?", [todo_id])
        return jsonify({"success": True})
    except KeyError:
        return jsonify({"success": False, "error": "Required arguments not specified!"})

    return jsonify({"success": True})

@app.route("/")
@app.route("/allTodos")
def all_todos():
    data = query_db("select * from todos")
    resp = [dict(x) for x in data]
    return jsonify(resp)

if __name__ == "__main__":
    app.run(debug=True)
