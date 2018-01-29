import React, { Component } from "react";

class Howjenkinsreactblog extends Component {
  componentWillMount = () => {};

  render() {
    return (
      <div>
        <h1>
          How I automated the deployment pipeline for my rendered react
          docker daemon in Google Cloud Compute Engine
        </h1>
        <h3>Creating Comoute Engine instance</h3>
        <ol>
          <li>
            In the Google Cloud Developer console I went to Compute Engine in
            the left sliding pan and go to VM instances page.
          </li>

          <li>
            In the Boot disk section, I choose the Ubuntu 16.04 LTS amd64 xenial
            image.{" "}
          </li>
          <li>
            In the Machine type I selected small (1 shared vCPU) and Click
            Select.{" "}
          </li>
          <li>
            In the Firewall section, I selected Allow HTTP traffic and Allow
            HTTPS traffic.
          </li>
          <li>
            Finally I created the instance by clicking the Create button to
            create the instance.
          </li>
        </ol>
        <h3>Installing Jenkins</h3>
        I SSH into the instance and Run the following commands in the in the
        terminal,
        <code>
          <br />wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo
          apt-key add - <br />
          sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ >
          /etc/apt/sources.list.d/jenkins.list' <br />
          sudo apt-get update <br />
          sudo apt-get install jenkins <br />
          sudo systemctl start jenkins
        </code>
        To set up our installation, I visit Jenkins on its default port, 8080,
        using the server domain name or IP address:
        http://ip_address_or_domain_name:8080. We should see "Unlock Jenkins"
        screen, which displays the location of the initial password. In the
        terminal window, I used the cat command to display the password:
        <code>
          <br />sudo cat /var/lib/jenkins/secrets/initialAdminPassword<br />
        </code>
        I copied the 32-character alphanumeric password from the terminal and
        pasted it into the "Administrator password" field, then clicked
        "Continue". The next screen presents the option of installing suggested
        plugins or selecting specific plugins. The default Jenkins server is NOT
        encrypted, so the data submitted with this form is not protected. So, I
        will continue as Admin and create an user later when I will setup SSL.
        <h3>Installing Nginx and Map the Domain</h3>
        <ol>
          <li>
            Run the following commands to install Nginx
            <code>
              <br /> sudo apt-get update <br />
              sudo apt-get install nginx <br />
            </code>
          </li>
          <li>
            In the Google Cloud Console, I went to External IP section under VPC
            Network the Reserve a static address page in the GCP Console.{" "}
          </li>
          <li>
            I Changed the IP type from Ephemeral to Static and Choose a name{" "}
          </li>

          <li>Click Reserve to reserve the IP.</li>

          <li>
            In the DNS settings Add the instance external IP as ‘A record’ and
            add ‘www’ as CNAME for the Domain{" "}
          </li>
          <li>
            Open /etc/nginx/sites-available/default, with nano or your favorite
            text editor by the following command in the terminal, sudo nano
            /etc/nginx/sites-available/default{" "}
          </li>
          <li>
            Find the existing server_name line and replace the underscore, _,
            with your domain name: . . . server_name example.com
            www.example.com; . . .
          </li>
          <li>Save the file (Ctrl+x and then y) and quit your editor.</li>
          <li>
            {" "}
            Reload Nginx to load the new configuration by sudo systemctl reload
            nginx
          </li>
        </ol>
        <h3>Install Let’s encrypt SSL to serve on https</h3>
        <ol>
          <li>
            From Let’s Encrypt
            Documentation(https://certbot.eff.org/#ubuntuxenial-nginx) we can
            see what are the commands we need to run
          </li>
          <li>
            I ran the following command
            <code>
              <br />sudo apt-get update
              <br />sudo apt-get install software-properties-common
              <br />sudo add-apt-repository ppa:certbot/certbot
              <br />sudo apt-get update
              <br />sudo apt-get install python-certbot-nginx
              <br />sudo certbot --authenticator standalone --installer nginx -d
              knsakib.com -d www.knsakib.com --pre-hook "service nginx stop"
              --post-hook "service nginx start"
              <br />sudo certbot renew --dry-run
            </code>
          </li>
        </ol>
        <h3>
          Change the server block in Nginx to serve Jenkins under /jenkins path{" "}
        </h3>
        <ol>
          <li>
            I Opened <code> /etc/nginx/sites-available/default </code>, again
            with nano or your favorite text editor{" "}
          </li>
          <li>
            First, I added specific access and error logs in the server block
            with the SSL configuration settings,
            <code>
              <br />server /{"{"}
              <br />...
              <br />access_log /var/log/nginx/jenkins.access.log;
              <br />error_log /var/log/nginx/jenkins.error.log;
              <br />...<br />
              {"}"}
            </code>
          </li>

          <li>
            Add a location in the default server block as follows,
            <code>
              <br />location ^~ /jenkins {"{"}
              <br />proxy_pass http://127.0.0.1:8080;
              <br />include /etc/nginx/proxy_params;
              <br />proxy_read_timeout 90;
              <br /> proxy_redirect http://127.0.0.1:8080
              https://knsakib.com/jenkins;
              <br />
              {"}"} <br />
            </code>
          </li>

          <li>
            We can check the syntax if it is ok by sudo nginx -t In addition, we
            must ensure that Jenkins is configured to listen for requests to the
            /jenkins path. For that I added the parameter --prefix=/jenkins to
            the Jenkins default startup configuration file which is
            /etc/default/jenkins. We will modify the /etc/default/jenkins
            configuration file to make these adjustments, Locate the
            JENKINS_ARGS line and add <code>--prefix=/jenkins</code> to the
            existing arguments:
            <code>
              <br />. . .
              <br />JENKINS_ARGS="--webroot=/var/cache/$NAME/war
              --httpPort=$HTTP_PORT --prefix=/jenkins" <br />{" "}
            </code>
          </li>
          <li>
            To use the new configuration settings, we'll restart Jenkins and
            Nginx.
            <code>
              <br /> $sudo systemctl restart jenkins
            </code>
            <code>
              <br /> $sudo systemctl restart nginx <br />{" "}
            </code>
            If there is any issue to restart we can check the status by{" "}
            <code>sudo systemctl status nginx</code>
          </li>

          <li>
            For Jenkins to work with Nginx, we need to update the Jenkins
            configuration so that the Jenkins server listens only on the
            localhost interface rather than all interfaces (0.0.0.0). If Jenkins
            listens on all interfaces, then it's potentially accessible on its
            original, unencrypted port (8080). We will modify the
            /etc/default/jenkins configuration file to make these adjustments.
            <code>
              {" "}
              <br />sudo nano /etc/default/jenkins{" "}
            </code>
            Locate the JENKINS_ARGS line and add --httpListenAddress=127.0.0.1
            to the existing arguments:
            <code>
              <br />. . .
              <br />JENKINS_ARGS="--webroot=/var/cache/$NAME/war
              --httpPort=$HTTP_PORT --httpListenAddress=127.0.0.1" <br />
            </code>
          </li>
          <li>
            Save and exit the file. To use the new configuration settings, we'll
            restart Jenkins and Nginx.
            <code>
              {" "}
              <br />sudo systemctl restart jenkins<br />{" "}
            </code>
          </li>
        </ol>

        <h3>Create a New Admin User</h3>
        <ol>
<li>Enable Sign UP new user by changing the file /var/lib/jenkins/config.xml
<code> <br />sudo nano /var/lib/jenkins/config.xml <br /></code>
Set <disableSignup>true</disableSignup> to <disableSignup>false</disableSignup>
<code> <br /> sudo systemctl restart jenkins <br /> </code> </li>
<li>Sign Up new user</li>
<li>Change the /var/lib/jenkins/config.xml file again and set <disableSignup>true</disableSignup> again
<code> <br />sudo systemctl restart jenkins <br /> </code>
</li>
</ol>

<h3>Install Docker </h3>
<ol>
<li>First, add the GPG key for the official Docker repository to the system:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
</li>
<li>Add the Docker repository to APT sources:
<code> <br />sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
</code>
</li>
<li> Next, update the package database with the Docker packages from the newly added repo:
 <code> <br />sudo apt-get update </code>
</li>
<li>
If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:
<code><br /> sudo usermod -aG docker ${'{'}USER{'}'} </code>
</li>
<li>After following the prerequisites, both Jenkins and Docker are installed on your server. However, by default, the Linux user responsible for running the Jenkins process cannot access Docker.
To fix this, we need to add the jenkins user to the docker group using the usermod command:
<code><br />sudo usermod -aG docker jenkins
<br /> sudo systemctl restart jenkins <br /> </code>
</li>
</ol>

<h3>Redirecting direct access to site from server's IP </h3>
<ol>
<li>For this I created a new site that responds to the IP and responds with a 301 redirect.
  To create a site just go to your Nginx's installation /sites-availabledirectory.
  This directory is commonly located at /etc/nginx/sites-available, run in your terminal:
<code><br />cd /etc/nginx/sites-available<br /></code>
</li>

<li>Once in the directory create a new server config file or edit one of the server files that you have there.
  For this example let's create a new one and add the server block there,
  I'll use nano to edit the file, run in your terminal:
<code><br/>touch empty_site
<br />nano empty_site <br /></code>
</li>

<li>
  Add this server block, make sure to replace server_ip with your server's IP.
<code>
  <br />server {'{'}
<br />    listen      80;
<br />    listen      443; # add this to block HTTPS access
<br />    server_name my_server_ip_adress https://my_server_ip_adress;
<br />    return 301 https://knsakib.com;
<br />{'}'} <br />
</code>
</li>

<li>Save and exit the file.</li>

<li>Now we just have to enabled the site and restart the Nginx server.
To enable the site lets navigate to the /sites-enabled directory
inside the Nginx config and create a symlink for the server config
file that we previously created, run in your terminal:
<code><br />cd /etc/nginx/sites-enabled
<br />ln -s /etc/nginx/sites-available/empty_site empty_site
</code>
</li>

<li>
Once this is done, we just have to restart the nginx server and everything should be working as expected, to restart run this:
<code><br />sudo service nginx restart <br /> </code>
</li>

</ol>

<h3>Rendering my react site 'cause it's a Blog and it needs SEO</h3>
<ol>

<li>I used <a href="https://github.com/antonybudianto/cra-universal">cra-universal</a> cra-universal to rendered
my create-react-app blog. It uses express server render the static react app. It biulds the react site and biuld
the rendered site together. It is an amazing tool, thanks to it's author.
All the intruction are mentioned at author's <a href="https://github.com/antonybudianto/cra-universal">github</a> page.
</li>
<li>
  Because I am using react router, I made sure that
  App.js didn't render BrowserRouter, but put it on src/index.js or outer files
  The index.js code is <a href="https://github.com/knsakib/jenkins-react-blog/blob/master/src/index.js">here</a>.
  And the App.js is <a href="https://github.com/knsakib/jenkins-react-blog/blob/master/src/App.js">here</a>.

</li>
<li>
  I also linked bootstarp cdn style sheet in index.html in stead of using any bootstrap npm module to make sure that the css will not create any issue
  with rendering.
</li>

</ol>

<h3>Creating Dockerfile</h3>
<ol>
  <li>
    I created the docker file in my project directory, and add the image I want to inherit from, and override the log level setting.
It includes all the module installation command and cra-universal build commands that include both the
react build and server biuld command.</li>
<li>I can just run <code>npm install</code> in my Dockerfile to install dependencies
and copied from the build host,
However, if I do that, there’s no reason to copy the full node_modules directory over at all.
That’s where a .dockerignore file comes in.
This lets me filter which files the Docker CLI sends to the Docker daemon, which is great for our efficiency!</li>
<li>
  Also note that create-react-app will generate a non-shrinkwrappable dependency tree, so I cleaned it up first.
  and used a --dev shrinkwrap.
  <code><br />npm prune
  <br />npm dedupe
  <br />npm install
  <br />npm shrinkwrap --dev<br /></code>
</li>

</ol>
      </div>
    );
  }
}

export default Howjenkinsreactblog;
