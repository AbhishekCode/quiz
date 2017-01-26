import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { StyleSheet, css } from 'aphrodite';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import {getWidth, getHeight} from '../../utils/config'

class Question extends Component {
  constructor(props) {
      super(props);
  };

  _selectAnswer = (index) => {
     let answeredOption = index + 1; // zero index +1
     if(answeredOption == this.props.question.answer) {
       this.props.onAnswered(index, true);
     }else {
       this.props.onAnswered(index , false);
     }
  };

  render() {
    const {question} = this.props;
    const questionText = question ? question.question : "not loaded";
    return (
        <div className={css(styles.container)}>
          <span className={css(styles.question)}>{questionText}</span>
          <img src={question.imageURL} style={imageStyle} />
          <div className={css(styles.optionContainer)}>
              { 
                question.options.map((option, index) => this._renderOption(option, index))
              }
          </div>
          <Divider />
        </div>
    );
  };

  _renderOption = (option,index) => {
      const correctAnswer = (index+1 == this.props.question.answer && this.props.answered) ? true : false;
      const wrongAnswer = (this.props.answered && !correctAnswer && index == this.props.answeredIndex) ? true : false;
      return (
         <RaisedButton label={option} style={optionStyle} primary={correctAnswer} 
         secondary={wrongAnswer} onClick={()=>this._selectAnswer(index)} />
      );
  };
}
const optionStyle = {
      display: 'flex',
      flex:1,
      flexDirection: 'row',
      justyfyContent: 'center',
      alignItems: 'center',
      margin: 10
}

const imageStyle = {
     width: getWidth()*0.9,
     maxWidth: 500,
     height: 'auto'
}

const styles = StyleSheet.create({
    container: {
       display: 'flex',
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'space-between'
    },
    question :{
      padding: 20,
    },
    optionContainer: {
       display: 'flex',
       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'space-between'
    }
});

export default Question;
