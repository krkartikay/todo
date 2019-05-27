import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import TodoApp from './TodoApp';
import './index.css';

ReactDOM.render(
    <div>
        <h1>To-Do's</h1>
        <TodoApp/>
        <hr/>
    </div>,
    document.getElementById('root'));

serviceWorker.register();
