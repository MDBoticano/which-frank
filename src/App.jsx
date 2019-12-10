import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

/* Page Components */
import Home from './components/Home';
import Game from './components/Game';
import Score from './components/Score';

/* Styling */
import './App.scss';

/* Context Provider */
import { DataContextProvider } from './DataContext';




const App = () => {
  const [API_KEY, setAPI_KEY] = useState(null);
  const [score, setScore] = useState(0);
  const [dataType, setDataType] = useState('local'); // local or API/online

  /* Retrieve the API key from environment variables */
  useEffect(() => {
    setAPI_KEY(process.env.REACT_APP_MUSIXMATCH_API_KEY);
  }, []);

  const initialContext = {
    dataType: dataType,
    setDataType: setDataType,
    API_KEY: API_KEY,
    score: score,
    setScore: setScore,
  }

  return (
    <DataContextProvider value={initialContext} >
      <div className="app">
        <Router>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/game" render={() => <Game />} />
          <Route path="/score" render={() => <Score />} />
        </Router>
      </div>
    </DataContextProvider>
  );
}

export default App;
