import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

/* Context */
import DataContext from '../DataContext';

const ResetButton = (props) => {
  const dataContext = useContext(DataContext);
  
  return (
    <Link to={props.target} className="score-next__link">
      <button
        onClick={() => dataContext.setScore(0)}
        className="score-next__button"
      >
        <p className="score-next__button-label">{props.label}</p>
        <p className="score-next__button-sublabel">{props.sublabel}</p>
      </button>
    </Link>
  );
}

const Score = () => {
  const dataContext = useContext(DataContext);
  const createButtonLabel = dataContext.createButtonLabel;
  const artists = dataContext.artists;

  return (
    <div className="score">
      <header className="game-header">
        <h1 className="game-header__title">Which Frank?</h1>
        <p className="game-header__subtitle">
          {createButtonLabel(artists)}
        </p>
      </header>

      <div className="score-box">
        <p className="score-box__label">Final Score</p>
        <p className="score-box__score">{dataContext.score}</p>
        <p className="score-box__sublabel">
          Out of {dataContext.snippets.length}
        </p>
        
      </div>

      <div className="score-next">
        <div className="score-next__buttons">
          <ResetButton 
            target="/" label="Home" 
            sublabel="(pick new artists)"
          />
          <ResetButton
            target="/game" label="Try Again"
            sublabel="(same artists)"  
          />
        </div>
      </div>
    </div>
  );
}

export default Score;
