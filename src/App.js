import React, { Component } from 'react';

import './App.css';
import Dockercheat from './Dockercheat';
import Linuxcheat from './Linuxcheat';
import Gitcheat from './Gitcheat';
import Howjenkinsreactblog from './Howjenkinsreactblog';
import Howtoorchestrat from './Howtoorchestrat';
import Gcpnetworking from './Gcpnetworking';
import Performance from './Performance';
import Deployappengine from './Deployappengine';
import Mongokube from './Mongokube';
import Network from './Network'
import Puppetingooglecloud from './Puppetingooglecloud'








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
                    <p> <Link to="/gcpnetworking" className="btn btn-default btn-lg">Google Cloud<br /> Networking</Link> </p>
                    <p> <Link to="/performance" className="btn btn-default btn-lg">Simple Performance Testing<br /> in Google Cloud</Link> </p>
                    <p> <Link to="/deployappengine" className="btn btn-default btn-lg">Deploy in App Engine<br /> from Eclipse </Link> </p>
                    <p> <Link to="/mongokube" className="btn btn-default btn-lg">Mongo in Kubernetes<br /> with StatefulSets </Link> </p>
                    <p> <Link to="/network" className="btn btn-default btn-lg">Networks<br /> in Google Cloud </Link> </p>
                    <p> <Link to="/puppet" className="btn btn-default btn-lg">Puppet in<br /> Google Cloud </Link> </p>


									</div>

								<div class="col-sm-8">
									<Switch>

                    <Route path='/how-to-orchestrat-kube' component={Howtoorchestrat} />
                    <Route path='/' exact component={Howjenkinsreactblog} />

                    <Route path='/dockercheatsheet' component={Dockercheat} />
										<Route path='/linuxcheatsheet' component={Linuxcheat} />
										<Route path='/gitcheatsheet' component={Gitcheat} />
                    <Route path='/gcpnetworking' component={Gcpnetworking} />
                    <Route path='/performance' component={Performance} />
                    <Route path='/deployappengine' component={Deployappengine} />
                    <Route path='/mongokube' component={Mongokube} />

                    <Route path='/network' component={Network} />
                    <Route path='/puppet' component={Puppetingooglecloud} />









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
