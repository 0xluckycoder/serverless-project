import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Feed from './Components/Feed';
// import Login from './Components/Auth/Login';
// import SignUp from './Components/Auth/SignUp';
// import Form from './Components/Form';
// import ThirdStep from './Components/Auth/ThirdStep';
import Account from './Components/Auth/Account';
import Edit from './Components/Auth/EditPost/Edit';

// import { getUser } from './api/api';

/*
import SignUp from './Components/Auth/SignUp';
import Account from './Components/Auth/Account';
import VerifyAccount from './Components/VerifyAccount';
import Location from './Components/LocationModal';
import Edit from './Components/Auth/EditPost/Edit';
import Modal from './Components/Modal';

import NotFound from './Components/NotFound';

import FeedContextProvider from './Context/FeedContext';

*/
import CreatePost from './Components/Auth/CreatePost/CreatePost';


import { AuthContext } from './Context/AuthContext';
import { ACTIONS } from './actions';
import { verifyToken } from './api/api';

export default function App() {

  const { dispatch, state } = useContext(AuthContext);

  // const fetchUser = async () => {
  //   setUserLoading(true);
  //   if (data.error) {
  //     setAuthStatus(false);
  //     setUser(null);
  //     setUserLoading(false);
  //   } else {
  //     setAuthStatus(true);
  //     setUser(data);
  //     setUserLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchUser();
  // }, [])

  const loadUser = async () => {
    try {
      dispatch({ type: ACTIONS.USER_LOADING });
      const data = await verifyToken();
      if (data) {
        dispatch({ type: ACTIONS.USER_LOADED, payload: data });
      }
      console.log('user load success', data);
    } catch(error) {
      if (error) dispatch({ type: ACTIONS.AUTH_ERROR });
      console.log('no auth user', error);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  // most specific routes first then least specific routes

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <><Redirect to="/ads" /></>} />
          <Route path="/ads" component={Feed} />
          {/* <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} /> */}
          {/* <Route path="/form" component={ThirdStep} /> */}
          {/* <Route path="/form" component={Form} /> */}
          <Route path="/account/:id/edit" component={Edit} />
          <Route path="/account" component={Account} />
          <Route path="/create" component={CreatePost} />
          {/* <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>


          <Route path="/create">
            <CreatePost />
          </Route>
          <Route path="/confirm" component={VerifyAccount} />
          <Route path="*">
            <NotFound />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}