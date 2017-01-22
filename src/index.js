import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory ,IndexRedirect, IndexRoute} from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux'
import store from './redux/store';
import App from './App';
import QuizList from './containers/QuizList/QuizList';
import Quiz from './containers/Quiz/Quiz';
import Home from './containers/HomePage/Home';
import AddQuiz from './containers/Add/AddQuiz';
import './index.css';

import {routepath} from './utils/config';
const path = routepath();
const githubPath = path+'/home';
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={path} component={App}>
           <IndexRoute component = {Home} />
           <Route path={"home"} component={Home}/>
           <Route path="quizes" component={QuizList}/>
           <Route path="addquiz" component={AddQuiz}/>
           <Route path="quiz" component={Quiz}/>
           <Route path='*' component={Home}/>
        </Route>
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);
