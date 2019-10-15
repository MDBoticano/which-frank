import React, { useState, useEffect } from 'react';

/* data imported, since no backend */
import FrankLyrics from './data/FrankLyrics';

/* Helper functions */
import { getUniqueValues, shuffleIndices } from './utilities/helperFuncs';

/* Components */
import GuessForm from './components/GuessForm';

const App = () => {
  /* App component state */
  const [allLyrics, setAllLyrics] = useState([]);
  const [activeLyric, setActiveLyric] = useState(null);
  const [lyricsOrder, setLyricsOrder] = useState([]);
  const [scoreArray, setScoreArray] = useState([]);
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  /* Set initial state once data has loaded */
  useEffect(() => {
    const lyricsLength = FrankLyrics.length;
    if (lyricsLength > 0) {
      /* Set the allLyrics' state to the imported lyrics */
      setAllLyrics(FrankLyrics);

      /* Generate an order for the lyrics to appear in */
      const shuffledOrder = shuffleIndices(lyricsLength);
      setLyricsOrder(shuffledOrder);

      /* Load a random lyric */
      const firstLyricIndex = shuffledOrder[0];
      const firstLyric = FrankLyrics[firstLyricIndex];
      setActiveLyric(firstLyric);

      /* get all unique artists */
      const uniqueArtistsArray = getUniqueValues(FrankLyrics, 'artistName');
      setUniqueArtists(uniqueArtistsArray);
    }
  }, []);

  /* App helper functions */
  // get next lyric in the shuffle order
  const setNextActiveLyric = () => {
    // get index of activeLyric's index in allLyrics
    const indexActive = allLyrics.findIndex((lyric) => lyric === activeLyric);
    const indexInOrder = lyricsOrder.indexOf(indexActive);
    const indexNext = lyricsOrder[indexInOrder + 1];

    setActiveLyric(allLyrics[indexNext]);
  };

  const submitGuess = (artist) => {
    if (artist === activeLyric.artistName) {
      setStatusMessage('correct');
      setScoreArray([...scoreArray, 1]);
    } else {
      setStatusMessage('wrong');
      setScoreArray([...scoreArray, 0]);
    }

    setNextActiveLyric();
  };

  return (
    <div className="App">
      {activeLyric && activeLyric.songLyric}
      <div className="status">
        {statusMessage}
      </div>
      <p className="score">
        score:
        {scoreArray.length > 0 && scoreArray.reduce((a, b) => a + b)}
      </p>
      <GuessForm artists={uniqueArtists} submitGuess={submitGuess} />
    </div>
  );
};

export default App;
