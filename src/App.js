import React, { Component } from 'react';

import './App.css';

import Home from './Home';


class App extends Component {

  render() {
    return (

          <div>

                <nav className="navbar navbar-inverse">
                  <div className="container-fluid">

                    <div className="navbar-header">

                      <a href='/' className="navbar-brand"><b>Sakib's Blog</b></a>

                    </div>

                  </div>
                </nav>

              <Home />

          </div>

    );
  }
}

export default App;
