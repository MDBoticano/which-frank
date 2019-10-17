import React from 'react';
import PropTypes from 'prop-types';

const LyricDetails = React.memo(({ result, activeLyric }) => {
  if (result === '') {
    return null;
  }

  return (
    <div className="LyricDetails">
      <p className="lyric-songName">
        {activeLyric.songName}
      </p>
      <p className="lyric-artistName">
        {activeLyric.artistName}
      </p>
      <p className="lyric-albumName">
        {activeLyric.albumName}
        &nbsp;
        {`(${activeLyric.albumReleaseDate})`}
      </p>
    </div>
  );
});

LyricDetails.propTypes = {
  result: PropTypes.string.isRequired,
  activeLyric: PropTypes.shape({
    songLyric: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    albumReleaseDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default LyricDetails;
