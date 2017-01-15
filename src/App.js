import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import './App.css';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className={css(styles.app)}>
            {this.props.children}
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
