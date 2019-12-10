import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import DataContext from '../DataContext';

const ResetButton = (props) => {
  const dataContext = useContext(DataContext);

  return (
    <Link to={props.target}>
      <button onClick={() => dataContext.setScore(0)}>
        {props.label}
      </button>
    </Link>
  );
}

const Score = () => {
  const dataContext = useContext(DataContext);

  return (
    <div className="score">
      SCORE: {dataContext.score}
      <ResetButton target="/" label="Home" />
      <ResetButton target="/game" label="Play Again" />
    </div>
  );
}

export default Score;
