import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import DataContext from '../DataContext';

const Home = () => {
  /* Context values */
  const dataContext = useContext(DataContext);
  // const dataOrigin = dataContext.dataOrigin;
  const dataOrigin = 'local';
  const artists = dataContext.artists;
  const numArtists = artists.length;
  const setArtists = dataContext.setArtists;
  const enablePlay = dataContext.enablePlay;

  const artistPairings = [
    ['Frank Ocean', 'Frank Sinatra'],
    ['21 Savage', 'twenty one pilots'],
    ['Jack White', 'Jack Black'],
    ['John Lennon', 'John Legend'],
  ];

  const createButtonLabel = (artists) => {
    let buttonLabel = '';
    artists.forEach((artist, index) => {
      buttonLabel += artist;
      if (index < numArtists - 1) {
        buttonLabel += ' & '
      };
    });

    return buttonLabel;
  };

  const createPairings = (pairingList) => {
    const optionsDisabled = dataOrigin === 'local';

    const pairButtons = pairingList.map((pair, index) => {
      return (
        <li key={index}>
          <button
            onClick={() => setArtists(pair)} 
            className="pairs-list__option"
            disabled={optionsDisabled}
          >
            {createButtonLabel(pair)}
          </button>
        </li>
      );
    });

    if (optionsDisabled) {
      return (
        <ul className="pairs-list__list">
          {pairButtons}
          <div>Musixmatch API disabled. Using default lyrics.</div>
        </ul>
      );
    }
  }

  return (
    <div className="home">
      {console.log('<Home/> is rendered')}

      <h1 className="home--title">Which Frank?</h1>

      <p className="play-game__prompt">
        a lyric guessing game
      </p>

      <div className="pairs-list">
        <div className="pairs-list__title-box">
          <h3 className="pairs-list__title">Guess lyrics from</h3>
        </div>
        {createPairings(artistPairings)}
      </div>

      <Link to="/game" className="play-game__link">
        <button className="play-game__link-button" disabled={!enablePlay}>
          Play
        </button>
      </Link>
    </div>
  );
}

export default Home;
