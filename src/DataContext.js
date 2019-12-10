import React from 'react';

const DataContext = React.createContext({
  dataType: 'local',
  score: 0,
  setScore: () => {},
});

export const DataContextProvider = DataContext.Provider;
export const DataContextConsumer = DataContext.Consumer;
export default DataContext;
