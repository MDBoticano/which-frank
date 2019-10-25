import React, { useState, useEffect } from 'react';

import axios from 'axios';

/* CONSTS */
const api_key = process.env.REACT_APP_MUSIXMATCH_API_KEY;
const API_KEY = `&apikey=${api_key}`;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.musixmatch.com/ws/1.1/";


const Snippets = () => {
  const [artistsList, setArtistsList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const getArtists = async (name, number) => {
    const QUERY = `artist.search?q_artist=${name}&page_size=${number}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    
    const result = await axios.get(requestURL);
    console.log('getArtists -- axios.get result:', result);

    const artist_list = result.data.message.body.artist_list;
    const artistsNameAndId = artist_list.map(artist => ({ 
      artist_name: artist.artist.artist_name,
      artist_id: artist.artist.artist_id,
    }))

    console.log('getting artist list:', artistsNameAndId);
    return artistsNameAndId;
  }

  const getArtistTopTracks = async (artist, number) => {
    const QUERY = `track.search?q_artist=${artist}`;
    const MODIFIERS = `&page_size=${number}&s_track_rating=desc`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${MODIFIERS}${API_KEY}`;
    
    const result = await axios.get(requestURL);
    console.log('getTopTracks -- axios.get result:', result);

    const track_list = result.data.message.body.track_list;
    const trackDetails = track_list.map(track => ({
      track_name: track.track.track_name,
      track_id: track.track.track_id,
      album_name: track.track.album_name,
      album_id: track.track.album_id,
    }))

    console.log('getting top tracks:', trackDetails);
    return trackDetails;
  }

  const getAllTopTracks = async (artistsList, number) => {
    let allTracks = [];
    for (let i = 0; i < artistsList.length; i++) {
      const artistName = artistsList[i].artist_name;
      const topTracks = await getArtistTopTracks(artistName, number);
      console.log(artistName, topTracks);

      // allTracks.push(topTracks);
      allTracks = [...allTracks, topTracks];
      console.log('adding to allTracks');
    }
    console.log('done looping');
    return allTracks;
  }


  useEffect(() => {
    const startQueries = async () => {
      if (window.confirm('Query?')) {
        /* Step 1: Get artist(s) */
        const artists = await getArtists('frank', 2);
        console.log('artists result:', artists) // Promise -- nope, not anymore

        /* Step 2: get top tracks per artist */

        // Invididual retrieval -- async okay
        // const topTracks = await getArtistTopTracks('frank sinatra', 2);
        // console.log(topTracks);

        // Multiple retrieval -- not properly async
        const allTopTracks = await getAllTopTracks(artists, 2);
        console.log('allTopTracks result:', allTopTracks);

        // Multiple retrieval but hardcoded - works
        // const allTopTracks = [];
        // for (let i = 0; i < artists.length; i++) {
        //   const artistName = artists[i].artist_name;
        //   const topTracks = await getArtistTopTracks(artistName, 2);
        //   console.log(artistName, topTracks);

        //   allTopTracks.push(topTracks);
        // }
        // console.log('top tracks post loop:', allTopTracks);

        
        
        /* set state */
        setArtistsList(artists);
        setTopTracks(allTopTracks);

      }
    }

    startQueries();
    // eslint-disable-next-line

  }, [])

  const displayTopTracks = (tracksObj) => (
    tracksObj && tracksObj.map(topTracksSet => {
      return topTracksSet.map(track => {
        // console.log(track, track.track_name);
        return <p key={track.track_id}>{track.track_name}</p>
      })
    })
  )

  return (
    <div className="Snippets">
      {console.log('<Snippets /> render')}
      <h1>Snippets</h1>
      <h2>Artists</h2>
      <ul>
        {artistsList && artistsList.map( a => 
          <li key={a.artist_id}>{a.artist_name}</li>
        )}
      </ul>
      <h2>Top Tracks</h2>
      <ul>
        {topTracks && displayTopTracks(topTracks)}
      </ul>
    </div>
  )
}

export default Snippets;