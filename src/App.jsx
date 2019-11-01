import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* hard-coded lyrics for when not using API */
import * as JSONLyrics from './data/FrankLyrics' ;
// import FrankLyrics from './data/ShortLyrics'; // 2 lyrics: 1 Sinatra, 1 Ocean

/* for lyrics API testing */
import { makeCustomLyrics } from './utilities/musixmatchAPIFuncs';

/* Helper functions */
import {
  getUniqueValues, shuffleIndices, reorderArray, sumReducer,
} from './utilities/helperFuncs';

/* ------------------------------- Components ------------------------------- */
/* Eventually, these components will become their own set of components */

/* -------------------- Pages -------------------- */
// Loading
const Loading = () => (
  <div className="Loading">
    ...loading
  </div>
);

/* ---------- Page: Home ---------- */
const Home = (props) => {
  if (props.isDisabled) {
    return (
      <div className="Home">
      <button type="button" onClick={() => props.setPage('game')} disabled>
        {'loading...'}
      </button>
    </div>)
  } else {
    return (
      <div className="Home">
      {/* <button type="button" onClick={() => props.setPage('game')} > */}
      <button type="button" onClick={() => props.setPage('APIKeyForm')} >
        {'Let\'s Play!'}
      </button>
    </div>)
  }
};

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
/* -------- End Page: Home -------- */

/* ---------- Page: Game ---------- */
const Game = (props) => {
  /* ----- State: Game ----- */
  const [activeLyric, setActiveLyric] = useState({});
  const [numGuesses, setNumGuesses] = useState(props.score.length);
  /* --- End State: Game --- */

  /* ----- Helpers: Game ----- */
  const addScore = (value) => {
    props.setScore([...props.score, value]);
  };

  const checkGuess = (guess) => {
    if (guess === activeLyric.artist_name) {
      addScore(1);
    } else {
      addScore(0);
    }
    const nextIndex = numGuesses + 1;
    if (nextIndex === props.allLyrics.length) {
      props.setPage('score');
    } else {
      setNumGuesses(nextIndex);
      setActiveLyric(props.allLyrics[nextIndex]);
    }
  };

  const makeGuessButtons = (artistsList) => {
    const artistsButtons = artistsList.map((artist) => (
      <button type="submit" key={artist} onClick={() => checkGuess(artist)}>
        {artist}
      </button>
    ));
    return artistsButtons;
  };
  /* --- End Helpers: Game --- */

  /* ----- Hooks: Game ----- */
  useEffect(() => {
    if (props.allLyrics.length > 0) {
      setActiveLyric(props.allLyrics[0]);
    }
  }, [props.allLyrics]);
  /* --- End Hooks: Game --- */

  return (
    <div className="Game">
      <div className="ActiveLyric">
        <p>{`Lyric ${numGuesses + 1} of ${props.allLyrics.length}`}</p>
        <p>{activeLyric.snippet}</p>
      </div>
      {makeGuessButtons(props.allArtists)}
    </div>
  );
};

Game.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
  setScore: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  allLyrics: PropTypes.arrayOf(PropTypes.shape({
    snippet: PropTypes.string.isRequired,
    track_name: PropTypes.string.isRequired,
    artist_name: PropTypes.string.isRequired,
    album_name: PropTypes.string.isRequired,
  })).isRequired,
  allArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
};
/* -------- End Page: Game -------- */

/* ---------- Page: Score ---------- */
const Score = (props) => {
  /* ----- Helpers: Score ----- */
  const reduceScore = (scoreArray) => {
    /* Note: import sumReducer in component */
    const numCorrect = sumReducer(scoreArray);
    const maxCorrect = scoreArray.length;
    return `You scored ${numCorrect} out of ${maxCorrect}`;
  };

  const resetGameAndView = (page) => {
    props.setPage(page);
    props.setScore([]);
    props.reshuffleLyrics();
  };
  /* --- End Helpers: Score --- */

  return (
    <div className="Score">
      <p>{reduceScore(props.score)}</p>
      <button type="button" onClick={() => resetGameAndView('home')}>
        Home
      </button>
      <button type="button" onClick={() => resetGameAndView('game')}>
        Play Again
      </button>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPage: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  reshuffleLyrics: PropTypes.func.isRequired,
};
/* -------- End Page: Score -------- */

/* page: API KEY FORM */
const APIKeyForm = (props) => {
  const [formKeyValue, setFormKeyValue] = useState('');
  const [showPlayOnline, setShowPlayOnline] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.setAPI_KEY(formKeyValue);
    setFormKeyValue('');
    setShowPlayOnline(true);
  }

  const handleChange = (event) => {
    setFormKeyValue(event.target.value);
  }

  const displayPlayOnlineButton = (bool) => {
    if (bool) {
      return (
        <button type="button" onClick={() => props.setPage('game')} disabled>
          loading data from API...
        </button>
      )
    } else {
      return (
        <button type="button" onClick={() => props.setPage('game')}>
          Play Online
        </button>
      )
    }
  }

  return (
    <div className="APIKeyForm">
      <form onSubmit={handleSubmit}>
        <label>
          musixmatch developer API Key
          <input type="text" value={formKeyValue} onChange={handleChange} />
          <input type="submit" value="Set Key" />
        </label>
      </form>
      <button type="button" onClick={()=> props.setPage('game')}>
        Play Offline
      </button>
      {showPlayOnline && displayPlayOnlineButton(props.disablePlayButton)}
    </div>
  )
}



/* end page: API KEY FORM */

/* ------------------ End Pages ------------------ */
/* ----------------------------- End Components ----------------------------- */

const App = () => {
  /* state */
  // const [page, setPage] = useState('loading');
  const [page, setPage] = useState('home');
  const [allLyrics, setAllLyrics] = useState([]);
  const [shuffledLyrics, setShuffledLyrics] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [score, setScore] = useState([]);
  const [disablePlayButton, setDisablePlayButton] = useState(false);
  const [API_KEY, setAPI_KEY] = useState(null)


  // const api_key = process.env.REACT_APP_MUSIXMATCH_API_KEY;
  // const API_KEY = `&apikey=${api_key}`;

  const formatAPI_KEY = (value) => {
    setAPI_KEY(`&apikey=${value}`);
  }

  /* helpers */
  const reshuffleLyrics = () => {
    const shuffledLyricsOrder = shuffleIndices(allLyrics.length);
    const newShuffledLyrics = reorderArray(allLyrics, shuffledLyricsOrder);
    setShuffledLyrics(newShuffledLyrics);
  };

  const useLocalLyrics = () => {
    return 
  }

  /* load lyrics from 'backend' */
  useEffect(() => {
    let FrankLyrics = [];

    const promptCustom = async () => {
      setDisablePlayButton(true);
      if (API_KEY) {
        console.log('using online lyrics');
        FrankLyrics = await makeCustomLyrics(['Frank_Sinatra', 'Frank Ocean'], 1, API_KEY );
      } else {
        FrankLyrics = JSONLyrics.FrankLyrics; // local hard-coded lyrics
      }
     
      const lyricsLength = FrankLyrics.length;
  
      if (lyricsLength > 0) {
        setAllLyrics(FrankLyrics);
  
        // shuffle and set the retrieved lyrics
        const shuffledLyricsOrder = shuffleIndices(lyricsLength);
        const newShuffledLyrics = reorderArray(FrankLyrics, shuffledLyricsOrder);
        setShuffledLyrics(newShuffledLyrics);
  
        // get list of all artists
        const uniqueArtists = getUniqueValues(FrankLyrics, 'artist_name');
        setAllArtists(uniqueArtists);
      }
      setDisablePlayButton(false);
    }

    promptCustom();
  }, [API_KEY]);


  return (
    <div className="App">
      <p>{page}</p>
      {(() => {
        switch (page) {
          case 'loading':
            return (
              <Loading
                setPage={setPage}
              />
            );
          case 'home':
            return (
              <Home
                setPage={setPage}
                isDisabled={disablePlayButton}
              />
            );
          case 'APIKeyForm':
              return (
                <APIKeyForm
                  setAPI_KEY={formatAPI_KEY}
                  setPage={setPage}
                  disablePlayButton={disablePlayButton}
                />
              )
          case 'game':
            return (
              <Game
                setPage={setPage}
                score={score}
                setScore={setScore}
                allLyrics={shuffledLyrics}
                allArtists={allArtists}
              />
            );
          case 'score':
            return (
              <Score
                setPage={setPage}
                score={score}
                setScore={setScore}
                reshuffleLyrics={reshuffleLyrics}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default App;
