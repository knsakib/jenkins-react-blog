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
        packaged inside of a single pod. Pods also have Volumes. Volumes are data disks that
        live as long as the pods live, and can be used by the containers in that pod. Pods provide
        a shared namespace for their contents which means that the two containers inside of
        our example pod can communicate with each other, and they also share the attached volumes.
        Pods also share a network namespace. This means that there is one IP Address per pod.
        Now let's take a deeper dive into pods.



        <h3>Creating Pods</h3>

Pods can be created using pod configuration files. Let's take a moment to explore the monolith pod configuration file. Run to following:

cat pods/monolith.yaml
The output shows the <a href="https://github.com/googlecodelabs/orchestrate-with-kubernetes/blob/master/kubernetes/pods/monolith.yaml">open configuration file.</a>

There's a few things to notice here. You'll see that:

our pod is made up of one container (the monolith).
we're passing a few arguments to our container when it starts up.
we're opening up port 80 for http traffic.
Create the monolith pod using kubectl:

<code><br />kubectl create -f pods/monolith.yaml<br /></code>
Let's examine our pods. Use the kubectl get pods command to list all pods running in the default namespace.

<code><br />kubectl get pods<br /></code>
It may take a few seconds before the monolith pod is up and running. The monolith container image needs to be pulled from the Docker Hub before we can run it.
Once the pod is running, use the kubectl describe command to get more information about the monolith pod.

<code><br />kubectl describe pods monolith<br /></code>
You'll see a lot of the information about the monolith pod including the Pod IP address and the event log. This information will come in handy when troubleshooting.

Kubernetes makes it easy to create pods by describing them in configuration files and view information about them
when they are running. At this point you have the ability create all the pods your deployment requires!


<h3>Interacting with Pods</h3>

Pods are allocated a private IP address by default and cannot be reached outside of the cluster.
Use the kubectl port-forward command to map a local port to a port inside the monolith pod.

From this point on the lab will ask you to work in multiple cloud shell tabs. Any commands that are executed in a second or third command shell will be denoted in the command's instructions.
Open two Cloud Shell terminals. One to run the kubectl port-forward command, and the other to issue curl commands.

In the 2nd terminal, run this command to set up port-forwarding:

<code><br />kubectl port-forward monolith 10080:80</code><br />
Now in the 1st terminal we can start talking to our pod using curl:

<code><br />curl http://127.0.0.1:10080</code><br />

Yes! We got a very friendly "hello" back from our container. Now use the curl command to see what happens when we hit a secure endpoint:

<code><br />curl http://127.0.0.1:10080/secure</code><br />
Uh oh. Let's try logging in to get an auth token back from our Monolith:

<code><br />curl -u user http://127.0.0.1:10080/login</code><br />
At the login prompt, use the super-secret password "password" to login.

Logging in caused a JWT token to print out

<code><br />TOKEN=$(curl http://127.0.0.1:10080/login -u user|jq -r '.token')
</code><br />Copy the token and use it to hit our secure endpoint with curl:

<code><br />curl -H "Authorization: Bearer $TOKEN" http://127.0.0.1:10080/secure</code><br />
Note: Cloud shell doesn't handle copying long strings well, so we copied the token into an environment variable for use in the previous step.
At this point we should get a response back from our application, letting us know everything is right in the world again.

Use the kubectl logs command to view the logs for the monolith Pod.

<code><br />kubectl logs monolith</code><br />
Open a 3rd terminal and use the -f flag to get a stream of the logs happening in real-time:

<code><br />kubectl logs -f monolith</code><br />
Now if you use curl to interact with the monolith, you can see the logs updating (in terminal 3):

<code><br />curl http://127.0.0.1:10080</code><br />
Use the kubectl exec command to run an interactive shell inside the Monolith Pod. This can come in handy when you want to troubleshoot from within a container:

<code><br />kubectl exec monolith --stdin --tty -c monolith /bin/sh</code><br />
For example, once we have a shell into the monolith container we can test external connectivity using the ping command:

<code><br /># ping -c 3 google.com</code><br />
Be sure to log out when you're done with this interactive shell.

<code><br /># exit<br /></code>
As you can see, interacting with pods is as easy as using the kubectl command.
If you need to hit a container remotely or get a login shell, Kubernetes provides everything you need to get up and going.

<h3>Services</h3>

Pods aren't meant to be persistent. They can be stopped or started for many reasons - like failed liveness or readiness
checks - and this leads to a problem:

What happens if we want to communicate with a set of Pods? When they get restarted they might
have a different IP address. That's where Services come in. Services provide stable endpoints for Pods.

Services use labels to determine what Pods they operate on. If Pods have the correct labels, they are automatically picked up and exposed by our services.

The level of access a service provides to a set of pods depends on the Service's type. Currently there are three types:

<li>ClusterIP (internal) -- the default type means that this Service is only visible inside of the cluster,</li>
<li>NodePort gives each node in the cluster an externally accessible IP and</li>
<li>LoadBalancer adds a load balancer from the cloud provider which forwards traffic from the service to Nodes within it.</li>

Two things are importan to understnad
<li>Create a service</li>
<li>Use label selectors to expose a limited set of Pods externally</li>

<h3>Creating a Service</h3>

Before we can create our services -- let's first create a secure pod that can handle https traffic

If you've changed directories, make sure you return to the <code>~/orchestrate-with-kubernetes/kubernetes</code> directory:

<code><br />cd ~/orchestrate-with-kubernetes/kubernetes<br /></code>
Explore the monolith service configuration file:

<code><br />cat pods/secure-monolith.yaml<br /></code>
Create the secure-monolith pods and their configuration data:

<code><br />kubectl create secret generic tls-certs --from-file tls/
<br />kubectl create configmap nginx-proxy-conf --from-file nginx/proxy.conf
<br />kubectl create -f pods/secure-monolith.yaml<br /></code>
Now that we have a secure pod, it's time to expose the secure-monolith Pod externally.To do that we'll create a Kubernetes service.

Explore the monolith service configuration file:

<code><br />cat services/
  <a href="https://github.com/googlecodelabs/orchestrate-with-kubernetes/blob/master/kubernetes/services/monolith.yaml">
    monolith.yaml</a><br /></code>
    Things to note:
    <li>There's a selector which is used to automatically find and expose any pods with the labels "app=monolith" and "secure=enabled"</li>
    <li>Now you have to expose the nodeport here because this is how we'll forward external traffic from port
      31000 to nginx (on port 443).</li>
    Use the kubectl create command to create the monolith service from the monolith service configuration file:

    <code><br />kubectl create -f services/monolith.yaml<br /></code>
    You have exposed your service on an external port on all nodes in your cluster. If you want to expose this service to the external internet, you may need to set up firewall rules for the service port(s) (tcp:31000) to serve traffic.

    See http://releases.k8s.io/release-1.2/docs/user-guide/services-firewalls.md for more details.

    service "monolith" created

    This output is saying you're using a port to expose the service. This means that it's possible to have port collisions if another app tries to bind to port 31000 on one of your servers. Normally, Kubernetes would handle this port assignment. In this lab you chose a port so that it's easier to configure health checks later on.

    Use the gcloud compute firewall-rules command to allow traffic to the monolith service on the exposed nodeport:

    <code><br />gcloud compute firewall-rules create allow-monolith-nodeport \<br />
      --allow=tcp:31000<br /></code>
    Now that everything is setup you should be able to hit the secure-monolith service from outside the cluster without using port forwarding.

    First, get an IP address for one of the nodes, then try hitting the secure-monolith service using curl:

    <code><br />gcloud compute instances list<br />
    curl -k https://{"<"}EXTERNAL_IP{">"}:31000<br /></code>
    Uh oh! That timed out. What's going wrong?

    It's time for a quick knowledge check.Use the following commands to answer the questions below.

    kubectl get services monolithkubectl describe services monolith

    <h3>Questions:</h3>

    <li>Why are you unable to get a response from the monolith service?</li>
    <li>How many endpoints does the monolith service have?</li>
    <li>What labels must a Pod have to be picked up by the monolith service?</li>

      <h3>Adding Labels to Pods</h3>

    Currently the monolith service does not have endpoints. One way to troubleshoot an issue like this is to use the kubectl get pods command with a label query.

    We can see that we have quite a few pods running with the monolith label.

    <code><br />kubectl get pods -l "app=monolith"<br /></code>
    But what about "app=monolith" and "secure=enabled"?

    <code><br />kubectl get pods -l "app=monolith,secure=enabled"<br /></code>
    Notice this label query does not print any results. It seems like we need to add the "secure=enabled" label to them.

    Use the kubectl label command to add the missing secure=enabled label to the secure-monolith Pod. Afterwards, we can check and see that our labels have been updated.

    <code><br />kubectl label pods secure-monolith 'secure=enabled'
    <br />kubectl get pods secure-monolith --show-labels<br /></code>
    Now that our pods are correctly labeled, let's view the list of endpoints on the monolith service:

    <code><br />kubectl describe services monolith | grep Endpoints<br /></code>
    And we have one!

    Let's test this out by hitting one of our nodes again.

    <code><br />gcloud compute instances list
    <br />curl -k https://{"<"}EXTERNAL_IP{">"}:31000<br /></code>
    Bam! Houston, we have contact.

    <h3>Deploying Applications with Kubernetes</h3>

The goal is to get you ready for scaling and managing containers in production. That's where Deployments come in.
Deployments are a declarative way to ensure that the number of Pods running is equal to the desired number of Pods,
specified by the user.

<br />The main benefit of Deployments is in abstracting away the low level details of managing Pods.
Behind the scenes Deployments use Replica Sets to manage starting and stopping the Pods.
If Pods need to be updated or scaled, the Deployment will handle that.
Deployment also handles restarting Pods if they happen to go down for some reason. Let's look at a quick example:



<br />Pods are tied to the lifetime of the Node they are created on. In the example above, Node3 went down (taking a Pod with it). Insteading of manually creating a new Pod and finding a Node for it, your Deployment created a new Pod and started it on Node2. That's pretty cool!

<br />It's time to combine everything you learned about Pods and Services to break up the monolith application into smaller Services using Deployments.


  <h3>Creating Deployments</h3>

  We're going to break the monolith app into three separate pieces:

  <li>auth - Generates JWT tokens for authenticated users.</li>
  <li>hello - Greet authenticated users.</li>
  <li>frontend - Routes traffic to the auth and hello services.</li>
  We are ready to create deployments, one for each service. Afterwards, we'll define internal services for the auth and hello deployments and an external service for the frontend deployment. Once finished you'll be able to interact with the microservices just like with Monolith only now each piece will be able to be scaled and deployed, independently!

  Get started by examining the auth deployment configuration file.

  <code><br />cat deployments/
  <a href="https://github.com/googlecodelabs/orchestrate-with-kubernetes/blob/master/kubernetes/deployments/auth.yaml">
    auth.yaml </a><br /></code>

  <br />The deployment is creating 1 replica, and we're using version 1.0.0 of the auth container.

  <br />TWhen you run the kubectl create command to create the auth deployment it will make one pod that conforms to the data in the Deployment manifest. This means you can scale the number of Pods by changing the number specified in the Replicas field. Anyway, let's go ahead and create our deployment object:

  <code><br />kubectl create -f deployments/auth.yaml<br /></code>
  It's time to create a service for your auth deployment. Use the kubectl create command to create the auth service:

  <code><br />kubectl create -f services/auth.yaml<br /></code>
  Now do the same thing to create and expose the hello Deployment

  <code><br />kubectl create -f deployments/hello.yaml
  <br />kubectl create -f services/hello.yaml<br /></code>
  And one more time to create and expose the frontend Deployment.

  <code><br />kubectl create configmap nginx-frontend-conf --from-file=nginx/frontend.conf
  <br />kubectl create -f deployments/frontend.yaml
  <br />kubectl create -f services/frontend.yaml<br /></code>
  There is one more step to creating the frontend because we needed to store some configuration data with the container.
  Interact with the frontend by grabbing it's External IP and then curling to it:

  <code><br />kubectl get services frontend
  <br />curl -k https://{"<"}EXTERNAL_IP{">"}:31000<br /></code>
  And you get a hello response back!



      </div>


    );
  }
}

export default Howtoorchestrat;
