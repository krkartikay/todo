function Root() {
    return (
        <div id="main">
            <h1>Todo App</h1>
            <TodoApp />
        </div>
    );
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "todos": [] };
    };
    render(){
        return (
            <div>
                <ul id="todo-list">
                    {this.state.todos.map(
                        todo => <TodoItem data={todo} onChange={() => this.change(todo.todo_id)}/>
                    )}
                </ul>
                <TodoInput addTodo={this.addTodo} />
            </div>
        );
    }
    change = (id) => {
        var newtodos = [...this.state.todos];
        console.log(newtodos);
        newtodos[id-1].finished = ! newtodos[id-1].finished;
        this.setState({ "todos": newtodos });
    }
    addTodo = (text) => {
        var newItem = {
            "todo_id": this.state.todos.length + 1,
            "title": text,
            "timestamp": new Date().getTime() / 1e3,
            "finished": false,
        };
        var newlist = [...this.state.todos, newItem];
        this.setState({ "todos": newlist });
    }
}

function TodoItem(props) {
    return (
        <li>
            <div className="todo">
                <span
                    className="todo-title"
                    style={ { "textDecoration": props.data.finished ? "line-through" : "" } }>
                    {props.data.title}
                </span>
                <input type="checkbox" className="todo-check"
                        checked={props.data.finished} onChange={props.onChange} />
                <small>Added on: {new Date(props.data.timestamp * 1e3).toLocaleString()} </small>
            </div>
        </li>
    );
}


class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "text": "" };
    }
    render() {
        return (
            <div>
                <input type="text" id="new_todo" style={ {"display":"inline-block"} }
                    onChange={this.handleChange} value={this.state.text}/>
                <button onClick={this.buttonPressed}>+</button>
            </div>
        );
    }
    handleChange = (evt) => {
        // console.log(evt.target.value);
        this.setState({ "text": evt.target.value });
    }
    buttonPressed = () => {
        this.props.addTodo(this.state.text);
        this.setState({"text": ""});
    }
}

window.onload = function () {
    var body = document.body;
    ReactDOM.render(<Root />, body);
}