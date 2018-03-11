import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

const LoadingIndicator = () => (
  <div styleName="showbox">
    <svg styleName="spinner" width="200px" height="200px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle styleName="path" fill="none" strokeWidth="3" strokeLinecap="round" cx="33" cy="33" r="30" />
    </svg>
  </div>
);

export default CSSModules(LoadingIndicator, styles);
