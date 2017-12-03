import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import { getBookmarks } from '../../states/bookmarksState';
import { loadBookmarks } from '../../actions/bookmarksActions';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.props.loadBookmarks();

    setTimeout(() => {
      console.log(this.props.allBookmarks);
    }, 1000);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Bookmarks</title>
        </Helmet>
        <h1 styleName="title">Bookmarks</h1>
        <p>{this.props.allBookmarks.length ? this.props.allBookmarks[0].bookmarks[0].title : 'nothing'}</p>
      </div>
    );
  }
}

Bookmarks.propTypes = {
  loadBookmarks: PropTypes.func.isRequired,
  allBookmarks: PropTypes.array.isRequired
};

export default connect(
  state => ({
    allBookmarks: getBookmarks(state)
  }),
  {
    loadBookmarks
  }
)(CSSModules(Bookmarks, styles));
