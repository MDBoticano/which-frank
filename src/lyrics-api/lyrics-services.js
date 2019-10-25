/* imports */
import axios from 'axios';

/* consts */
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.musixmatch.com/ws/1.1/";

/**
 * @param {artist} string - name of artists to look for
 * @param {numResults} number - number of artists to retreive
 * @param {callback} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getArtistList = async (artist, numResults, callback, api_key) => {
  const QUERY = `artist.search?q_artist=${artist}&page_size=${numResults}`;
  const API_KEY = `&apikey=${api_key}`;
  
  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
  const result = await axios.get(requestURL);
  
  const artistList = result.data.message.body.artist_list;
  const simpleArtistList = artistList.map(artist => (
    { 
      artist_name: artist.artist.artist_name,
      artist_id: artist.artist.artist_id,
    }
  ))
  console.log('getting artist list:', simpleArtistList);
  callback(simpleArtistList);
}

/**
 * @param {artist} string - name of artists to look for
 * @param {numResults} number - number of tracks to retreive
 * @param {callback} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getTopTracks = async (artist, numResults, callback, api_key) => {
  const QUERY = `track.search?q_artist=${artist}`;
  const MODIFIERS = `&page_size=${numResults}&s_track_rating=desc`;
  const API_KEY = `&apikey=${api_key}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${MODIFIERS}${API_KEY}`;
  const result = await axios.get(requestURL);
  // console.log(result);

  const trackList = result.data.message.body.track_list;
  const simplerTrackList = trackList.map(track => (
    {
      track_name: track.track.track_name,
      track_id: track.track.track_id,
      album_name: track.track.album_name,
      album_id: track.track.album_id,
    }
  ))

  console.log('getting top tracks:', simplerTrackList);
  callback(simplerTrackList);
}

/**
 * @param {trackId} string - which track to get a snippet for
 * @param {callback} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getLyricSnippet = async (trackId, callback, api_key) => {
  const QUERY = `track.snippet.get?track_id=${trackId}`;
  const API_KEY = `&apikey=${api_key}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
  const result = await axios.get(requestURL);
  console.log(result);

  const snippet = result.data.message.body.snippet;
  const simplerSnippet = snippet.snippet_body;
  console.log('snippet', simplerSnippet);
  // return simplerSnippet;
  await callback(simplerSnippet); // FIXME: does this need to be await?
  console.log('snippet added');
}

/**
 * @param {tracks} array - track Ids to get snippets for
 * @param {callback} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getMultipleSnippets = async (tracks, callback, api_key) => {
  const trackIdsArray = tracks.map(track => track.track_id);
  trackIdsArray.forEach((trackId) => {
    console.log('getting snippet for', trackId);
    if (trackId === undefined) {
      return
    }
    getLyricSnippet(trackId, callback, api_key);
  })
}

// -------------------------------------------------------------------------- //
/**
 * @param {trackId} string - which track to get a snippet for
 * @param {api_key} string - Musixmatch API key
 */
export const returnLyricSnippet = async (trackId, api_key) => {
  const QUERY = `track.snippet.get?track_id=${trackId}`;
  const API_KEY = `&apikey=${api_key}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
  const result = await axios.get(requestURL);
  console.log('snippet:', result);

  const snippet = result.data.message.body.snippet;
  const simplerSnippet = snippet.snippet_body;
  console.log('snippet', simplerSnippet);
  return simplerSnippet;
}

export const setMultipleSnippets = async (tracks, callback, api_key) => {
  let snippetsToAdd = [];

  const trackIdsArray = tracks.map(track => track.track_id);
  trackIdsArray.forEach(async (trackId) => {
    console.log('getting snippet for', trackId);
    if (trackId === undefined) {
      return
    }
    const snippet = await returnLyricSnippet(trackId, api_key)
    snippetsToAdd.push(snippet)
    // snippetsToAdd = [...snippetsToAdd, snippet];
  })
  await callback(snippetsToAdd);
  console.log('snippetsToAdd:', snippetsToAdd, snippetsToAdd.length);
}