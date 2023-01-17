import React, { Component } from "react";
import "./Home.css";

import AdaugaFeedback from "./AdaugaFeedback";
import CreeazaUtilizator from "./CreeazaUtilizator";
import LogIn from "./LogIn";
import About from "./About";
import AllFeedbackLinie from "./AllFeedbackLinie";

import Header from "./Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllFeedback from "./AllFeedback";
class Home extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <div>
              <Route path="/" exact component={About} />
              <Route path="/AdaugaFeedback" component={AdaugaFeedback} />
              <Route path="/CreeazaUtilizator" component={CreeazaUtilizator} />
              <Route path="/LogIn" component={LogIn} />
              <Route path="/AllFeedback" component={AllFeedback} />
              <Route path="/AllFeedbackLinie" component={AllFeedbackLinie} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default Home;
