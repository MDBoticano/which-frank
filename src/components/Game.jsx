import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

/* context */
import DataContext from '../DataContext';

/* utilities */
import { getUniqueValues, shuffleIndices} from '../utilities/helperFuncs';

const Game = () => {
  const dataContext = useContext(DataContext);
  const snippets = dataContext.snippets;
  const numSnippets = snippets.length;
  /* Instead of using context artist values, use artist names frm snippets
   * This is because the query may not match the spelling used in the API
   */ 
  const artists = getUniqueValues(snippets, 'artist_name');

  const [gameScore, setGameScore] = useState(0);
  const [snipIndex, setSnipIndex] = useState(0);
  const [snipOrder, setSnipOrder] = useState([]);

  useEffect(() => {
    console.log('<Game />: creating snippet order');
    const newOrder = shuffleIndices(numSnippets);
    console.log('<Game />: new order --', newOrder);

    setSnipOrder(newOrder);
  }, [snippets, numSnippets]);

  const submitGuess = (guess) => {
    const currentArtist = snippets[snipOrder[snipIndex]].artist_name;
    if (guess === currentArtist) {
      setGameScore(gameScore + 1);
    }
    setSnipIndex(snipIndex + 1);
  }

  const makeGuessButtons = (artists) => {
    const buttons = artists.map((artist) => {
      return (
        <button key={artist} onClick={() => submitGuess(artist)}>
          {artist}
        </button>
      );
    });
    return buttons;
  }

  const displaySnippet = (snip) => {
    return (
      <div className="snippet">
        <p>{snip.snippet}</p>
        {makeGuessButtons(artists)}
      </div>
    );
  }

  const displayScorePrompt = () => {
    return (
      <div className="score-prompt">
        <p>That's all of them!</p>
        <Link to="/score">
        <button onClick={() => dataContext.setScore(gameScore)}>
          View Score
        </button>
      </Link>
      </div>
    );
  }

  return (
    <div className="game">
      {console.log('<Game/> is rendered')}

      <h1>GAME</h1>
      <h4>score: {gameScore}</h4>

      { 
        snipIndex < numSnippets && snipOrder.length > 0 &&
        displaySnippet(snippets[snipOrder[snipIndex]])
      }
      {snipIndex >= numSnippets && displayScorePrompt()}
    </div>
  );
}

export default Game;
