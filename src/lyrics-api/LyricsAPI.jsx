import React, { useState, useEffect } from 'react';
import { 
  getArtistList,
} from './lyrics-services';

const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;
// console.log(process.env.NODE_ENV);
// console.log(API_KEY);



const LyricsAPI = (props) => {
  const [artistsData, setArtistsData] = useState([]);
  // const [artistSongs, setArtistSongs] = useState([]);
  const [loading ,setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      getArtistList('frank ocean', 1, setArtistsData, API_KEY);
    }

    // const fetchTopSongs = async (artists, numSongs) => {
    //   const artist = artists[0].artist.artist_name


    //   /* extract artist names from list */
    //   const QUERY = `track.search?q_artist=${artist}&page_size=${numSongs}&s_track_rating=desc`;
    //   const API_KEY_PARAM = `&apikey=${API_KEY}`;

    //   /* get one artist's songs */ 

    //   /* turn function into a loop */
    
    //   const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY_PARAM}`;

    //   const result = await axios(requestURL);

    //   setArtistSongs(result);
    // }

    if (window.confirm('Query?')) {
      fetchArtists();
      // fetchTopSongs([{
      //   artist: {
      //     artist_name: "Frank Ocean",
      //   }
      // }], 5);
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
      {/* {displayArtists(artistsData)} */}
      {displayLoading(loading)}
      <ul>
        {artistsData.map(artist => (
          <li key={artist.artistId}>
            {artist.artistName} -- {artist.artistId}
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