import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
