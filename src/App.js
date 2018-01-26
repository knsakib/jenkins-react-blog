import React, { Component } from 'react';

import './App.css';
import Dockercheat from './Dockercheat';
import Linuxcheat from './Linuxcheat';
import Gitcheat from './Gitcheat';

import { Route, Link, Switch} from 'react-router-dom';



class App extends Component {

  render() {
    return (

          <div>

                <nav className="navbar navbar-inverse">


                    <div className="navbar-header">

                      <a href='/' className="navbar-brand"><b>Sakib's Blog</b></a>

                    </div>


                </nav>

				<div className="container-fluid" >

					<div className="jumbotron">

							<div class="row">

									<div class="col-sm-4">

										 <Link to="/dockercheatsheet"><span className="btn"></span><h2>Docker Cheatsheet</h2></Link>
										 <Link to="/linuxcheatsheet"><span className="btn"></span><h2>Linux Cheatsheet</h2></Link>
										 <Link to="/gitcheatsheet"><span className="btn"></span><h2>GIT Cheatsheet</h2></Link>

									</div>

								<div class="col-sm-8">
									<Switch>

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
