import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux';
// import { reducer as reduxAsyncConnect } from 'redux-async-connect';
// Our custom reducers
import { reducer as quiz } from './quiz';



// combining all
const reducer =  combineReducers({
  quiz,
  routing: routerReducer
});

export default reducer;