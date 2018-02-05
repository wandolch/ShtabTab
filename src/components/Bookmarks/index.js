import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';

class Bookmarks extends Component {
  render() {
    return (
      <div styleName="bookmarks-wrapper">
        {this.props.bookmarks.map(item => (<div key={item.id}>{item.title}</div>))}
      </div>
    );
  }
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.array.isRequired
};

export default CSSModules(Bookmarks, styles);
