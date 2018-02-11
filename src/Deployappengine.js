import React, { Component } from "react";



class Deployappengine extends Component {
  render(){
    return(
      <div>

        <h1>Several ways to deploy App in App Engine from Eclipse</h1>



    <h3>Python</h3>

      <h4>Using Pydev Google App Engine Project: [recommended]</h4>
      <ol>
      <li> Create a new project from Eclipse > File > New > Projects </li>
      <li> Choose Pydev Google App Engine Project </li>
      <li> When asked for Google App Engine directory locate where it is </li>
      <li> Right button to the project >Pydev Google App Engine > manage / upload to upload directly from eclipse </li>
      </ol>


    <h4>Creating the project Using Pydev project: [Not recommended]</h4>
    <ol>
    <li>Create a Pydev project from Eclipse > File > New Pydev project</li>
    <li>Right click the project. Click Pydev Python Path > Choose external libraries</li>
    <li>Locate where the Google App engine folder is</li>
    <li>Choose the libraries that you need</li>
    <li>Upload the project with Google App Engine Launcher</li>
    </ol>


    <h3>Java</h3>

    <h4>Java (web application servlet):</h4>
    <ol>
    <li>Create a web application by File > Other > Web Application project</li>
    <li>Select / Unselect Google Web toolkit (Generally unselect, not supported by cloud platform)</li>
    <li>Project name (test), package (com.test)</li>
    <li>Finish</li>
    </ol>
    <h4>Java (Maven Build):</h4>
    <ol>
    <li>Window > Preferences > Maven > Archetypes >
      <a href="http://www.avajava.com/tutorials/lessons/how-do-i-perform-an-archetype-create-from-eclipse.html"> Add Remote Catalog… </a>
    <br />Catalog File: http://repo1.maven.org/maven2/archetype-catalog.xml</li>
    <li>create as Maven project and when ask archtype search for Google and choose as required.</li>
    <li> For “hello world” Blank skeleton type web page: add index.jsp in source>main>webapp directory</li>
    </ol>




      </div>
    );
  }
}


export default Deployappengine;
