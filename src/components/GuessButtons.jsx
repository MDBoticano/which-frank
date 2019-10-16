import React from 'react';
import PropTypes from 'prop-types';

const GuessButtons = ({ result, artists, submitGuess }) => {
  const makeButtons = (artistsList) => {
    const artistButtons = artistsList.map((artist) => (
      <button type="submit" key={artist} onClick={() => submitGuess(artist)}>
        {artist}
      </button>
    ));
    return artistButtons;
  };

  if (result !== '') {
    return null;
  }

  return (
    <div className="user-guess-buttons">
      {makeButtons(artists)}
    </div>
  );
};

GuessButtons.propTypes = {
  result: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitGuess: PropTypes.func.isRequired,
};

export default GuessButtons;
