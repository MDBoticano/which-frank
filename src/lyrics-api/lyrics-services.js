/* imports */
import axios from 'axios';

/* consts */
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.musixmatch.com/ws/1.1/";

/**
 * @param {artist} string - name of artists to look for
 * @param {numResults} number - number of artists to retreive
 * @param {setter} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getArtistList = async (artist, numResults, setter, api_key) => {
  const QUERY = `artist.search?q_artist=${artist}&page_size=${numResults}`;
  const API_KEY = `&apikey=${api_key}`;
  
  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;
  const result = await axios(requestURL);
  
  const artistList = result.data.message.body.artist_list;
  const simpleArtistList = artistList.map(artist => (
    { 
      artist_name: artist.artist.artist_name,
      artist_id: artist.artist.artist_id,
    }
  ))
  console.log(simpleArtistList);
  setter(simpleArtistList);
}

/**
 * @param {artist} string - name of artists to look for
 * @param {numResults} number - number of tracks to retreive
 * @param {setter} func - state modifier function to call
 * @param {api_key} string - Musixmatch API key
 */
export const getTopTracks = async (artist, numResults, setter, api_key) => {
  const QUERY = `track.search?q_artist=${artist}`;
  const MODIFIERS = `&page_size=${numResults}&s_track_rating=desc`;
  const API_KEY = `&apikey=${api_key}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${MODIFIERS}${API_KEY}`;
  const result = await axios(requestURL);
  console.log(result);

  const trackList = result.data.message.body.track_list;
  const simplerTrackList = trackList.map(track => (
    {
      track_name: track.track.track_name,
      track_id: track.track.track_id,
      album_name: track.track.album_name,
      album_id: track.track.album_id,
    }
  ))

  console.log(simplerTrackList);
  setter(simplerTrackList);
}