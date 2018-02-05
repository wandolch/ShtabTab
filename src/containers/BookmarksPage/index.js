import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import { getBookmarks } from '../../states/bookmarksState';
import { loadBookmarks } from '../../actions/bookmarksActions';
import Bookmarks from '../../components/Bookmarks';

class BookmarksPage extends Component {
  constructor(props) {
    super(props);
    this.props.loadBookmarks();
  }

  render() {
    return (
      <div styleName="bookmarks-page-wrapper">
        <Helmet>
          <title>Bookmarks</title>
        </Helmet>

        <section styleName="bookmarks-page">
          <div styleName="menu-container">Menu</div>
          <div styleName="bookmarks-container">
            <Bookmarks bookmarks={this.props.bookmarks}/>
          </div>
        </section>
      </div>
    );
  }
}

BookmarksPage.propTypes = {
  loadBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired
};

export default connect(
  state => ({
    bookmarks: getBookmarks(state)
  }),
  {
    loadBookmarks
  }
)(CSSModules(BookmarksPage, styles));
