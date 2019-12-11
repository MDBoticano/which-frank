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
    ['A$AP Rocky', 'Travis Scott'],
  ];

  const toggleDataOrigin = () => {
    if (dataOrigin === 'local') {
      dataContext.setDataOrigin('API');
    }
    else if (dataOrigin === 'API'){
      dataContext.setDataOrigin('local');

      /* since disabling API will only allow local lyrics, change the artists */
      setArtists(['Frank Ocean', 'Frank Sinatra']);
    }
  }

  const createButtonLabel = (artists) => {
    let buttonLabel = '';
    artists.forEach((artist, index) => {
      buttonLabel += artist;
      if (index < numArtists - 1) {
        buttonLabel += ' vs. '
      };
    });

    return buttonLabel;
  };

  const createPairings = (pairingList) => {
    const pairButtons = pairingList.map((pair, index) => {
      if (dataOrigin === 'local') {
        return (
          <li key={index}>
            <button onClick={()=> setArtists(pair)} disabled>
              {createButtonLabel(pair)}
            </button>
          </li>
        );
      }
      else {
        return (
          <li key={index}>
            <button onClick={()=> setArtists(pair)}>
              {createButtonLabel(pair)}
            </button>
          </li>
        );
      }
    });

    return (<ul className="pairing-options__list">{pairButtons}</ul>);
  }

  const showPlay = (enabled) => {
    if (enabled) {
      return (
        <Link to="/game">
          <button>
            {createButtonLabel(artists)}
          </button>
        </Link>
      );
    } else {
      return (
        <div>loading...</div>
      );
    }
  }

  return (
    <div className="home">
    {console.log('<Home/> is rendered')}

      <h1>HOME</h1>
      <button onClick={() => toggleDataOrigin()}>
        data origin: {dataContext.dataOrigin}
      </button>


      <h3>Change Artists</h3>
      {createPairings(artistPairings)}

      <h2>Play</h2>
      {showPlay(enablePlay)}
    </div>
  );
}

export default Home;
