import React, { createContext, useReducer } from 'react';
import { ACTIONS } from '../actions';

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
      case ACTIONS.USER_LOADING:
          return state = {
              ...state,
              isLoading: true
          }
      // eslint-disable-next-line no-fallthrough
      case ACTIONS.USER_LOADED:
          return state = {
              ...state,
              isAuthenticated: true,
              isLoading: false,
              user: action.payload
          }
      // eslint-disable-next-line no-fallthrough
      case ACTIONS.AUTH_SUCCESS:
          // setLocalStorage(action.payload)
          return state = {
              ...state,
              ...action.payload,
              isAuthenticated: true,
              isLoading: false,
              user: action.payload
          }
      // eslint-disable-next-line no-fallthrough
      case ACTIONS.AUTH_ERROR:
      case ACTIONS.LOGOUT:
          return state = {
              ...state,
              token: null,
              user: null,
              isAuthenticated: false,
              isLoading: false
          }
      // eslint-disable-next-line no-fallthrough
      default:
          return state
  }
}

const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      isLoading: false,
      user: null
  });

  return (
      <AuthContext.Provider value={{ state, dispatch }}>
          {children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;
