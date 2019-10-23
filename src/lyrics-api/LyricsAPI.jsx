import React from 'react';
import { 
  getArtistIdOf
} from './lyrics-services';

const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.REACT_APP_MUSIXMATCH_KEY;
console.log(process.env.NODE_ENV);
console.log(API_KEY);

const LyricsAPI = (props) => {


  return (
    <div className="LyricsAPI">
      <p>Lyrics. Yeah!</p>
      <ul>
        <li>
          {getArtistIdOf("Frank Ocecan")}
        </li>
      </ul>
      <button type="button" onClick={() => props.setPage('home')}>
        Home
      </button>
    </div>
  )
}

export default LyricsAPI;