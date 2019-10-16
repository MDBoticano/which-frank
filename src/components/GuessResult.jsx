import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const GuessResult = ({ guess, activeLyric, setNextLyric, score, addScore }) => {
  const [statusMessage, setStatusMessage] = useState('');

  const checkResult = (guess) => {
      if (guess === '') {
        return 
      }
      else if (guess === activeLyric.artistName) {
      setStatusMessage('correct');
      // setScoreArray([...scoreArray, 1]);
      addScore(1);
    } else {
      setStatusMessage('wrong');
      // setScoreArray([...scoreArray, 0]);
      addScore(0);
    }
  }
 
  // useEffect(() => {
  //   checkResult(guess)
  // }, [guess, checkResult]);
  useCallback(checkResult(guess), [guess]);

  if (guess === '') {
    return null
  };

  return (
    <div className="GuessResult">
      {statusMessage}
      <p className="score">
          score:
          {/* {scoreArray.length > 0 && scoreArray.reduce((a, b) => a + b)} */}
          {score.length > 0 && score.reduce((a, b) => a + b)}
      </p>
      <button type="button" onClick={() => setNextLyric(activeLyric)}>
        Next Lyric
      </button>
    </div>
  );
};

GuessResult.propTypes = {
  guess: PropTypes.string.isRequired,
  activeLyric: PropTypes.shape({
    songLyric: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    albumReleaseDate: PropTypes.string.isRequired,
  }),
}

export default GuessResult;