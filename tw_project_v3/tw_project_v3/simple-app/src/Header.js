import React from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});
class Header extends React.Component {
   state = {
    value: "/",
  };

  componentDidMount() {
    window.onpopstate = ()=> {
      this.setState({
        value: this.props.history.location.pathname
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };

  render() {
    const{classes}= this.props;
    const {value} = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="About" value = "/" />
            <Tab label="All Feedbacks" value = "/AllFeedback"/>
            <Tab label="Cauta Feedback" value="/AllFeedbackLinie"/>
            <Tab label="Adauga Feedback" value = "/AdaugaFeedback"/>
            <Tab label="Creeaza Utilizator" value = "/CreeazaUtilizator"/>
            <Tab label="Profil" value = "/LogIn"/>         
          </Tabs>
        </AppBar>    
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Header));
