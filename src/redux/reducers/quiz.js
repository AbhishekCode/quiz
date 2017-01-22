import moviequiz from '../tempdata/quizes';
import database from '../../api/firebase';

const LOAD_QUIZ_LIST = "LOAD_QUIZ_LIST";
const LOAD_SELECTED_QUIZ = "LOAD_SELECTED_QUIZ";

const ADD_QUIZ_SUCCESS = "";
const ADD_QUIZ_FAILED = "";

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
      const data = snap.val();
      dispatch(getDataFulfilledAction(data))
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
  //hack to parse firebase data in array
  var quizlist = data.QuizList;
  var result = [];
  for(let i in quizlist)
    result.push([i, quizlist [i]]);
  
  let realQuizList = [];
  for(let i=0; i<result.length; i++){
    realQuizList.push(result[i][1]);
  }
  realQuizList.reverse();
  console.log("Quiz list recieved  ", realQuizList)
  return {
    type: ACTION_DATA_FULFILLED,
    data: realQuizList
  };
}


export function addQuiz(values) {
  console.log("addQuiz ", values);

  let payload = {
    name: values.quizName,
    questions:[
         {
          "question": "Which movie is this?",
          "imageURL" : "http://www.glamsham.com/movies/news/13/jul/3-idiots-wallpapers.jpg",
          "options" : [
                    {
                    "text": "3 idiots"
                    },
                    {
                    "text": "Tare Zameen Par"
                    },
                    {
                    "text": "PK"
                    },
                    {
                    "text": "Dil Chahta hai"
                    }
              ],
        "answer": 0,
        "explanation": "explanation about answer"
      }
    ]
  };
  console.log("movieQuiz ", moviequiz)
  return dispatch => {
      const QuizList = database.ref('/QuizList');
      var newChildRef = QuizList.push();
      newChildRef.set(payload).then(success=>{
        console.log("Successfully added new question ", success);
      });
   }
}

const addQuizSucess = () => {
  return {
    type: ADD_QUIZ_SUCCESS 
  }
}

const addQuizFailed = () => {
  return {
    type: ADD_QUIZ_FAILED
  }
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



