import React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = (props) => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  }
  return null;
};

LoadingIndicator.defaultProps = {
  error: false
};

LoadingIndicator.propTypes = {
  error: PropTypes.bool,
  pastDelay: PropTypes.bool.isRequired
};

export default LoadingIndicator;
