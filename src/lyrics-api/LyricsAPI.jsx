import React, { useState, useEffect } from 'react';
// import { 
  // getArtistIdOf,
  // artistSearch,
// } from './lyrics-services';

import axios from 'axios';

const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;
console.log(process.env.NODE_ENV);
console.log(API_KEY);



const LyricsAPI = (props) => {
  const [artistsData, setArtistsData] = useState({ artist_list: [ ] });
  // const [loading ,setLoading] = useState(false);

  // const getArtist = (artist, num = 3) => {
  //   const result = artistSearch(artist, num, API_KEY);
  //   return result;
  // }

  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const API = "https://api.musixmatch.com/ws/1.1/";
  // const QUERY = `artist.search?q_artist=${artist}&page_size=${num}`;
  const QUERY = `artist.search?q_artist=frank&page_size=3`;
  const API_KEY_PARAM = `&apikey=${API_KEY}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY_PARAM}`;

  useEffect(() => {
    const fetchArtists = async () => {
      const result = await axios(requestURL);
      // setArtistsData(result.data);
      setArtistsData(result.data.message.body)
    }
    if (window.confirm('Query?')) {
      fetchArtists();
    }    
  }, [requestURL]);

 

  return (
    <div className="LyricsAPI">
      <p>Lyrics. Yeah!</p>
      <p>Query Result:</p>
      {/* {displayArtists(artistsData)} */}
      {/* {displayLoading(loading)} */}
      <ul>
        {artistsData.artist_list.map(artist => (
          <li key={artist.artist.artist_id}>
            {artist.artist.artist_name}
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