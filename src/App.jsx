import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* data imported, since no backend */
import FrankLyrics from './data/FrankLyrics';
// import FrankLyrics from './data/ShortLyrics'; // 2 lyrics: 1 Sinatra, 1 Ocean

/* Helper functions */
// import { getUniqueValues, shuffleIndices } from './utilities/helperFuncs';
import {
  getUniqueValues, shuffleIndices, reorderArray, sumReducer,
} from './utilities/helperFuncs';

/* ------------------------------- Components ------------------------------- */
/* Eventually, these components will become their own set of components */

/* -------------------- Pages -------------------- */
// CONSTs
const LOADING = 'loading';
const HOME = 'home';
const GAME = 'game';
const SCORE = 'score';

// Loading
const Loading = () => (
  <div className="Loading">
    ...loading
  </div>
);

/* ---------- Page: Home ---------- */
const Home = (props) => (
  <div className="Home">
    <p>Home</p>
    <button type="button" onClick={() => props.setPage(GAME)}>
      {'Let\'s Play!'}
    </button>
  </div>
);

Home.propTypes = {
  setPage: PropTypes.func.isRequired,
};
/* -------- End Page: Home -------- */

/* ---------- Page: Game ---------- */
const Game = (props) => {
  /* ----- State: Game ----- */
  const [activeLyric, setActiveLyric] = useState({});
  const [numGuesses, setNumGuesses] = useState(props.score.length);
  const [showScorePrompt, setShowScorePrompt] = useState(false);
  /* --- End State: Game --- */

  /* ----- Helpers: Game ----- */
  const addScore = (value) => {
    props.setScore([...props.score, value]);
  };

  const checkGuess = (guess) => {
    if (guess === activeLyric.artistName) {
      addScore(1);
    } else {
      addScore(0);
    }
    const nextIndex = numGuesses + 1;
    if (nextIndex === props.allLyrics.length) {
      setShowScorePrompt(true);
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

  const viewScorePage = () => {
    props.setPage(SCORE);
    setShowScorePrompt(false);
  };
  /* --- End Helpers: Game --- */

  /* ----- Hooks: Game ----- */
  useEffect(() => {
    if (props.allLyrics.length > 0) {
      setActiveLyric(props.allLyrics[0]);
    }
  }, [props.allLyrics]);
  /* --- End Hooks: Game --- */

  if (showScorePrompt) {
    return (
      <div className="Game">
        <p>All Done!</p>
        <button type="button" onClick={() => viewScorePage()}>
          View Score
        </button>
      </div>
    );
  }

  return (
    <div className="Game">
      <p>Game</p>
      <div className="ActiveLyric">
        Lyric:
        {activeLyric.songLyric}
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
    songLyric: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    albumReleaseDate: PropTypes.string.isRequired,
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
    return `You score ${numCorrect} out of ${maxCorrect}`;
  };

  const resetGameAndView = (page) => {
    props.setPage(page);
    props.setScore([]);
    props.reshuffleLyrics();
  };
  /* --- End Helpers: Score --- */

  return (
    <div className="Score">
      <p>
        Score:
        {reduceScore(props.score)}
      </p>
      <button type="button" onClick={() => resetGameAndView(HOME)}>
        Home
      </button>
      <button type="button" onClick={() => resetGameAndView(GAME)}>
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
/* ------------------ End Pages ------------------ */
/* ----------------------------- End Components ----------------------------- */

const App = () => {
  /* state */
  const [page, setPage] = useState(LOADING);
  const [allLyrics, setAllLyrics] = useState([]);
  const [shuffledLyrics, setShuffledLyrics] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [score, setScore] = useState([]);

  /* helpers */
  const reshuffleLyrics = () => {
    const shuffledLyricsOrder = shuffleIndices(allLyrics.length);
    const newShuffledLyrics = reorderArray(FrankLyrics, shuffledLyricsOrder);
    setShuffledLyrics(newShuffledLyrics);
  };

  /* load lyrics from 'backend' */
  useEffect(() => {
    const lyricsLength = FrankLyrics.length;
    if (lyricsLength > 0) {
      setPage(HOME);

      setAllLyrics(FrankLyrics);

      // shuffle and set the retrieved lyrics
      const shuffledLyricsOrder = shuffleIndices(lyricsLength);
      const newShuffledLyrics = reorderArray(FrankLyrics, shuffledLyricsOrder);
      setShuffledLyrics(newShuffledLyrics);

      // get list of all artists
      const uniqueArtists = getUniqueValues(FrankLyrics, 'artistName');
      setAllArtists(uniqueArtists);
    }
  }, []);


  return (
    <div className="App">
      {(() => {
        switch (page) {
          case LOADING:
            return (
              <Loading
                setPage={setPage}
              />
            );
          case HOME:
            return (
              <Home
                setPage={setPage}
              />
            );
          case GAME:
            return (
              <Game
                setPage={setPage}
                score={score}
                setScore={setScore}
                // allLyrics={allLyrics}
                allLyrics={shuffledLyrics}
                allArtists={allArtists}
              />
            );
          case SCORE:
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
