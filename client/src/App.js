import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  Redirect
} from 'react-router-dom';

import withContext from './Context';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import PrivateRoute from './PrivateRoute';
import { Provider } from './Context';

const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const AuthWithContext = withContext(Authenticated);

class App extends Component {
  render() {
      return (
        <Provider>
          <Router>
            <div id="root">
              <div>
                <HeaderWithContext /> 
                
                <Switch>
                  <Redirect exact from='/' to='/courses' />
                  <Route exact path="/courses" component={ Courses } />
                  <PrivateRoute path="/courses/create" component={ CreateCourseWithContext } />
                  <PrivateRoute path='/authenticated' component={ AuthWithContext} />
                  <PrivateRoute path="/courses/:id/update" component={ UpdateCourseWithContext } />
                  <Route path="/courses/:id" component={ CourseDetailWithContext } />
                  <Route path="/signin" component={ UserSignInWithContext} />
                  <Route path="/signup" component={ UserSignUpWithContext } />
                  <Route path="/signout" component={ UserSignOutWithContext } />
                  <Route path="/error" component={ UnhandledError } />
                  <Route path="/forbidden" component={ Forbidden } />
                  <Route component={ NotFound } />
                </Switch>  
              </div>
            </div>
          </Router>
        </Provider>
      )
    }
}

export default App;
