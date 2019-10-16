import React from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ showComponent }) => {
  if (!showComponent) {
    return null;
  }

  return (
    <div className="LoadingScreen">
      loading...
    </div>
  );
};

LoadingScreen.propTypes = {
  showComponent: PropTypes.bool.isRequired,
};

export default LoadingScreen;
