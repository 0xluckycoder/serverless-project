import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Feed from './Components/Feed';
import Account from './Components/Auth/Account';
import Edit from './Components/Auth/EditPost/Edit';
import CreatePost from './Components/Auth/CreatePost/CreatePost';

import { AuthContext } from './Context/AuthContext';
import { ACTIONS } from './actions';
import { verifyToken } from './api/api';

import { useHistory } from 'react-router-dom';

export default function App() {

  const { dispatch } = useContext(AuthContext);

  let history = useHistory();

  const loadUser = async () => {
    try {
      dispatch({ type: ACTIONS.USER_LOADING });
      const { user } = await verifyToken();

      if (user.confirmed) {
        dispatch({ type: ACTIONS.USER_LOADED, payload: user });
      } else {
        history.push('/ads/confirmed');
      }
      
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