/* imports */
import axios from 'axios';

/* consts */
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = `https://api.musixmatch.com/ws/1.1/`;

/* search for a specific number of artists */
/* return format */
export const artistSearch = async (artist, num = 1, api_key) => {
  try {
    const QUERIES = `artist.search?q_artist=${artist}&page_size=${num}`;
    const API_KEY = `&apikey=${api_key}`;
    const completeURL = PROXY_URL + API_URL + QUERIES + API_KEY;

    const result = await axios.get(completeURL);

    const artistList = result.data.message.body.artist_list;
    // console.log('artist list', artistList);

    const artistsData = artistList.map(artist => {
      return ({ 
        artistName: artist.artist.artist_name,
        artistId: artist.artist.artist_id,
      });
    });

    // console.log(artistsData);
    return artistsData;
  } catch (e) {
    console.log('artistSearch error:', e);
  }
  return null;
}


/* search that list for our key targets: Frank Ocean & Frank Sinatra */

/* get artist id */
export const getArtistIdOf = (name) => {


  return "id";
}

/* get discography (albums or popular tracks if possible) */

/* get top x artists */
// const getTopTracksFrom = (artists, numTracks) => {

//   return [];
//   /* return an array of track ids, and maybe track names */

// }


/* get snippet from track id */


/* export */