import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';

const styles = StyleSheet.create({
   root:{
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       height: '100%',
       width: '100%'
   }
});

const loginButtonStyle = {
  margin: 12,
  display: 'flex',
  flex:1
};

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  componentDidMount() {
      this.props.auth.login();
  }
  

  render() {
    const { auth } = this.props
    return (
      <div className={css(styles.root)}>

      </div>
    )
  }
}

export default Login;