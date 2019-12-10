import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

/* Page Components */
import Home from './components/Home';
import Game from './components/Game';
import Score from './components/Score';

/* Utilities */
import { makeCustomLyrics } from './utilities/musixmatchAPIFuncs';

/* Context Provider */
import { DataContextProvider } from './DataContext';

/* Styling */
import './App.scss';




const App = () => {
  const [API_KEY, setAPI_KEY] = useState(null);
  const [score, setScore] = useState(0);
  const [dataType, setDataType] = useState('local'); // local or API/online
  const [artists, setArtists] = useState(['Frank Ocean', 'Frank Sinatra']);
  const [snippets, setSnippets] = useState([]);

  const NUM_SONGS = 1;

  const getAPISnippets = async () => {
    /* if there's an API key, and the game wants the API data ... */
    if (API_KEY && dataType === 'API') {
      const paramAPI = `&apikey=${API_KEY}`;

      const apiSnippets = await makeCustomLyrics(artists, NUM_SONGS, paramAPI);
      setSnippets(apiSnippets);
    }
  }

  /* Retrieve the API key from environment variables */
  useEffect(() => {
    
    setAPI_KEY(process.env.REACT_APP_MUSIXMATCH_API_KEY);
  }, []);

  /* Retrieve music from the API */
  useEffect(() => {
    getAPISnippets();


  }, [API_KEY, dataType, artists]);

  const initialContext = {
    dataType: dataType,
    setDataType: setDataType,
    API_KEY: API_KEY,
    score: score,
    setScore: setScore,
    snippets: snippets,
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
