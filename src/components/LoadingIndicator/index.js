import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

const LoadingIndicator = () => (
  <div styleName="showbox">
    <div styleName="loader">
      <svg styleName="circular" viewBox="25 25 50 50">
        <circle styleName="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    </div>
  </div>
);

export default CSSModules(LoadingIndicator, styles);
