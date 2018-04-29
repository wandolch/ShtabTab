import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './index.css';

class LoadingIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: styles.hidden };
  }

  componentWillMount() {
    setTimeout(() => {
      this.show();
    }, this.props.wait);
  }

  show() {
    this.setState({ hidden: '' });
  }

  render() {
    return (
      <div styleName="showbox" className={this.state.hidden}>
        <svg styleName="spinner" width="200px" height="200px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle styleName="path" fill="none" strokeWidth="3" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
      </div>
    );
  }
}

LoadingIndicator.propTypes = {
  wait: PropTypes.number
};

export default CSSModules(LoadingIndicator, styles);
