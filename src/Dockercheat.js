import React, { Component } from "react";

class Dockercheat extends Component {
  componentWillMount = () => {
    this.setState({
      moreIsClicked: false
    });
  };

  handleClick = () => {
    //if(moreIsClicked){
      this.setState({
        moreIsClicked : !this.state.moreIsClicked
      });
    // }else {
    //   this.setState({
    //     moreIsClicked : false
    //   });
    //}

  };

  render() {
    return (

        <div className="jumbotron">
          <h1>Docker Cheatsheet</h1>

          <p>
            I use Docker day to day. So I decided to make a cheatsheet on Docker.
          </p>
          <p>
            <button
              type="button"
              onClick={this.handleClick}
              className="btn btn-primary btn-lg"
            >
              {this.state.moreIsClicked ? "Hide" : "Show more"}
            </button>
          </p>

          {this.state.moreIsClicked === true &&
            <p>
              This is more info
            </p>}
        </div>

    );
  }
}

export default Dockercheat;
