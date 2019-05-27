import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import TodoApp from './TodoApp';
import './index.css';

// let's use redux now
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// it's usual to define initial state in some other file 
const initialState = {
    todos: [
                {
                    "todoid": 1,
                    "title": "gotta go fast",
                    "timestamp": 1558940416.3939812,
                    "action": "ADD"
                },
            ]
};

// in redux terminology reducer is just a function (by chance we have named our function reducer but any name will do)
// reducer is also generally implemented in a seprate file but we have defined it here
// reducer expects old state and an action
function reducer(state = initialState, action) {
    switch(action.type) {
    
        case "ADD" : {
            let arr = [...state.todos];
            arr.push(action);
            console.log(arr);
            return {
                todos: arr
            };
        }

        default : {
            return state;
        }
    }
}


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h1>To-Do's</h1>
            <TodoApp/>
            <hr/>
        </div>
    </Provider>,
    document.getElementById('root'));

serviceWorker.register();
