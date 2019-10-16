import React from 'react';
import PropTypes from 'prop-types';

const GuessButtons = ({ artists, submitGuess }) => {
  const makeButtons = (artistsList) => {
    const artistButtons = artistsList.map((artist) => (
      <button type="submit" key={artist} onClick={() => submitGuess(artist)}>
        {artist}
      </button>
    ));
    return artistButtons;
  };

  return (
    <div className="user-guess-buttons">
      {makeButtons(artists)}
    </div>
  );
};

GuessButtons.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitGuess: PropTypes.func.isRequired,
};

export default GuessButtons;
