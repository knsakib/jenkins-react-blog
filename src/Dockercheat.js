import React, { Component } from "react";

class Dockercheat extends Component {
  componentWillMount = () => {};

  render() {
    return (
      <div>
        <h1>Docker Cheatsheet</h1>

          I use Docker day to day. So I decided to make a cheatsheet on Docker.

        <h3>Stop, Eable and Start Docker</h3>
        <code>
          {" "}
          sudo systemctl stop docker, sudo systemctl enable docker, sudo
          systemctl start docker{" "}
        </code>
        <h3>List all the running containers</h3>
        <code>docker ps</code>
        <h3>Stop a container</h3>
        <code>docker stop CCONTAINER_NAME</code>
        <h3>List all the images</h3> <code>docker images -a</code>
        <h3>Remove one specfic image </h3>
        <code>docker rmi imageID1 imageID2</code>
        <h3>List all exited containers</h3>
        <code>docker ps -aq -f status=exited</code>
        <h3>
          Remove stopped containers. This command will not remove running
          containers, only an error message will be printed out for each of
          them. Remove dangling/untagged images
        </h3>
        <code>docker ps -aq --no-trunc -f status=exited | xargs docker rm</code>
        <h3>Remove dangling/untagged images</h3>
        <code>docker images -q --filter dangling=true | xargs docker rmi</code>
        <h3>Remove containers created after a specific container</h3>
        <code>docker ps --since a1bz3768ez7g -q | xargs docker rm</code>
        <h3>Remove containers created before a specific container</h3>
        <code>docker ps --before a1bz3768ez7g -q | xargs docker rm</code>
        <h3>How to remove intermediary images during docker build</h3>
        <code>
          Use --rm together with docker build to remove intermediary images
          during the build process.
        </code>
        <h3>To get in to the Container</h3>
        <code>docker exec -it CONTAINER_NAME bash </code>
        <h3>If I want to edit a file inside Container</h3>
        First I copy the file in the docker hosted machine.
        <code> docker cp CONTAINER_NAME:/path/to/file.ext . </code>

          {" "}
          Then I edit the file locally using your favorite editor, and then copy
          back again to the container to replace the old file.{" "}

        <code> docker cp file.ext CONTAINER_NAME:/path/to/file.ext </code>
      </div>
    );
  }
}

export default Dockercheat;
