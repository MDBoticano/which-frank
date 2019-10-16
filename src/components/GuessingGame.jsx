import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GuessButtons from './GuessButtons';
import GuessResult from './GuessResult';

const GuessingGame = ({ 
  activeLyric,
  artistsList,
  setNextLyric,
}) => {
  const [guess, setGuess] = useState('');
  const [scoreArray, setScoreArray] = useState([]);

  const submitGuess = (artist) => {
    setGuess(artist)
  };

  const nextLyric = (lyric) => {
    setGuess('');
    setNextLyric(lyric);
  };

  const addScore = (score) => {
    setScoreArray([...scoreArray, score]);
  };

  return (
    <div className="GuessingGame">
      { guess && 
        <GuessResult 
          guess={guess}
          activeLyric={activeLyric}
          setNextLyric={nextLyric}
          score={scoreArray}
          addScore={addScore}
        /> }
      <GuessButtons artists={artistsList} submitGuess={submitGuess} />
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
  }),
  artistsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNextLyric: PropTypes.func.isRequired,
}

export default GuessingGame;