import React from 'react';
import PropTypes from 'prop-types';

const GuessResult = React.memo(({ result, getNextLyric, score }) => {
  if (result === '') return null;

  return (
    <div className="GuessResult">
      You were
      {result}
      <p className="score">
        score:
        {score}
      </p>
      <button type="button" onClick={() => getNextLyric()}>
        Next Lyric
      </button>
    </div>
  );
});

GuessResult.propTypes = {
  result: PropTypes.string.isRequired,
  getNextLyric: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default GuessResult;
