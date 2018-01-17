import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import ReactDOMServer from 'react-dom/server';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

export function prerender() {
  return ReactDOMServer.renderToString(<App />)
}
