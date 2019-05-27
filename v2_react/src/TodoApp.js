import React from 'react';
import './TodoApp.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    "todoid": 5,
                    "title": "gotta go fast",
                    "timestamp": 1558940416.3939812
                },
            ]
        };
    }
    render() {
        return (
            <>
                <ul>
                {this.state.todos.map((todoData) => <TodoItem data={todoData} />)}
                </ul>
                <input 
                    id="task"
                    placeholder="Enter task"
                    style={{display:"inline-block"}}></input>
                <button onClick={this.handleclick}>+</button>
            </>
        );
    }

    handleclick() {
        // handle clicking of + button
    }
}

function TodoItem(props) {
    return (
        <li>
            {props.data.title}
        </li>
    );
}



export default App;
