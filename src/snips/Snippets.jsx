import React, { useState, useEffect } from 'react';

import axios from 'axios';

/* CONSTS */
const api_key = process.env.REACT_APP_MUSIXMATCH_API_KEY;
const API_KEY = `&apikey=${api_key}`;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.musixmatch.com/ws/1.1/";




const Snippets = () => {
  const [artistsList, setArtistsList] = useState([]);

  const getArtists = async (name, number) => {
    const QUERY = `artist.search?q_artist=${name}&page_size=${number}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    const result = await axios.get(requestURL);
    console.log('axios.get result:', result);

    const artistList = result.data.message.body.artist_list;
    const simpleArtistList = artistList.map(artist => (
    { 
      artist_name: artist.artist.artist_name,
      artist_id: artist.artist.artist_id,
    }))

    console.log('getting artist list:', simpleArtistList);
    // setArtistsList(simpleArtistList)
    return simpleArtistList;
  }


  useEffect(() => {

    const startQueries = async () => {
      if (window.confirm('Query?')) {
        const artists = await getArtists('frank', 2)
        console.log(artists) // Promise

        

      }
    }

    startQueries();
   

  }, [])

  return (
    <div className="Snippets">
      <h1>Snippets</h1>
      <h2>Artists</h2>
      <ul>
        { artistsList && artistsList.map( a => 
          <li key={a.artist_id}>{a.artist_name}</li>
        )}
      </ul>
    </div>
  )
}

export default Snippets;