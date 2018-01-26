import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(<App />, document.getElementById('root'));
import {BrowserRouter} from 'react-router-dom';


ReactDOM.hydrate(
<BrowserRouter>
  <App />
</BrowserRouter>,
document.getElementById('root')
);
//registerServiceWorker();
