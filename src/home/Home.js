//-------------------------------------------------------------------
// Import module
//-------------------------------------------------------------------
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//-------------------------------------------------------------------


//-------------------------------------------------------------------
// Component - Home
//-------------------------------------------------------------------
class Home extends Component {

  //-------------------------------------------------------
  // Event - Called before component mount
  //-------------------------------------------------------
  componentWillMount = () => {
    //console.log("Home - componentWillMount()");
  }
  //-------------------------------------------------------


  //-------------------------------------------------------
  // Event - Called after component mount
  //-------------------------------------------------------
  componentDidMount = () => {
    //console.log("Home - componentDidMount()");
  }
  //-------------------------------------------------------


  //-------------------------------------------------------
  // Event - Called before component UnMount
  //-------------------------------------------------------
  componentWillUnmount = () => {
    //console.log("Home - componentWillUnmount() ");
  }
  //-------------------------------------------------------


  //-------------------------------------------------------
  // Render html for component
  //-------------------------------------------------------
  render(){

    // Return html
    return(
      <div className="container" >

        <div className="jumbotron">
          <h1>What is React Blog</h1>
          <p>
            Ract blog is the new way of creating the blog by simple and easy methods.
            You can create, update, delete post and share your blog wall with community.
          </p>
          <p>
            <Link to="/" className="btn btn-primary btn-lg" >
               Learn more
            </Link>
          </p>
        </div>

        <div className="jumbotron">
          <h1>Features</h1>
          <p>
            Ract blog is the new way of creating the blog by simple and easy methods.
            You can create, update, delete post and share your blog wall with community.
          </p>
          <p>
            <Link to="/" className="btn btn-primary btn-lg" >
               Learn more
            </Link>
          </p>
        </div>

        <div className="jumbotron">
          <h1>Pricing</h1>
          <p>
            Ract blog is the new way of creating the blog by simple and easy methods.
            You can create, update, delete post and share your blog wall with community.
          </p>
          <p>
            <Link to="/" className="btn btn-primary btn-lg" >
               Learn more
            </Link>
          </p>
        </div>

      </div>
    );
  }
  //-------------------------------------------------------

}
//-------------------------------------------------------------------

//-------------------------------------------------------------------
// Export module
//-------------------------------------------------------------------
export default Home;
//-------------------------------------------------------------------
