import moviequiz from '../tempdata/quizes';
import database from '../../api/firebase';

const LOAD_QUIZ_LIST = "LOAD_QUIZ_LIST";
const LOAD_SELECTED_QUIZ = "LOAD_SELECTED_QUIZ";

const ACTION_DATA_REQUESTED= 'ACTION_DATA_REQUESTED';
const ACTION_DATA_FULFILLED= 'ACTION_DATA_FULFILLED';
const ACTION_DATA_REJECTED= 'ACTION_DATA_REJECTED';


// reducer function to load hobby chefs and related data
export function reducer(state = {}, action) {
  switch(action.type) {
    case LOAD_QUIZ_LIST:
        return {...state, quizList: action.data};
    case LOAD_SELECTED_QUIZ:
      return {...state, selectedQuiz: action.data};
    case ACTION_DATA_REQUESTED:
        return {...state};
    case ACTION_DATA_FULFILLED:
        return {...state, quizList: action.data};
    case ACTION_DATA_REJECTED:
        return {...state};
    default:
      return state;
  }
}

export const loadQuizListFirebase = () => {
  return dispatch => {
    dispatch(getDataRequestedAction());
    return database.ref('/').once('value', snap => {
      const invite = snap.val();
      dispatch(getDataFulfilledAction(invite))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDataRejectedAction());
    });
  }
}

function getDataRequestedAction() {
  return {
    type: ACTION_DATA_REQUESTED
  };
}

function getDataRejectedAction() {
  return {
    type: ACTION_DATA_REJECTED
  }
}

function getDataFulfilledAction(data) {
  console.log("Firebase data ", data);
  return {
    type: ACTION_DATA_FULFILLED,
    data: data.QuizList
  };
}



export const loadQuizList = () => {
   let quizList = [moviequiz];
   return {
      type: LOAD_QUIZ_LIST , data: quizList
   }
}

export const loadSelectedQuiz = (quiz) => {
  return {
    type: LOAD_SELECTED_QUIZ , data: quiz
  }
};



