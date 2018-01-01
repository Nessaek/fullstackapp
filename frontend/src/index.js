import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store';
import {Provider} from 'mobx-react';

ReactDOM.render(<Provider store = {Store}><App/></Provider>, document.getElementById('root'));
