import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import DataContext from '../DataContext';

const Home = () => {
  /* Context values */
  const dataContext = useContext(DataContext);
  const dataOrigin = dataContext.dataOrigin;
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
    const pairButtons = pairingList.map((pair, index) => {
      return (
        <li key={index}>
          <button
            onClick={() => setArtists(pair)} className="pairs-list__option"
          >
            {createButtonLabel(pair)}
          </button>
        </li>
      );
    });

    return (<ul className="pairs-list__list">{pairButtons}</ul>);
  }

  return (
    <div className="home">
      {console.log('<Home/> is rendered')}

      <h1 className="home--title">Which Frank?</h1>

      <p className="play-game__prompt">
        How well do you know music?
      </p>
      <p className="play-game__instructions">
        Your objective is simple: figure out who sang the lyric!
      </p>
      <p className="play-game__lyrics-source">With songs by</p>
      <p className="play-game__active-artists">{createButtonLabel(artists)}</p>

      {
        dataOrigin === "API" &&
        <div className="pairs-list">
          <h3 className="pairs-list__title">Change Artists</h3>
          {createPairings(artistPairings)}
        </div>
      }

      <Link to="/game" className="play-game__link">
        <button className="play-game__link-button" disabled={!enablePlay}>
          Play
        </button>
      </Link>
    </div>
  );
}

export default Home;
