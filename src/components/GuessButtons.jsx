import React from 'react';
import PropTypes from 'prop-types';

const GuessButtons = ({ artists, submitGuess }) => {
  const makeButtons = (artists) => {
    return artists.map((artist) => {
      return (
        <button key={artist} onClick={() => submitGuess(artist)}>
          {artist}
        </button>
      );
    });
  }

  return (
    <div className="user-guess-buttons">
      {makeButtons(artists)}
    </div>
  );
}

GuessButtons.propTypes = {
  artists: PropTypes.array.isRequired,
  submitGuess: PropTypes.func.isRequired,
}

export default GuessButtons;
