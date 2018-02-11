import React, { Component } from "react";

class Mongokube extends Component {
  render() {
    return (
      <div>
        <h1>Mongo in Kubernetes with StatefulSets</h1>
        From conventionall point of view database can not be run in a container.
        Because containers are stateless and databases can not be stateless.
        However Kubernetes StatefulSet API object make that impossible happened.
        This post is based on
        <a href="https://medium.com/google-cloud/mongodb-replica-sets-with-kubernetes-d96606bd9474">
          {" "}
          this{" "}
        </a>
        and{" "}
        <a href="http://blog.kubernetes.io/2017/01/running-mongodb-on-kubernetes-with-statefulsets.html">
          {" "}
          this{" "}
        </a>
        blog posts. I just copy pasted from those posts.
        <h2>StorageClass</h2>
        The storage class tells Kubernetes what kind of storage to use for the
        database nodes. You can set up many different types of StorageClasses in
        a ton of different environments. For example, if you run Kubernetes in
        your own datacenter, you can use GlusterFS. On GCP, your storage choices
        are SSDs and hard disks. There are currently drivers for AWS, Azure,
        Google Cloud, GlusterFS, OpenStack Cinder, vSphere, Ceph RBD, and
        Quobyte. The configuration for the StorageClass looks like
        <a href="https://github.com/thesandlord/mongo-k8s-sidecar/blob/master/example/StatefulSet/googlecloud_ssd.yaml">
          {" "}
          this
        </a>.
        <h2>Headless Service</h2>
        Now you have created the Storage Class, you need to make a Headless
        Service. These are just like normal Kubernetes Services, except they
        don’t do any load balancing for you. When combined with StatefulSets,
        they can give you unique DNS addresses that let you directly access the
        pods! This is perfect for creating MongoDB replica sets, because our app
        needs to connect to all of the MongoDB nodes individually. The
        configuration for the Headless Service looks like
        <a href="https://github.com/thesandlord/mongo-k8s-sidecar/blob/master/example/StatefulSet/mongo-statefulset.yaml">
          {" "}
          this
        </a>. You can tell this is a Headless Service because the clusterIP is
        set to “None.” Other than that, it looks exactly the same as any normal
        Kubernetes Service.
        <h2>StatefulSet</h2>
        The StatefulSet actually runs MongoDB and orchestrates everything
        together. StatefulSets differ from Kubernetes ReplicaSets (not to be
        confused with MongoDB replica sets!) in certain ways that makes them
        more suited for stateful applications. Unlike Kubernetes ReplicaSets,
        pods created under a StatefulSet have a few unique attributes. The name
        of the pod is not random, instead each pod gets an ordinal name.
        Combined with the Headless Service, this allows pods to have stable
        identification. In addition, pods are created one at a time instead of
        all at once, which can help when bootstrapping a stateful system. You
        can read more about StatefulSets in the documentation. Just like before,
        this “sidecar” container will configure the MongoDB replica set
        automatically. A “sidecar” is a helper container which helps the main
        container do its work. The configuration for the StatefulSet looks like
        <a href="https://github.com/thesandlord/mongo-k8s-sidecar/blob/master/example/StatefulSet/mongo-statefulset.yaml">
          {" "}
          this
        </a>
        It’s a little long, but fairly straightforward. The first second
        describes the StatefulSet object. Then, we move into the Metadata
        section, where you can specify labels and the number of replicas. Next
        comes the pod spec. The terminationGracePeriodSeconds is used to
        gracefully shutdown the pod when you scale down the number of replicas,
        which is important for databases! Then the configurations for the two
        containers is shown. The first one runs MongoDB with command line flags
        that configure the replica set name. It also mounts the persistent
        storage volume to /data/db, the location where MongoDB saves its data.
        The second container runs the sidecar. Finally, there is the
        volumeClaimTemplates. This is what talks to the StorageClass we created
        before to provision the volume. It will provision a 100 GB disk for each
        MongoDB replica.
        <h4>Steps are simple:</h4>
        <ol>
          <li> create the Cluster </li>
          <li>
            <code>
              git clone https://github.com/thesandlord/mongo-k8s-sidecar.git
              <br />cd ./mongo-k8s-sidecar/example/StatefulSet/ <br />
            </code>
          </li>
          <li>
            Create the Storage Class by{" "}
            <code>kubectl apply -f googlecloud_ssd.yaml</code>
          </li>
          <li>
            Deploying the Headless Service and StatefulSet by
            <code>kubectl apply -f mongo-statefulset.yaml</code>
          </li>
          <li>
            Wait for the MongoDB Replica Set to be fully deployed;{" "}
            <code>kubectl get statefulset</code>
          </li>
          <li>
            Initiating and Viewing the MongoDB replica set;{" "}
            <code>kubectl get pods</code>
          </li>
          <li>
            connect to the first Replica Set membe by{" "}
            <code>kubectl exec -ti mongo-0 mongo</code>
          </li>
          <li>
            Initiate the replica set with a default configuration by{" "}
            <code>rs.initiate()</code>
          </li>
          <li>
            Print the replica set configuration by <code>rs.conf()</code>
          </li>
          <li>
            scale up by{" "}
            <code>kubectl scale --replicas=5 statefulset mongo</code>
            and scale down by{" "}
            <code>kubectl scale --replicas=3 statefulset mongo</code>
          </li>
          <li>
            To connect Mongo in code: Each pod in a StatefulSet backed by a
            Headless Service will have a stable DNS name. The template follows
            this format: <code>pod-name.service-name</code> This means the DNS
            names for the MongoDB replica set are: mongo-0.mongo, mongo-1.mongo,
            mongo-2.mongo You can use these names directly in the connection
            string URI of your app. In this case, the connection string URI
            would be:
            <code>
              "mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo:27017/dbname_?"
            </code>
          </li>
            <li>Save some data in the Mongo
            <code><br />rs0:PRIMARY> show dbs
            <br />admin   0.000GB
            <br />config  0.000GB
            <br />local   0.000GB
            <br />rs0:PRIMARY> use testdb
            <br />switched to db testdb
            <br />rs0:PRIMARY> db.sometable.insert({'{'}somefield:"somedata"{'}'})
            <br />WriteResult({'{'} "nInserted" : 1 {'}'})
            <br />rs0:PRIMARY> db.sometable.find()
            <br />{'{'} "_id" : ObjectId("5a7b71802a636a07aefe2132"), "somefield" : "somedata" {'}'}<br />
          </code>
          </li>
        </ol>
      </div>
    );
  }
}

export default Mongokube;
