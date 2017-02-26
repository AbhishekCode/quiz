import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';
// import { reducer as reduxAsyncConnect } from 'redux-async-connect';
// Our custom reducers
import { reducer as quiz } from './quiz';
import {reducer as user} from './user';



// combining all
const reducer =  combineReducers({
  quiz,
  user,
  routing: routerReducer,
  form: formReducer
});

export default reducer;