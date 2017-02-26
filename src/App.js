import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import './App.css';


class App extends Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <MuiThemeProvider>
        <div className={css(styles.app)}>
           {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
    app: {
       display: 'flex',
       flex: 1,
    }
});

export default App;
