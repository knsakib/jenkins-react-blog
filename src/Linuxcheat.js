import React, { Component } from "react";

class Linuxcheat extends Component {
  render() {
    return (
      <div>
        <h1>Linux Cheatsheet</h1>

        <p>
          Linux commands are common in my workplace and I would like to use
          command line in dev environment. So I decided to make a cheatsheet on
          Docker.
        </p>

        <p>
          <h3>
            To remove a directory that contains other files or directories, use
            the following command.
          </h3>
          <code> rm -r mydir</code>
          <h3>
            If you don't want to receive a prompt for each file, during deletion
          </h3>{" "}
          <code>rm -rf mydir</code>
          <h3>The ps command lists running processes.</h3>
          <code>ps -A</code>
          <h3>List process to scroll through them at chunk </h3>
          <code>ps -A | less</code>
          <h3>The following command would search for the Firefox process</h3>
          <code>ps -A | grep firefox</code>
          <h3>The kill command can kill a process, given its process ID.</h3>
          <code>kill PID</code>
          <h3>
            pgrep returns the process IDs that match it. For example, you could
            use the following command to find Firefox’s PID
          </h3>
          <code>pgrep firefox</code>
          <h3>
            The pkill and killall commands can kill a process, given its name.
            We can Use either command to kill Firefox
          </h3>
          <code>
            pkill firefox <br /> killall firefox
          </code>
          <h3>How to remove intermediary images during docker build</h3>
          <code>
            Use --rm together with docker build to remove intermediary images
            during the build process.
          </code>
          <h3>How to change the pririty of a process</h3>
          <code> renice 19 PID </code>
          <p>
            The renice command changes the nice value of an already running
            process. The nice value determines what priority the process runs
            with. A value of -19 is very high priority, while a value of 19 is
            very low priority. A value of 0 is the default priority. The renice
            command requires a process’s PID. The following command makes a
            process run with very low priority:{" "}
          </p>
          <h3>Kill any UI process</h3>
          <p>
            <code>xkill command</code> is a way of easily killing graphical
            programs. Run it and your cursor will turn into an x sign. Click a
            program’s window to kill that program. If you don’t want to kill a
            program, you can back out of xkill by right-clicking instead.
          </p>
        </p>
      </div>
    );
  }
}

export default Linuxcheat;
