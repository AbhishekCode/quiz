import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import AuthService from '../../utils/AuthService';

import {routepath} from '../../utils/config';
const routePath = routepath();

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
      };
  };

  componentWillMount() {
    const loggedin = this.props.auth.loggedIn();
    this.setState({loggedIn:loggedin})
  }
  
  _login = () => {
     browserHistory.replace('/login')
  }

  _logout = () => {
      this.props.auth.logout();
      this.setState({loggedIn:false})
  }

  _addNewQuiz = () =>{
      browserHistory.push(routePath+"addquiz");
  }

  _showQuizList = () => {
      browserHistory.push(routePath+"quizes");
  }

  render() {
    const {auth} = this.props;
    const loggedin = this.state.loggedIn;
    console.log("loggedin ", loggedin)
    return (
        <div className={css(styles.container)}>
           <span className={css(styles.heading)}>Quiz Applicaiton</span>
           <RaisedButton label={"Quiz List"} primary={true} style={buttonStyle} onClick={this._showQuizList} />
           {loggedin ?
             <RaisedButton label={"Add New quiz"} primary={true} style={buttonStyle} onClick={this._addNewQuiz}/> :
             <RaisedButton label={"Login"} primary={true} style={buttonStyle} onClick={this._login}/> 
           }
           {loggedin && <RaisedButton label={"LogOut"} primary={true} style={buttonStyle} onClick={this._logout}/> }
        </div>
    );
  }
}

const buttonStyle = {
      margin: 10
}

const styles = StyleSheet.create({
    container: {
       display: 'flex',
       flex: 1,
       flexDirection: 'column',
       justyfyContent: 'space-between',
       alignItems: 'center',
       padding: 10
    },
    heading: {
       fontSize: 30,
       color: '#00BCD4',
       paddingTop: 40,
       paddingBottom: 100,
    }
});

function mapStateToProps(state) {
  return {

  };
}
export default connect(mapStateToProps) (Home);
