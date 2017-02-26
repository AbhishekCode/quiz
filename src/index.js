import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory ,IndexRedirect, IndexRoute} from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux'

import AuthService from './utils/AuthService';
import store from './redux/store';
import App from './App';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import Home from './containers/HomePage/Home';
import AddQuiz from './containers/Add/AddQuiz';
import Login from './containers/Login/Login';
import './index.css';

import {routepath} from './utils/config';
const path = routepath();
const githubPath = path+'/home';
const history = syncHistoryWithStore(browserHistory, store);
const auth = new AuthService('EgCtDdCcNMcpwi0g73SQKD1sQ8UkG5MD', 'abvishek.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={path} component={App} auth={auth}>
           <IndexRoute component = {Home} />
           <Route path={"home"} component={Home}/>
           <Route path="quizes" component={QuizList}/>
           <Route path="addquiz" component={AddQuiz} onEnter={requireAuth}/>
           <Route path="quiz" component={Quiz}/>
           <Route path="login" component={Login}/>
           <Route path='*' component={Home}/>
        </Route>
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);
