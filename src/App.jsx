import React, { useState, useEffect } from 'react';

/* data imported, since no backend */
import FrankLyrics from './data/FrankLyrics';

/* Helper functions */
import { getUniqueValues, shuffleIndices } from './utilities/helperFuncs';

/* Components */
import LoadingScreen from './components/LoadingScreen';
import GuessingGame from './components/GuessingGame';

const App = () => {
  /* App component state */
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allLyrics, setAllLyrics] = useState([]);
  const [activeLyric, setActiveLyric] = useState(null);
  const [lyricsOrder, setLyricsOrder] = useState([]);
  const [uniqueArtists, setUniqueArtists] = useState([]);

  /* Set initial state once data has loaded */
  useEffect(() => {
    const lyricsLength = FrankLyrics.length;
    if (lyricsLength > 0) {
      /* data is finished loading, prompt to play instead */
      setIsLoading(false);

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
    // FIXME: rename variables to be more descriptive
    const indexActive = allLyrics.findIndex((lyric) => lyric === activeLyric);
    const indexInOrder = lyricsOrder.indexOf(indexActive);

    /* what to do when out of next lyrics? */
    /* for now, immediately start loop over */
    if (indexInOrder + 1 < allLyrics.length ) {
      const indexNext = lyricsOrder[indexInOrder + 1];
      setActiveLyric(allLyrics[indexNext]);
    } else {
      console.log('repeat');

      /* shuffle */
      const newOrder = shuffleIndices(allLyrics.length);
      setLyricsOrder(newOrder);

      /* make the next lyric the first lyric of the new order */
      setActiveLyric(allLyrics[newOrder[0]]);

      /* reset score: unable to from here, have to do in <GuessingGame /> */
    }
  };

  // Show the prompt to play the game or the game itself
  const displayGame = () => {
    if (!isPlaying) {
      return (
        <button
          type="button"
          className="playButton"
          onClick={() => setIsPlaying(true)}
        >
          Play
        </button>
      );
    }

    return (
      <GuessingGame
        activeLyric={activeLyric}
        artistsList={uniqueArtists}
        setNextLyric={setNextActiveLyric}
      />
    );
  };

  return (
    <div className="App">
      <LoadingScreen showComponent={isLoading} />
      {displayGame(isPlaying)}
    </div>
  );
};

export default App;
