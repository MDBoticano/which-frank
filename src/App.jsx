import React, { useState, useEffect } from 'react';

/* data imported, since no backend */
import FrankLyrics from './data/FrankLyrics';

/* Helper functions */
import { getRandomIndex } from './utilities/randomIndex';

/* Components */
import GuessForm from './components/GuessForm'

/**
 * Returns an array of strings of all unique values
 * @param {array} array - array of objects to search
 * @param {string} key - what unique values to get
 */
const getUniqueValues = (array, key) => {
  const uniqueValues = [];
  array.forEach((element) => {
    const keyValue = element[key];
    if (!uniqueValues.includes(keyValue)) {
      uniqueValues.push(keyValue);
    }
  })
  return uniqueValues;
}

const App = () => {
  /* App component state */
  const [allLyrics, setAllLyrics] = useState([]);
  const [activeLyric, setActiveLyric] = useState(null);
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  /* Set initial state once data has loaded */
  useEffect(() => {
    if (FrankLyrics.length > 0) {
      /* Set the allLyrics' state to the imported lyrics */
      setAllLyrics(FrankLyrics);

      /* Load a random lyric */
      const firstLyricIndex = getRandomIndex(FrankLyrics.length);
      const firstLyric = FrankLyrics[firstLyricIndex];
      setActiveLyric(firstLyric);

      /* get all unique artists */
      const uniqueArtistsArray = getUniqueValues(FrankLyrics, "artistName")
      setUniqueArtists(uniqueArtistsArray)
    }
  }, [allLyrics]);

  /* App helper functions */
  const submitGuess = (artist) => {
    if (artist === activeLyric.artistName) {
      setStatusMessage("correct")
    }
    else {
      setStatusMessage("wrong")
    }
  }

  return (
    <div className="App">
      {activeLyric && activeLyric.songLyric}
      <div>
        {statusMessage}
      </div>
      <GuessForm artists={uniqueArtists} submitGuess={submitGuess}/>
    </div>
  );
};

export default App;
