import React, { Component } from "react";

class Puppetingooglecloud extends Component {
  render() {
    return (
      <div>
        <h1>Puppet in Google Cloud</h1>
        In this tutorial, we will implement a very simple Master-Agent
        architecture with two Compute Engine instance
        <ol>
          <li>
            Create a small(1 shared vCPU + 1.7 GB memory) Compute Engine
            instance with the OS Ubuntu 16.04 xenial and with 'Allow HTTP
            traffic' checked under Firewall section and name this{" "}
            <b>puppet-agent.</b>{" "}
          </li>
          <li>
            Create another Compute Engine instance but this time a with 1 vCPU +
            3.75 GB memory with the same OS (Ubuntu 16.04 xenial) but this time
            default firewall option is fine. No need to check http or https
            traffic allow. Name the instance as <b>puppet-master</b>
          </li>
          <li>
            SSH into puppet-master and run the following commands to install
            <a href="https://docs.puppet.com/puppet/3.8/install_debian_ubuntu.html">
              {" "}
              puppet
            </a>{" "}
            into the puppet-master
            <code>
              <br /> wget{" "}
              <a href="https://apt.puppetlabs.com/">
                https://apt.puppetlabs.com/puppetlabs-release-pc1-xenial.deb
              </a>
              <br /> sudo dpkg -i puppetlabs-release-pc1-xenial.deb
              <br /> sudo apt-get update
              <br /> sudo apt-get install puppetserver
            </code>
          </li>
          <li>
            Start the server by <code>sudo systemctl start puppetserver</code>
          </li>
          <li>
            Make sure puppet server is running by{" "}
            <code>
              <br />sudo systemctl status puppetserver<br />
            </code>
          </li>
          We should see a line that says "active (running)"
          <li>
            Now that we've ensured the server is running, we'll configure it to
            start at boot.
            <code><br />sudo systemctl enable puppetserver</code>
          </li>
          <li>
            Now SSH into the puppet agent and run the following commands to
            install
            <a href="https://docs.puppet.com/puppet/3.8/install_debian_ubuntu.html">
              {" "}
              puppet
            </a>{" "}
            into puppet-Agent
            <code>
              <br /> wget{" "}
              <a href="https://apt.puppetlabs.com/">
                https://apt.puppetlabs.com/puppetlabs-release-pc1-xenial.deb
              </a>
              <br /> sudo dpkg -i puppetlabs-release-pc1-xenial.deb
              <br /> sudo apt-get update
              <br /> sudo apt-get install puppet-agent
              <br /> sudo systemctl start puppet
              <br /> sudo systemctl enable puppet
            </code>
          </li>
          <li>
            Next, we will edit the /etc/hosts file of Puppet Agent. At the end of the file,
            specify the Puppet master server as
            follows,
            <code><br /> Puppet_Master_Compute_Engine_instance_internal_ip_address &nbsp;&nbsp;    puppet</code>
          </li>
          <li>
            The first time Puppet runs on an agent node, it sends a certificate
            signing request to the Puppet master. To list all unsigned
            certificate requests, run the following command on the Puppet
            master:
            <code>sudo /opt/puppetlabs/bin/puppet cert list</code>
          </li>
          <li>
            We'll use the --all option to sign certificate:
            <code>
              sudo /opt/puppetlabs/bin/puppet cert sign --all<br />
            </code>
            You can also do a single sign by{" "}
            <code>puppet-agent.c.YOUR_PROJECT_ID.internal</code>
          </li>
          <li>
            In the puppet-master, go to folder
          <code>/etc/puppetlabs/code/environments/production/manifests/</code> by
            <code>
              <br />cd /etc/puppetlabs/code/environments/production/manifests/
            </code>{" "}
            and make a manifest file site.pp as
            <code>
              <br />node /agent/{"{"}
              <br /> &nbsp; include webserver
              <br />
              {"}"}
            </code>
          </li>
          <li>
            Now go to 'modules directory' by{" "}
            <code><br /> cd /etc/puppetlabs/code/environments/production/modules <br /> </code>
            and then make a directory by
            <code><br /> sudo mkdir -p webserver/manifests </code>
          </li>
          <li>
            in the above manifest directory, create a file init.pp as
            <code>
              <br />class webserver {"{"}
              <br />&nbsp; package {"{"} 'apache2':
              <br />&nbsp;&nbsp; ensure => present
              <br /> &nbsp; {"}"}
              <br />&nbsp; file {"{"}'/var/www/html/index.html': # resource type
              file and filename
              <br />&nbsp;&nbsp; ensure => present, # make sure it exists
              <br />&nbsp;&nbsp; content => "{"<h1>"}This page is installed from Puppet Master{
                "</h1>"
              }", # content of the file
              <br /> &nbsp; {"}"}
              <br />
              {"}"}
            </code>
            <li>
              By default, Puppet Server runs the commands in its manifests by default every 30 minutes.
              However, rather than waiting for the Puppet master to apply the changes, we can apply
              the manifest by running the following command in the Agent. Note that <code>--test</code> is not a flag for
              a dry run; if it's successful, it will change the agent's configuration.
              <code><br />sudo /opt/puppetlabs/bin/puppet agent --test</code>
            </li>
          </li>
        </ol>
      </div>
    );
  }
}

export default Puppetingooglecloud;
