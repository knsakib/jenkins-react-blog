import React, { Component } from "react";


class Dockernodesdk extends Component {
  render(){
    return(
      <div>
        <h1>Hello World use of Docker SDK</h1>

        I wanted to use a docker sdk just for testing to how it can be used to interact with any Docker deamon.
        Using Pyton SDK:
        Here are the dead-simple steps:
        <ol>
          <li>Install Docker SDK by running <code>pip install docker</code></li>
            <li>Then I ran a Node.js Docker deamon in my local enviroment</li>
              <li>I used Flask to call the Docker API to get some information about my Docker Deamon and render to a template
              Flask can be installed simply by <code>sudo pip install Flask</code></li>

            <li>I used <a
              href="https://github.com/knsakib/hello-world-docker-python-sdk/blob/master/templates/template.html">
              template.html</a> under template for to render my code to html.</li>
            <li>And then
              <a href="https://github.com/knsakib/hello-world-docker-python-sdk/blob/master/docker-client.py">
                docket-client.py</a> to call the Python SDK and send the information to template.html</li>

              <li>just run python docker-client.py</li>
              <li>server will start at post 7000</li>

            <li>Go to localhost:7000 . It will give the list of the docker iamges</li>

        </ol>

      </div>
    );
  }
}

export default Dockernodesdk;
