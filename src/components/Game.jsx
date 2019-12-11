import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

/* context */
import DataContext from '../DataContext';

const Game = () => {
  const dataContext = useContext(DataContext);
  const SCORE = dataContext.score;

  const [gameScore, setGameScore] = useState(SCORE);

  return (
    <div className="game">
      {console.log('<Game/> is rendered')}

      GAME

      score: {gameScore}

      <button onClick={() => {setGameScore(gameScore + 1)}}>
        Correct Answer
      </button>

      <button>
        Wrong Answer
      </button>

      <Link to="/score">
        <button onClick={() => dataContext.setScore(gameScore)}>
          View Score
        </button>
      </Link>
    </div>
  );
}

export default Game;
