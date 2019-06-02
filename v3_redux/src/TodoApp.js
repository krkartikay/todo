import React from 'react';
import './TodoApp.css';
import { connect } from 'react-redux'; // to connect a component to redux store


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // state will be moved to redux store

        // this.state = {
        //     todos: [
        //         {
        //             "todoid": 5,
        //             "title": "gotta go fast",
        //             "timestamp": 1558940416.3939812
        //         },
        //     ]
        // };

    }
    render() {
        return (
            <>
                <ul>
                {/* well react supports multiline js comments
                    we will be using redux store instead of state and the data for this component will be provided as a prop 
                    this.state.todos.map((todoData) => <TodoItem data={todoData} />)
                */}

                    {this.props.todos.map((todoData) => <TodoItem data={todoData} />)}

                </ul>
                <input 
                    id="task"
                    placeholder="Enter task"
                    style={{display:"inline-block"}}
                    ref={input => this._name = input}></input>
                <button onClick={this.handleClick}>+</button>
            </>
        );
    }

    handleClick(e) {
        // handle clicking of + button
        //e.preventDefaults();
        let text = this._name.value;
        console.log(text);
        let len = this.props.todos.length+1;
        console.log(len,this.props.todos);
        let newObj = {
            type: "ADD",
            title: text,
            timestamp: Date.now(),
            todoid: len
        };

        // lucky for us that as props we have also been provided a dispatch method
        // this will pass desire object as action to the reducer
        this.props.dispatch(newObj);

    }
}

function TodoItem(props) {
    return (
        <li>
            {props.data.title}
        </li>
    );
}

// this function is expected by connect (though optional)
// this function recieves state from inside the store
// function will return an object where keys will corrospond to props to pass to connected component
function mapStateToProps(state) {
    return {
        todos : state.todos
    };

}


// export default App;
export default connect(mapStateToProps)(App);
// here connect is a higher order component
// in the end we export a connected App container

