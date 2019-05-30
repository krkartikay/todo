import time
import sqlite3
from flask import *

app = Flask(__name__)

DATABASE = 'todos.db'

# format:
# CREATE TABLE "todos" (
# 	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
# 	"title"	TEXT NOT NULL,
# 	"finished"	INTEGER NOT NULL,
# 	"timestamp"	INTEGER
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


# use like: user = query_db('select * from users \
#                  where username = ?', [the_username], one=True)
###############################################################

@app.route("/")
def home():
    return render_template("frontend.html")

@app.route("/allTodos")
def allTodos():
    data = query_db("select * from todos")
    resp = [dict(x) for x in data]
    return jsonify(resp)


@app.route("/addTodo", methods=["POST"])
def addTodo():
    title = request.json['title']
    finished = request.json.get('finished', 0)
    timestamp = time.time()
    next_id = query_db("select max(id) from todos", one=True)[0]
    next_id = 1 if next_id is None else next_id+1
    query_db("insert into todos values (?,?,?,?)",
                [next_id, title, finished, timestamp])
    return jsonify({"success": True, "todoid": next_id})

@app.route("/toggleFinished", methods=["POST"])
def toggleFinished():
    todoid = request.json['todoid']
    cur_fin = query_db("select finished from todos where id=?", [todoid], one=True)[0]
    query_db("update todos set finished=? where id=?", [not cur_fin, todoid])
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)
