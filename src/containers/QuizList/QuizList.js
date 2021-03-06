import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';

import {routepath} from '../../utils/config';
const routePath = routepath();

import {loadQuizList, loadSelectedQuiz, loadQuizListFirebase, addQuiz} from '../../redux/reducers/quiz';

class QuizList extends Component {
  constructor(props) {
      super(props);
      this.props.dispatch(loadQuizListFirebase());
  };

  _selectQuiz = (index) => {
      this.props.dispatch(loadSelectedQuiz(this.props.quizList[index]));
      browserHistory.push(routePath+"quiz");
  }

  _home = () => {
      browserHistory.push(routePath+"/home");
  }
  render() {
    return (
        <div className={css(styles.container)}>
         <RaisedButton label={"Home"} primary={true} style={nextButtonStyle} onClick={this._home} />
          {
            !this.props.quizList && <CircularProgress />
          }
          <List style={{width:'100%'}}>
            { 
              this.props.quizList && this.props.quizList.map((quiz, index) => 
                <ListItem style={{width:'100%'}} primaryText={quiz.name} secondaryText={'by '+quiz.user} onClick={()=>this._selectQuiz(index)} />
              )
            }
          </List>
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
       width: '100%',
       flexDirection: 'column',
       justyfyContent: 'center',
       alignItems: 'center',
       padding: 10
    }
});

function mapStateToProps(state) {
  return {
     quizList: state.quiz.quizList || undefined
  };
}
export default connect(mapStateToProps) (QuizList);
