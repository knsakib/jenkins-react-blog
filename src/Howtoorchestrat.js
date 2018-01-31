import React, { Component } from "react";

class Howtoorchestrat extends Component {
  componentWillMount = () => {};

  render() {
    return (
      <div>
        <h1>How to Orchestrat the Cloud with Kubernetes</h1>
        <h3>Clone the GitHub repository</h3>


            <code>
              git clone
              https://github.com/googlecodelabs/orchestrate-with-kubernetes.git
              <br />cd orchestrate-with-kubernetes/kubernetes<br />
            </code>

        <h3>Running Nginx deployment</h3>
        The easiest way to get started with Kubernetes is to use the kubectl run
        command. We will Use it to launch a single instance of the nginx
        container:
        <code><br />kubectl run nginx --image=nginx:1.10.0 <br /></code>
        Kubernetes has created a deployment. Deployments keep the pods up and
        running even when the nodes they run on fail. In Kubernetes, all
        containers run in a pod. Use the kubectl get pods command to view the
        running nginx container:
        <code><br />kubectl get pods<br /></code>
        Once the nginx container is running we can expose it outside of
        Kubernetes using the kubectl expose command:
        <code>
          <br />kubectl expose deployment nginx --port 80 --type LoadBalancer<br />
        </code>
        What happened is that behind the scenes Kubernetes created an external
        Load Balancer with a public IP address attached to it. Any client who
        hits that public IP address will be routed to the pods behind the
        service. In this case that would be the nginx pod. If we list our
        services now using the kubectl get services command...
        <code><br />kubectl get services<br /></code>
        It may take a few seconds before the ExternalIP field is populated for
        our service. This is normal -- just re-run the kubectl get services
        command every few seconds until the field populates. Use the External IP
        to hit the nginx container remotely using the curl http command.
        <code>
          <br />curl http://{"<"}External IP{">"}:80{" "} <br />
        </code>
        And there you go! Kubernetes supports an easy to use workflow out of the
        box using the kubectl run and expose commands. Now that you've seen a
        quick tour of kubernetes, it's time to dive into each of the components
        and abstractions.
        <h3>Pods</h3>
        At the core of Kubernetes is the Pod. Pods represent and hold a
        collection of one or more containers. Generally, if you have multiple
        containers with a hard dependency on each other, the containers would be
        packaged inside of a single pod.
      </div>
    );
  }
}

export default Howtoorchestrat;
