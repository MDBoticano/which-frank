import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

/* context */
import DataContext from '../DataContext';

/* utilities */
import { getUniqueValues, getOrderedIndices, shuffleIndices, 
} from '../utilities/helperFuncs';

const Game = () => {
  const dataContext = useContext(DataContext);
  const snippets = dataContext.snippets;
  const numSnippets = snippets.length;
  const defaultOrder = getOrderedIndices(numSnippets);
  
  /* Instead of using context artist values, use artist names frm snippets
  * This is because the query may not match the spelling used in the API
  */ 
 const artists = getUniqueValues(snippets, 'artist_name');
 const numArtists = artists.length;

  const [gameScore, setGameScore] = useState(0);
  const [snipIndex, setSnipIndex] = useState(0);
  const [snipOrder, setSnipOrder] = useState(defaultOrder);

  useEffect(() => {
    console.log('<Game />: creating snippet order');
    const newOrder = shuffleIndices(numSnippets);
    console.log('<Game />: new order --', newOrder);
    setSnipOrder(newOrder);
  }, [snippets, numSnippets]);

  const createButtonLabel = (artists) => {
    let buttonLabel = '';
    artists.forEach((artist, index) => {
      buttonLabel += artist;
      if (index < numArtists - 1) {
        buttonLabel += ' & '
      };
    });

    return buttonLabel;
  };

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
        <button 
          onClick={() => submitGuess(artist)}
          className="game-body-guesses__buttons"
          key={artist}
        >
          {artist}
        </button>
      );
    });
    return buttons;
  }

  const displaySnippet = (snip) => {
    return (
      <div className="game-body">
        <div className="game-body-score">
          <p className="game-body-score__label">Score</p>
          <p className="game-body-score__score">{gameScore}</p>
        </div>
        <div className="game-body-snippets">
          <p className="game-body-snippets__snippet">{snip.snippet}</p>
        </div>
        <div className="game-body-guesses">
            {makeGuessButtons(artists)}
        </div>
      </div>
    );
  }

  const displayScorePrompt = () => {
    return (
      <div className="game-body">
        <div className="game-body-score">
          <p className="game-body-score__label">Score</p>
          <p className="game-body-score__score">{gameScore}</p>
        </div>
        <div className="game-body-snippets">
          <p className="game-body-snippets__snippet">
            That's all of them!
          </p>
        </div>
        <div className="game-body-next">
          <Link to="/score" className="game-body-next__link">
            <button
              onClick={() => dataContext.setScore(gameScore)}
              className="game-body-next__button"
            >
              View Score
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      {console.log('<Game/> is rendered')}

      <header className="game-header">
        <h1 className="game-header__title">Which Frank?</h1>
        <p className="game-header__subtitle">
          {createButtonLabel(artists)}
        </p>
      </header>

      {
        snipIndex < numSnippets ? 
        displaySnippet(snippets[snipOrder[snipIndex]]) :
        displayScorePrompt()
      }
    </div>
  );
}

export default Game;
