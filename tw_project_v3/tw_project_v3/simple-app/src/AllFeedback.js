import React, { Component } from "react";
import FeedbackList from "./FeedbackList";
import axios from "axios";

class AllFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:8080/getAllFeedback").then((feedbacks) => {
      this.setState({
        feedbacks: feedbacks.data,
      });
    });
  };

  render() {
    return (
      <div>
        <FeedbackList feedbacks={this.state.feedbacks} />
      </div>
    );
  }
}

export default AllFeedback;
