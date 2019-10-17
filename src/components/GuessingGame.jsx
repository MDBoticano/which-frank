import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GuessButtons from './GuessButtons';
import GuessResult from './GuessResult';
import LyricDetails from './LyricDetails';

const GuessingGame = ({ activeLyric, artistsList, setNextLyric }) => {
  const [result, setResult] = useState('');
  const [scoreArray, setScoreArray] = useState([]);

  const nextLyric = () => {
    setResult('');
    setNextLyric();
  };

  const addScore = (score) => { setScoreArray([...scoreArray, score]); };

  const submitGuess = (guess) => {
    if (guess === activeLyric.artistName) {
      setResult('correct');
      addScore(1);
    } else {
      setResult('wrong');
    }
  };

  const sumReducer = (arr) => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((a, b) => a + b);
    return sum;
  };

  if (!activeLyric) {
    return null;
  }

  return (
    <div className="GuessingGame">
      <p>
        {activeLyric.songLyric}
      </p>
      <LyricDetails result={result} activeLyric={activeLyric} />
      <GuessResult
        result={result}
        getNextLyric={nextLyric}
        score={sumReducer(scoreArray)}
      />
      <GuessButtons
        result={result}
        artists={artistsList}
        submitGuess={submitGuess}
      />
    </div>
  );
};

GuessingGame.propTypes = {
  activeLyric: PropTypes.shape({
    songLyric: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    albumReleaseDate: PropTypes.string.isRequired,
  }).isRequired,
  artistsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNextLyric: PropTypes.func.isRequired,
};

export default GuessingGame;
