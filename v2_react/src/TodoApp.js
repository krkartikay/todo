import React from 'react';
import './TodoApp.css';

class App extends React.Component() {
    constructor(props) {
        super(props);
        this.state = {todos:[]};
    }
    render() {
        return (
        <div>
            <list/>
        </div>
        );
    }
}

function list(props) {
    return (
        <div>
        </div>
    );
}



export default App;
