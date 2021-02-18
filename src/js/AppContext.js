import React from 'react';

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

const useAppStateContext = () => React.useContext(AppStateContext);
const useAppStateDispatchContext = () => React.useContext(AppDispatchContext);

export {
  useAppStateContext,
  AppStateContext,
  useAppStateDispatchContext,
  AppDispatchContext,
};
