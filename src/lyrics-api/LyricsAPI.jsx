import React, { useState, useEffect } from 'react';
import { 
  getArtistIdOf,
  artistSearch,
} from './lyrics-services';

const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;
console.log(process.env.NODE_ENV);
console.log(API_KEY);

const getArtist = (artist) => {
  const result = artistSearch(artist, 3, API_KEY);
  return result;
}

const LyricsAPI = (props) => {
  const [res, setRes] = useState([]);
  useEffect(() => {
    const getData = () => {
      if (window.confirm("Make request")) {
        const data = getArtist('frank');
        return data;
      }
    };

    const data = getData();

    setRes(data);
  }, []);

  const displayArtists = (artistsList) => {
    try {
      console.log('making artist list');
      return (
        <ul>
          {
            artistsList.map(artist => { return (
              <li key={artist.artistId}>
                {artist.artistName}
              </li>
            )})
          }
        </ul>
      );
    } catch (e) {
      console.log('displayArtists error');
      console.log(e);
      return []
    }
  }

  return (
    <div className="LyricsAPI">
      <p>Lyrics. Yeah!</p>
      <p>Query Result:</p>
      {displayArtists(res)}
      <ul>
        <li>
          {getArtistIdOf("Frank Ocecan")}
        </li>
      </ul>
      <button type="button" onClick={() => props.setPage('home')}>
        Home
      </button>
    </div>
  );
}

export default LyricsAPI;