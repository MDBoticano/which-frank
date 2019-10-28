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
  const [trackSnippets, setTrackSnippets] = useState([]);
  // const [allLyrics, setAllLyrics] = useState([]);

  const getArtists = async (name, number) => {
    const QUERY = `artist.search?q_artist=${name}&page_size=${number}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    
    const result = await axios.get(requestURL);
    console.log('getArtists -- axios.get result:', result);

    const responseBody = result.data.message.body;
    return responseBody;

    // const artist_list = result.data.message.body.artist_list;
    // const artistsNameAndId = artist_list.map(artist => ({ 
    //   artist_name: artist.artist.artist_name,
    //   artist_id: artist.artist.artist_id,
    // }))

    // console.log('getting artist list:', artistsNameAndId);
    // return artistsNameAndId;
  }

  const parseArtistsDetails = (responseBody) => {
    const artist_list = responseBody.artist_list;
    const artistNamesAndIds = artist_list.map(entry => ({ 
      artist_name: entry.artist.artist_name,
      artist_id: entry.artist.artist_id,
    }))

    console.log('parsed artist list:', artistNamesAndIds);
    return artistNamesAndIds;
  }

  /* get one artist's top tracks */
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

  /* get multiple artist's top tracks */
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

  /* get the snippet for one song */
  const getTrackSnippet = async (trackId) => {
    const QUERY = `track.snippet.get?track_id=${trackId}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    const result = await axios.get(requestURL);
    console.log('get one trackSnippet -- axios.get result:', result);

    const lyricString = result.data.message.body.snippet.snippet_body;
    return lyricString;
  }

  /* get the snippet for multiple songs */
  const getAllTrackSnippets = async (tracks) => {
    let allSnippets = [];
    for (let i = 0; i < tracks.length; i++ ) {
      const trackArray = tracks[i];
      for (let j = 0; j < trackArray.length; j++) {
        const trackId = trackArray[j].track_id;
        console.log('track id', trackId);
        const snippet = await getTrackSnippet(trackId);
        console.log(snippet);
        allSnippets = [...allSnippets, snippet];
      }
    }
    return allSnippets;
  }


  useEffect(() => {
    const startQueries = async () => {
      if (window.confirm('Query?')) {
        // /* Step 1: Get artist(s) */
        // const artists = await getArtists('frank ocean', 1);
        // console.log('artists result:', artists);

        // /* Step 2: get top tracks per artist */
        // const allTopTracks = await getAllTopTracks(artists, 2);
        // console.log('allTopTracks result:', allTopTracks);

        // /* Step 3: get snippets for each track */
        // const topTrackSnippets = await getAllTrackSnippets(allTopTracks);
        // console.log('topTrackSnippets result:', topTrackSnippets);

        // /* Step 4: set state */
        // setArtistsList(artists);
        // setTopTracks(allTopTracks);
        // setTrackSnippets(topTrackSnippets);

        /* With separate parsers */
        // Step 1: Get Artist(s)
        const artists = await getArtists('frank ocean', 1);
        const parsedArtists = parseArtistsDetails(artists);

        /* Step 2: get top tracks per artist */
        const allTopTracks = await getAllTopTracks(parsedArtists, 2);
        console.log('allTopTracks result:', allTopTracks);

        /* Step 3: get snippets for each track */
        const topTrackSnippets = await getAllTrackSnippets(allTopTracks);
        console.log('topTrackSnippets result:', topTrackSnippets);

        /* Step 4: set state */
        setArtistsList(parsedArtists);
        setTopTracks(allTopTracks);
        setTrackSnippets(topTrackSnippets);
        

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

  const displayTrackSnippets = (snippets) => {
    return snippets.map((snip,index) => <li key={index}>{snip}</li>)
  }

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
      <h2>Track Snippets</h2>
      <ul>
        {trackSnippets && displayTrackSnippets(trackSnippets)}
      </ul>
    </div>
  )
}

export default Snippets;