import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Feed from './Components/Feed';
import Account from './Components/Auth/Account';
import Edit from './Components/Auth/EditPost/Edit';
import CreatePost from './Components/Auth/CreatePost/CreatePost';

import { AuthContext } from './Context/AuthContext';
import { ACTIONS } from './actions';
import { verifyToken } from './api/api';

export default function App() {

  const { dispatch } = useContext(AuthContext);

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
          <Route path="/account/:id/edit" component={Edit} />
          <Route path="/account" component={Account} />
          <Route path="/create" component={CreatePost} />
        </Switch>
      </BrowserRouter>
    </>
  );
}