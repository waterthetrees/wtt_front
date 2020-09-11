import React from 'react';
import ReactDOM from 'react-dom';
// import './style.css';
import { BrowserRouter, HashRouter} from 'react-router-dom';

import App from './components/app.js';
// import registerServiceWorker from './registerServiceWorker';
// import store from './store/store';

console.log('test')
const app = (
 <BrowserRouter>
   <App />
 </BrowserRouter>
)

ReactDOM.render( app, document.querySelector('.root'));
// registerServiceWorker();



