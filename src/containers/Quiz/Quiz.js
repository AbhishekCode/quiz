import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Question from './Question';
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import {routepath} from '../../utils/config';
const routePath = routepath();

class Quiz extends Component {
  constructor(props) {
      super(props);
      this.state = {
        questionIndex: 0,
        answeredIndex:-1,
        wrongAnswer: 0,
        correctAnswer: 0,
        answered: false,
        finished: false,
        selectedQuestion: this.props.quiz.questions[0]
      };
  };


  _nextQuestion = () => {
      let nextindex = this.state.questionIndex +1 ;
      if(nextindex < this.props.quiz.questions.length) {
        let nextQuestion = this.props.quiz.questions[nextindex]
        this.setState({
            questionIndex:nextindex,
            selectedQuestion: nextQuestion,
            answered: false
        });
      }else {
        this.setState({
            finished: true
        }); 
      }
  }

  _answeredQuestion = (answeredIndex, correctAnswer) => {
     let correct = correctAnswer ? this.state.correctAnswer + 1 : this.state.correctAnswer;
     let wrong = !correctAnswer ? this.state.wrongAnswer + 1 : this.state.wrongAnswer;
     this.setState({answered:true, answeredIndex:answeredIndex, correctAnswer:correct, wrongAnswer:wrong})
  }

  _backToQuizList = () => {
      browserHistory.push(routePath+"quizes");
  }

  render() {
    const selectedQuestion = this.state.selectedQuestion;
    return (
        <div className={css(styles.container)}>

            {!selectedQuestion &&
                <div>
                   <CircularProgress />
                   <span>Loading Quiz</span>
                </div>
            }
         
            {selectedQuestion && !this.state.finished && <Question question={selectedQuestion} answered={this.state.answered}  
            answeredIndex={this.state.answeredIndex} onAnswered={this._answeredQuestion}/> }

            {this.state.finished ? 
                <div className={css(styles.result)}>
                   <span>You answered {this.state.correctAnswer} question correctly, {this.state.wrongAnswer} was wrong!</span>
                   <RaisedButton label="Back to Quiz List" 
                      style={nextButtonStyle} onClick={this._backToQuizList} />
                </div>
             :
               <RaisedButton label="Next Question" disabled={!this.state.answered} 
             style={nextButtonStyle} onClick={this._nextQuestion} />
            }
           
        </div>
    );
  }
}

const nextButtonStyle = {
      margin: 10
}

const styles = StyleSheet.create({
    container: {
       display: 'flex',
       flex: 1,
       flexDirection: 'column',
       justyfyContent: 'center',
       alignItems: 'center'
    },
    result: {
       display: 'flex',
       flex: 1,
       padding: 20,
       flexDirection: 'column',
       justyfyContent: 'center',
       alignItems: 'center'
    }

});

function mapStateToProps(state) {
  return {
     quiz: state.quiz.selectedQuiz || undefined
  };
}
export default connect(mapStateToProps) (Quiz);
