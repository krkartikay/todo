import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import TodoApp from './TodoApp';
import './index.css';

ReactDOM.render(<TodoApp />, document.getElementById('root'));

serviceWorker.register();
