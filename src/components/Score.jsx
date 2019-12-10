import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import DataContext from '../DataContext';

const Score = () => {
  const dataContext = useContext(DataContext);

  return (
    <div className="score">
      SCORE: {dataContext.score}
      <Link to="/">
        <button>
          Home
        </button>
      </Link>
      <Link to="/game">
        <button onClick={() => dataContext.setScore(0)}>
          Play Again
        </button>
      </Link>
    </div>
  );
}

export default Score;
