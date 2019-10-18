import React, { useState, useEffect } from 'react';

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
const Loading = () => {
  return (
    <div className="Loading">
      ...loading
    </div>
  );
};

// Home
const Home = (props) => {
  return (
    <div className="Home">
      Home
      <button type="button" onClick={() => props.setPage(GAME)}>
        Let's Play!
      </button>
    </div>
  );
};

/* ---------- Page: Game ---------- */
const Game = (props) => {
  /* ----- State: Game ----- */
  const [activeLyric, setActiveLyric] = useState({});
  const [numGuesses, setNumGuesses] = useState(props.score.length);
  const [scorePrompt, setScorePrompt] = useState(false);

  /* --- End State: Game --- */

  /* ----- Helpers: Game ----- */
  const addScore = (value) => {
    props.setScore([...props.score, value]);
  };

  const showScorePrompt = () => {
    setScorePrompt(true);
  }

  const makeGuessButtons = (artistsList) => {
    const artistsButtons = artistsList.map((artist) => (
      <button type="submit" key={artist} onClick={() => checkGuess(artist)}>
        {artist}
      </button>
    ));
    return artistsButtons;
  }

  const checkGuess = (guess) => {
    if (guess === activeLyric.artistName) {
      addScore(1);
    } else {
      addScore(0);
    }
    const nextIndex = numGuesses + 1;
    if (nextIndex === props.allLyrics.length) {
      showScorePrompt();
    } else {
      setNumGuesses(nextIndex);
      setActiveLyric(props.allLyrics[nextIndex]);
    }
  }
  /* --- End Helpers: Game --- */

  /* ----- Hooks: Game ----- */
  useEffect(() => {
    if (props.allLyrics.length > 0) {
      setActiveLyric(props.allLyrics[0]);
    } 
  }, [props.allLyrics]);
  /* --- End Hooks: Game --- */

  if (scorePrompt) {
    return (
      <div className="Game">
        All Done!
        <button type="button" onClick={() => props.setPage(SCORE)}>
          View Score
        </button>
      </div>
    )
  }

  return (
    <div className="Game">
      Game
      <div className="ActiveLyric">
        Lyric:
        {activeLyric.songLyric}
      </div>
      {makeGuessButtons(props.allArtists)}
    </div>
  );
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

const resetGame = () => {
  props.setPage(GAME);
  props.setScore([]);
  props.reshuffleLyrics();
}

/* --- End Helpers: Score --- */

  return (
    <div className="Score">
      <p>
        Score:
        {reduceScore(props.score)}
      </p>
      <button type="button" onClick={() => props.setPage(HOME)}>
        Home
      </button>
      <button type="button" onClick={() => resetGame()}>
        Play Again
      </button>
    </div>
  );
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
    // console.log('new order:', shuffledLyricsOrder);
    const newShuffledLyrics = reorderArray(FrankLyrics, shuffledLyricsOrder);
    setShuffledLyrics(newShuffledLyrics);
  }

  /* load lyrics from 'backend' */
  useEffect(() => {
    const lyricsLength = FrankLyrics.length;
    if (lyricsLength > 0) {
      setPage(HOME);

      setAllLyrics(FrankLyrics);

      // shuffle and set the retrieved lyrics
      const shuffledLyricsOrder = shuffleIndices(lyricsLength);
      // console.log('first order:', shuffledLyricsOrder);
      const newShuffledLyrics = reorderArray(FrankLyrics, shuffledLyricsOrder);      
      setShuffledLyrics(newShuffledLyrics);

      // get list of all artists
      const uniqueArtists = getUniqueValues(FrankLyrics, "artistName");
      setAllArtists(uniqueArtists);
    }
  }, []);


  return (
    <div className="App">
      {/* shouldn't use this Nav once routing is set up */}
      {/* <div className="Nav">
        <button type="button" onClick={() => setPage(HOME)}>Home</button>
        <button type="button" onClick={() => setPage(GAME)}>Play</button>
        <button type="button" onClick={() => setPage(SCORE)}>Score</button>
      </div> */}
      {(() => {
        switch(page) {
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
