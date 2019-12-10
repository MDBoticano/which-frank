import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      HOME
      
      <Link to="/game">
        <button>
          Play
        </button>
      </Link>
    </div>
  );
}

export default Home;
