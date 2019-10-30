import React, { useState, useEffect } from 'react';

import axios from 'axios';

/* CONSTS */
const api_key = process.env.REACT_APP_MUSIXMATCH_API_KEY;
const API_KEY = `&apikey=${api_key}`;
const API = "https://api.musixmatch.com/ws/1.1/";

/**
 * CORS PROXY -- we need this to enable cross-origin resources
 */
// public proxy, has limits of 200/hr
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; 

// self-hosted (ran locally) -- clone github.com/Rob--W/cors-anywhere
// const CORS_PROXY = "http://localhost:8080/"; 

const Snippets = () => {
  const [allLyrics, setAllLyrics] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loadMessage, setLoadMessage] = useState('');

  const getArtists = async (name, number) => {
    const QUERY = `artist.search?q_artist=${name}&page_size=${number}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    
    const result = await axios.get(requestURL);
    // console.log('getArtists -- axios.get result:', result);

    const responseBody = result.data.message.body;
    return responseBody;
  }

  const parseArtistsDetails = (responseBody) => {
    const artist_list = responseBody.artist_list;
    const artistNamesAndIds = artist_list.map(entry => ({ 
      artist_name: entry.artist.artist_name,
      artist_id: entry.artist.artist_id,
    }))

    // console.log('parsed artist list:', artistNamesAndIds);
    return artistNamesAndIds;
  }

  /* get one artist's top tracks */
  const getArtistTopTracks = async (artist, number) => {
    const QUERY = `track.search?q_artist=${artist}`;
    const MODIFIERS = `&page_size=${number}&s_track_rating=desc`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${MODIFIERS}${API_KEY}`;
    
    const result = await axios.get(requestURL);
    // console.log('getTopTracks -- axios.get result:', artist, result);

    const responseBody = result.data.message.body;
    return responseBody;
  }

  const parseArtistTopTracks = (responseBody) => {
    const topTracks = responseBody.track_list;
    const topTracksDetails = topTracks.map(entry => {
      return ({
        track_name: entry.track.track_name,
        track_id: entry.track.track_id,
        album_name: entry.track.album_name,
        album_id: entry.track.album_id,
        has_lyrics: entry.track.has_lyrics,
        explicit: entry.track.explicit,
      })
    })
    return topTracksDetails; 
  }

  /* get multiple artist's top tracks */
  const getAllTopTracks = async (artistsList, number) => {
    let allTracks = [];
    for (let i = 0; i < artistsList.length; i++) {
      const artistName = artistsList[i].artist_name;
      const topTracks = await getArtistTopTracks(artistName, number);
      const parsedTopTracks = parseArtistTopTracks(topTracks);
      // console.log(artistName, topTracks);

      allTracks = [...allTracks, ...parsedTopTracks];
      // console.log('adding to allTracks');
    }
    // console.log('done looping');
    return allTracks;
  }

  /* get the snippet for one song */
  const getTrackSnippet = async (trackId) => {
    const QUERY = `track.snippet.get?track_id=${trackId}`;
    const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
    const result = await axios.get(requestURL);
    // console.log('get one trackSnippet -- axios.get result:', result);

    const responseBody = result.data.message.body;
    return responseBody;
  }

  const parseSnippet = (responseBody) => {
    if (responseBody.snippet && responseBody.snippet.snippet_body) {
      const snippet = responseBody.snippet.snippet_body;
      const language = responseBody.snippet.snippet_language;
      return { 
        snippet: snippet,
        snippet_language: language,
      };
    }
    return {
      snippet: null,
      snippet_language: null
    };
  }

  /* get the snippet for multiple songs */
  const getAllTrackSnippets = async (tracks) => {
    let allSnippets = [];
    for (let i = 0; i < tracks.length; i++ ) {
      const currentTrack = tracks[i];
      const trackId = currentTrack.track_id;
      // console.log('track id', trackId);
      const snippetResponse = await getTrackSnippet(trackId);
      const snippet = parseSnippet(snippetResponse);
      // console.log('lyric snippet', snippet);
      allSnippets = [...allSnippets, snippet];
    }
    return allSnippets;
  }

  const initializeAllLyrics = (artistList, numTracks) => {
    let lyricsArray = [];
    for (let i = 0; i < artistList.length; i++) {
      const artist_name = artistList[i].artist_name;
      const artist_id = artistList[i].artist_id;
      for (let j = 0; j < numTracks; j++) {
        lyricsArray = lyricsArray.concat({
          artist_name: artist_name,
          artist_id: artist_id,
          track_name: '',
          track_id: '',
          album_name: '',
          album_id: '',
          has_lyrics: '',
          explicit: '',
        });
      }
    }

    return lyricsArray;
  }

  /**
   * This function assumes a 1d array with all topTracks in one array
   */
  const addTopTracksToAllLyrics = (allLyrics, topTracks) => {
    if (allLyrics.length !== topTracks.length) { return allLyrics }
    for (let i = 0; i < allLyrics.length; i++) {
      allLyrics[i].track_name = topTracks[i].track_name;
      allLyrics[i].track_id = topTracks[i].track_id;
      allLyrics[i].album_name = topTracks[i].album_name;
      allLyrics[i].album_id = topTracks[i].album_id;
      allLyrics[i].has_lyrics = topTracks[i].has_lyrics;
      allLyrics[i].explicit = topTracks[i].explicit;
    }
    return allLyrics;
  }

  /**
   * 
   */
  const addSnippetToAllLyrics = (allLyrics, lyricsList) => {
    for (let i = 0; i < allLyrics.length; i++) {
      allLyrics[i].snippet = lyricsList[i].snippet;
      allLyrics[i].snippet_language = lyricsList[i].snippet_language;
    }
    return allLyrics;
  }

  const filterAllLyrics = (lyrics, name) => {
    let lyricsList = [...lyrics];
    const removeNoLyrics = false; // True: remove null, False: use track name as title
    const removeExplicit = true;
    const removeNonEnglish = true;
    const removeAliasMatches = true;

    if (removeAliasMatches) { 
      const noAliasMatches = lyricsList.filter(lyric => 
        (lyric.artist_name).includes(name)
      )
      lyricsList = noAliasMatches;
      // console.log('filtering out artists with alias matches', lyricsList);
    }

    if (removeNoLyrics) {
      const hasLyrics = lyricsList.filter(lyric => lyric.snippet !== null);
      lyricsList = hasLyrics;
      // console.log('filtering out songs without lyrics', lyricsList);
    } else {
      const titleAsSnips = lyricsList.map(lyric => {
        if (lyric.snippet === null) {
          lyric.snippet = lyric.track_name;
        }
        return lyric;
      })
      return titleAsSnips;
    }

    if (removeExplicit) {
      const noExplicit = lyricsList.filter(lyric => lyric.explicit !== 1);
      lyricsList = noExplicit;
      // console.log('filtering out explicit lyrics', lyricsList);
    }
    
    if (removeNonEnglish) {
      const noNonEng = lyricsList.filter(lyric => lyric.snippet_language === 'en');
      lyricsList = noNonEng;
      // console.log('filtering out non-English lyrics', lyricsList);
    }
    return lyricsList;
  }

  useEffect(() => {
    const startQueries = async () => {
      if (window.confirm('Query?')) {
        setIsFetching(true);

        /**
         * 
         * @param {*} customArtistsList - array of artist string names
         * @param {*} customNumTracks - # of tracks per artists
         * NOTE: To make it work like the old way, you pass in one name in the 
         * array but then you make the amount of artists to get whatever # you
         * want to get. e.g. makeCustomlyrics()
         */
        const makeCustomLyrics = async (customArtistsList, customNumTracks, customNumArtists = 1) => {
          let customLyrics = [];
          let numArtists = -1;
          if (customArtistsList.length === 1) {
            numArtists = customNumArtists;
          } else {
            numArtists = 1;
          }
          for (let i = 0; i <customArtistsList.length; i++ ){
            const customArtistName = customArtistsList[i];

            setLoadMessage(`getting ${customArtistName}'s details...`);
            /* Step 1: get the artist's details */
            const artists = await getArtists(customArtistName, numArtists);
            const parsedArtists = parseArtistsDetails(artists);
            const initialLyricsList = initializeAllLyrics(parsedArtists, customNumTracks);
            // console.log('initial list:', initialLyricsList);
  
            setLoadMessage(`getting ${customArtistName}'s tracks...`);
            /* Step 2: get top tracks per artist */
            const allTopTracks = await getAllTopTracks(parsedArtists, customNumTracks);
            // console.log('allTopTracks result:', allTopTracks);
            const detailedLyricsList = addTopTracksToAllLyrics(initialLyricsList, allTopTracks);
            // console.log('detailed list:', detailedLyricsList);

            setLoadMessage(`getting ${customArtistName}'s track snippets`);
            /* Step 3: get snippets for each track */
            const topTrackSnippets = await getAllTrackSnippets(allTopTracks);
            const completedAllLyrics = addSnippetToAllLyrics(detailedLyricsList, topTrackSnippets);
            // console.log('allLyrics:', completedAllLyrics);
            const filteredAllLyrics = filterAllLyrics(completedAllLyrics, 'Frank');
            // const filteredAllLyrics = completedAllLyrics;
            // console.log('allLyrics filtered:', filteredAllLyrics);

            customLyrics = [...customLyrics, ...filteredAllLyrics];

            setLoadMessage('');
          }
          return customLyrics;
        }

        // const customAllLyrics = await makeCustomLyrics(['Frank'], 1, 5); // Old-school way
        const customAllLyrics = await makeCustomLyrics(['Frank Sinatra', 'Frank Ocean'], 5); // new way
        // Possible new way: makeCustomLyrics(['Frank', 'Bob'], 5, 3) --> 3 Franks, 3 Bobs, each with 5 lyrics
        
        console.log('ALL LYRICS', customAllLyrics);
       
        /* Step 4: set state */
        setAllLyrics(customAllLyrics);
        setIsFetching(false);
      }
    }

    startQueries();
  // eslint-disable-next-line
  }, [])

  const displayAllLyrics = (lyricsList) => {
    return lyricsList.map((lyric, index) => (
      <li key={lyric.track_id}>
        <h3>{index + 1}</h3>
        <p>{lyric.snippet}</p>
        <p>{lyric.track_name}</p>
        <p>{lyric.album_name}</p>
        <p>{lyric.artist_name}</p>
      </li>
    ))
  }

  return (
    <div className="Snippets">
      {/* {console.log('<Snippets /> render')} */}
      <h1>Snippets</h1>
      <h2>All Lyrics</h2>
      { isFetching && 
        <div>
          <p>loading...</p>
          <p>{loadMessage}</p>
        </div>
        }
      <ul>
        {allLyrics && displayAllLyrics(allLyrics)}
      </ul>
    </div>
  )
}

export default Snippets;