import React, { Component } from 'react';

import './App.css';
import Dockercheat from './Dockercheat';
import Linuxcheat from './Linuxcheat';
import Gitcheat from './Gitcheat';
import Howjenkinsreactblog from './Howjenkinsreactblog';


import { Route, Link, Switch} from 'react-router-dom';



class App extends Component {

  render() {
    return (

          <div>

                <nav className="navbar navbar-inverse">


                    <div className="navbar-header">


                      <Link to="/" className="navbar-brand"><b>Sakib's Blog</b></Link>

                    </div>


                </nav>

				<div className="container-fluid" >

					<div className="jumbotron">

							<div class="row">

									<div class="col-sm-4">

										<p> <Link to="/dockercheatsheet" className="btn btn-default btn-lg">Docker Cheatsheet</Link> </p>
                    <p> <Link to="/linuxcheatsheet" className="btn btn-default btn-lg">Linux Cheatsheet</Link> </p>
                    <p> <Link to="/gitcheatsheet" className="btn btn-default btn-lg">GIT Cheatsheet</Link> </p>

									</div>

								<div class="col-sm-8">
									<Switch>

                    <Route path='/' exact component={Howjenkinsreactblog} />
                    <Route path='/dockercheatsheet' component={Dockercheat} />
										<Route path='/linuxcheatsheet' component={Linuxcheat} />
										<Route path='/gitcheatsheet' component={Gitcheat} />

									</Switch>
								</div>

							</div>

					</div>

              	</div>

          </div>


    );
  }
}

export default App;
