import React, { Component } from 'react';

// import './App.css';
// import { Route, BrowserRouter, Link, Switch} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import Home from './home/Home';


class App extends Component {
  render() {
    return (
      
          <div>

                <nav className="navbar navbar-inverse">
                  <div className="container-fluid">

                    <div className="navbar-header">

                      <a href='/' className="navbar-brand"><b>Knsakib Blog</b></a>

                    </div>

                  </div>
                </nav>

              <Home />

          </div>

    );
  }
}

export default App;
