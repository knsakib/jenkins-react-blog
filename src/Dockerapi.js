import React, { Component } from "react";


class Dockerapi extends Component {
  render(){
    return(
      <div>
        <h1>Using Dcoker and Kubernetes API</h1>
        <h2>Python SDK</h2>
        <ol>
          <li> Build and run the docker image in the localhost. Mine is running in http://localhost:3001</li>
          <li> <a href="https://docs.docker.com/develop/sdk/#python-sdk">pip install docker</a> </li>
          <li> Sample Python <a href="https://github.com/knsakib/hello-world-docker-python-sdk">app</a> to call docker api and show the info in a Flask Template </li>
          <li>Visit http://localhost:7000</li>

        </ol>

        <h2>NodeJs Library</h2>
        <ol>
          <li>Build and run the docker image in the localhost. Mine is running in http://localhost:3001</li>
          <li>Make a seperate Node app and Intall <a href="">Harbor Master : <code>npm install --save harbor-master</code></a></li>
          <li>Here is the sample <a href="https://github.com/knsakib/docker-nodejs-client">code</a> with calling docker client
            and show the info the browser.</li>
          <li>Visit http://localhost:4000</li>
        </ol>

        <h2>Kubernetes API</h2>
        <ol>
          <li>First two cases we ran docker as barebone deamon. Here we will run docker image on Kubernetes
          </li>
            <li>Intall docker(if not installed), Intall Virtual Box</li>

              <li>install kubectl; Using the Google Cloud SDK: <code>gcloud components install kubectl</code>
                  <br/> Or, Using Homebrew package manager: <code>brew install kubectl</code></li>


                <li>install minikube. For MAC: <code>brew cask install minikube</code> and start by
                  <code>minikube start</code></li>
                <li>For this blog to run on Minikube in my local machine, I ran
                  <code>
                    <br/>kubectl config use-context minikube
                    <br/>eval $(minikube docker-env)
                    <br/>docker build -t jenkins-react-blog .
                    <br/>kubectl run jenkins-react-blog --image=jenkins-react-blog --image-pull-policy=Never --port=3001
                    <br/>kubectl expose deployment jenkins-react-blog --type=LoadBalancer
                    <br/>minikube service jenkins-react-blog<br/>
                  </code>

                </li>
                <li>
                  The easiest way to access Kubernetes API is to configure a proxy. The command is
                  <code>kubectl proxy --port=8000</code><br/>
                  Visit http://localhost:8000/swagger-ui/ from the browser to access Swagger APIs

                </li>
                <li>
                  However, I would like to use <a href="https://github.com/kubernetes-client/python">Kubernetes Python Client</a>.
                  I installed by <code>pip install kubernetes</code>
                </li>
                <li>Here is the sample <a>code</a></li>
                <li>There are command lines to call Kubernetes API and a Flask template generated UI to show my image
                info in the browser about the images running on Minikube Kubernetes Cluster</li>
              <li>Visit localhost with correct port</li>
              <li> A good <a href="https://www.linux.com/learn/kubernetes/enjoy-kubernetes-python">post</a> about using Python client and
              Here is a <a href="https://blog.kumina.nl/2017/10/how-to-develop-kubernetes-friendly-containerised-applications-part-1/">post</a> about developing kubernetes friendly containerized application</li>

        </ol>

      </div>


    );
  }
}

export default Dockerapi;
