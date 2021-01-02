import React, { createContext, useReducer } from 'react';
import { ACTIONS } from '../actions';

export const PortalContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIDE_MENU:
      state = { sideMenu: true };
      return state;
    case ACTIONS.CLOSE_SIDE_MENU:
      state = { sideMenu: false };
      return state;
    default:
      return state;
  }
};

const PortalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    sideMenu: false,
    locationModal: false,
    postModal: false,
  });

  return (
    <PortalContext.Provider value={{ state, dispatch }}>
      {children}
    </PortalContext.Provider>
  );
};

export default PortalContextProvider;
