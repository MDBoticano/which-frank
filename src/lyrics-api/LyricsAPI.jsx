import React, { useState, useEffect } from 'react';
import { 
  getArtistList,
  getTopTracks,
} from './lyrics-services';

const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;
// console.log(process.env.NODE_ENV);
// console.log(API_KEY);

const LyricsAPI = (props) => {
  const [artistsData, setArtistsData] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = () => {
      getArtistList('frank ocean', 1, setArtistsData, API_KEY);
    }

    const fetchTopTracks = () => {
      getTopTracks('frank ocean', 5, setArtistSongs, API_KEY);
    }

    if (window.confirm('Query?')) {
      fetchArtists();
      fetchTopTracks();
    }

    setLoading(false);
  }, []);

  const displayLoading = (isLoading) => {
    if (isLoading) { return <p>loading...</p> }
  }  

  return (
    <div className="LyricsAPI">
      <p>Lyrics. Yeah!</p>
      <p>Query Result:</p>
      {displayLoading(loading)}
      <ul>
        {artistsData.map(artist => (
          <li key={artist.artist_id}>
            {artist.artist_name} -- {artist.artist_id}
          </li>
        ))}
      </ul>
      <ul>
        {artistSongs.map(song => (
          <li key={song.track_id}>
            {song.track_name} -- {song.album_name}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => props.setPage('home')}>
        Home
      </button>
    </div>
  );
}

export default LyricsAPI;