import React, { Component } from 'react';

import './App.css';
import { Route, BrowserRouter, Link, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './home/Home';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>

                <nav className="navbar navbar-inverse">
                  <div className="container-fluid">

                    <div className="navbar-header">
                      <Link to="/" className="navbar-brand"><b>knsakib Blog</b></Link>
                    </div>

                  </div>
                </nav>

              <Switch>
                <Route path='/' exact component={Home} />
                {
                  //<Route path='/blog/:uid' component={Blog} />
                }
              </Switch>

          </div>
      </BrowserRouter>
    );
  }
}

export default App;
