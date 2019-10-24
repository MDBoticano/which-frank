/* imports */
import axios from 'axios';

/* consts */
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.musixmatch.com/ws/1.1/";

/**
 * @param {name} string - name of artists to look for
 * @param {setter} func - state modifier function to call
 * @param {numResults} number - number of artists to retreive
 * @return [ { artistNmame: string, artistId: number }, ... ]
 */
export const getArtistList = async (name, numResults, setter, api_key) => {
  const QUERY = `artist.search?q_artist=${name}&page_size=${numResults}`;
  const API_KEY = `&apikey=${api_key}`;

  const requestURL = `${CORS_PROXY}${API}${QUERY}${API_KEY}`;

  const result = await axios(requestURL);
  
  const artistList = result.data.message.body.artist_list;
  // console.log(artistList);
  const simpleArtistList = artistList.map(artist => (
    { 
      artistName: artist.artist.artist_name,
      artistId: artist.artist.artist_id,
    }
  ))
  console.log(simpleArtistList);
  setter(simpleArtistList);
}

/**
 * 
 */