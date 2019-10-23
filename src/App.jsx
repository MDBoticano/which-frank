import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* data imported, since no backend */
import FrankLyrics from './data/FrankLyrics';
// import FrankLyrics from './data/ShortLyrics'; // 2 lyrics: 1 Sinatra, 1 Ocean


/* for lyrics API testing */
import LyricsAPI from './lyrics-api/LyricsAPI';

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
const Home = (props) => (
  <div className="Home">
    <button type="button" onClick={() => props.setPage('game')}>
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
        <p>{activeLyric.songLyric}</p>
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
/* ------------------ End Pages ------------------ */
/* ----------------------------- End Components ----------------------------- */

const App = () => {
  /* state */
  // const [page, setPage] = useState('loading');
  const [page, setPage] = useState('lyricsAPI');
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
      // setPage('home');
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
              />
            );
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
          case 'lyricsAPI':
            return (
              <LyricsAPI
                setPage={setPage}
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
