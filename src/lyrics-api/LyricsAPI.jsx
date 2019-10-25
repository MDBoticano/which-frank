import React, { useState, useEffect } from 'react';
import { 
  getArtistList,
  getTopTracks,
  // getLyricSnippet,
  getMultipleSnippets,
} from './lyrics-services';

const API_KEY = process.env.REACT_APP_MUSIXMATCH_API_KEY;
// console.log(process.env.NODE_ENV);
// console.log(API_KEY);

const LyricsAPI = (props) => {
  console.log('<LyricsAPI/> remount');

  const [artistsData, setArtistsData] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [lyricSnippets, setLyricSnippets] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [lyricsLoading, setLyricsLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = () => {
      getArtistList('frank ocean', 1, setArtistsData, API_KEY);
    }

    const fetchTopTracks = () => {
      getTopTracks('frank ocean', 2, setArtistSongs, API_KEY);
    }

    // const fetchLyric = (trackId) => {
    //   getLyricSnippet( trackId, addSnippet, API_KEY);
    // }    

    if (window.confirm('Query?')) {
      fetchArtists();
      fetchTopTracks();
      // fetchLyric('186133518');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const addSnippet = (snippet) => {
      console.log('adding snippet');
      // setLyricSnippets([...lyricSnippets, snippet]);
      const newSnippets = lyricSnippets;
      newSnippets.push(snippet)
      setLyricSnippets(newSnippets);
    }

    const fetchMultipleSnippets = (tracks) => {
      console.log('tracks', tracks);
      getMultipleSnippets(tracks, addSnippet, API_KEY);
    }

    if (artistsData.length > 0) {
      console.log('artist exists');
      setLyricsLoading(true);
      fetchMultipleSnippets(artistSongs);
      setLyricsLoading(false);
    }
  }, [artistSongs, lyricSnippets, artistsData]);

  const displayLoading = (isLoading) => {
    if (isLoading) { return <p>loading...</p> }
  }

  const lyricsAreLoading = (isLoading) => {
    if (isLoading) { return <p>lyric snippets are loading..</p>}
  }

  return (
    <div className="LyricsAPI">
      {console.log('<LyricsAPI/> rerender')}
      <p>Lyrics. Yeah!</p>
      <p>Query Result:</p>
      {displayLoading(loading)}
      <ul>
        {artistsData.map(artist => (
          <li key={artist.artist_id}>
            {artist.artist_name} -- {artist.artist_id}
          </li>
        ))}
        <ul>
        {artistSongs.map(song => (
          <li key={song.track_id}>
            <p>{song.track_name} -- {song.album_name}</p>
          </li>
        ))}
      </ul>
      </ul>
      <ul>
        Lyric Snippets
        { lyricSnippets.map(snip => {
          console.log('snippet to list', snip)
          return (<li key={snip}> <p>{snip}</p> </li>)
          })
        }
        {lyricsAreLoading(lyricsLoading)}
      </ul>
      <button type="button" onClick={() => props.setPage('home')}>
        Home
      </button>
    </div>
  );
}

export default LyricsAPI;