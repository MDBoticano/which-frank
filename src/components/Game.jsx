import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* context */
import DataContext from '../DataContext';

const Game = () => {
  const dataContext = useContext(DataContext);

  const toggleDataType = () => {
    if (dataContext.dataType === 'local') {
      dataContext.setDataType('API');
    }
    else if (dataContext.dataType === 'API'){
      dataContext.setDataType('local');
    }
  }

  return (
    <div className="game">
      GAME

      score: {dataContext.score}

      <button onClick={() => toggleDataType()}>
        data type: {dataContext.dataType}
      </button>

      <button onClick={() => {dataContext.setScore(dataContext.score + 1)}}>
        Correct Answer
      </button>

      <button>
        Wrong Answer
      </button>

      <Link to="/score">
        <button>
          View Score
        </button>
      </Link>
    </div>
  );
}

export default Game;
