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

/* Back up (local) data */
import * as JSONLyrics from './data/FrankLyrics';

/* Styling */
import './App.scss';

const App = () => {
  const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;

  const [score, setScore] = useState(0);
  const [dataOrigin, setDataOrigin] = useState('local');
  const [artists, setArtists] = useState(['Frank Ocean', 'Frank Sinatra']);
  const [snippets, setSnippets] = useState(JSONLyrics.FrankLyrics);
  const [numSongs] = useState(5); // possible setting, hence state
  const [enablePlay, setEnablePlay] = useState(true);


  /* Retrieve music from the API */
  useEffect(() => {
    /**
     * Retrieve snippets depending on existence of API key and source type
     */
    const getAPISnippets = async () => {

      /* Without an API key, only local lyrics are available */
      if (!API_KEY) {
        console.log('getAPISnippets: No API KEY!');
        if (dataOrigin !== 'local') {
          console.log('getAPISnippets: Only local snippets allowed.');
          setDataOrigin('local');
        }
      }

      /* If the data type is local (default), grab offline lyrics */
      if (dataOrigin === 'local') {
        console.log('getAPISnippets: using local lyrics.');
        const apiSnippets = JSONLyrics.FrankLyrics;
        setSnippets(apiSnippets);
      }

      /* if there's an API key, and the game wants the API data ... */
      else if (dataOrigin === 'API') {
        console.log('getAPISnippets: requesting musixmatch snippets...');

        /* use helper function to retreive data */
        setEnablePlay(false);
        // const apiSnippets = await makeCustomLyrics(artists, numSongs, API_KEY);
        const apiSnippets = JSONLyrics.FrankLyrics;

        // If the function fails to retrieve anything, default to local lyrics
        if (apiSnippets.length === 0) {
          console.log('getAPISnippets: API request failed. Using local snippets');
          setDataOrigin('local');
        }

        else {
          console.log('getAPISnippets: API request success.');
          setSnippets(apiSnippets);
        }
        setEnablePlay(true);
      }
    }

    getAPISnippets();
  }, [API_KEY, dataOrigin, artists, numSongs, setEnablePlay]);

  const initialContext = {
    dataOrigin: dataOrigin,
    setDataOrigin: setDataOrigin,
    API_KEY: API_KEY,
    score: score,
    setScore: setScore,
    artists: artists,
    setArtists: setArtists,
    snippets: snippets,
    enablePlay: enablePlay,
  }

  return (
    <DataContextProvider value={initialContext} >
      {console.log('<App/> is rendered')}
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
