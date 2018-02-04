import React, { Component } from 'react';

import './App.css';
import Dockercheat from './Dockercheat';
import Linuxcheat from './Linuxcheat';
import Gitcheat from './Gitcheat';
import Howjenkinsreactblog from './Howjenkinsreactblog';
import Howtoorchestrat from './Howtoorchestrat';



import { Route, Link, Switch} from 'react-router-dom';



class App extends Component {

  render() {
    return (

          <div>

                <nav className="navbar navbar-inverse navbar-fixed-top">


                    <div className="navbar-header">


                      <Link to="/" className="navbar-brand"><span className="glyphicon glyphicon-home"></span><b> Sakib's Blog</b></Link>

                    </div>

                    <div className="navbar-right">


                      <a href="https://knsakib.github.io" className="navbar-brand">
                        <span className="glyphicon glyphicon-file">
                        </span> Resume
                      </a>

                      <a href="https://github.com/knsakib?tab=repositories" className="navbar-brand">
                        <span className="glyphicon glyphicon-list-alt">
                        </span> Github
                      </a>

                      <a href="https://www.linkedin.com/in/knsakib/" className="navbar-brand">
                        <span className="glyphicon glyphicon-paperclip">
                        </span> Linkedin
                      </a>

                    </div>


                </nav>

				<div className="container-fluid" >

					<div className="jumbotron">

							<div class="row">

									<div class="col-sm-4 sidecol">

                    <p> <Link to="/how-to-orchestrat-kube" className="btn btn-default btn-lg">How to Orchestra the <br />Cloud with Kubernetes</Link> </p>

                    <p> <Link to="/dockercheatsheet" className="btn btn-default btn-lg">Docker Cheatsheet</Link> </p>

                    <p> <Link to="/linuxcheatsheet" className="btn btn-default btn-lg">Linux Cheatsheet</Link> </p>
                    <p> <Link to="/gitcheatsheet" className="btn btn-default btn-lg">GIT Cheatsheet</Link> </p>

									</div>

								<div class="col-sm-8">
									<Switch>

                    <Route path='/how-to-orchestrat-kube' component={Howtoorchestrat} />
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
