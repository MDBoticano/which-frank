import React, { useState } from 'react';
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
  const [API_KEY] = useState();
  const [score, setScore] = useState(0);

  return (
    <DataContextProvider value={{ API_KEY: API_KEY, score: score, setScore: setScore }} >
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
