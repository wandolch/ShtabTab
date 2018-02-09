import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import { getBookmarksError, getBookmarksLoading, getCurrentBookmarks } from '../../states/bookmarksState';
import Bookmarks from '../../components/Bookmarks';
import { fetchBookmarks } from '../../actions/bookmarksActions';
import { bookmarkShape } from '../../model/bookmarkShape';

class BookmarksPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchBookmarks(1));
  }

  showBookmarks() {
    const bm = this.props.bookmarks;
    if (bm) {
      return <Bookmarks bookmarks={bm}/>;
    } else if (this.props.bookmarksLoading) {
      return (<h1>loading</h1>);
    } else if (this.props.bookmarksError) {
      return (<h1>ERROR</h1>);
    }
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
            {this.showBookmarks()}
          </div>
        </section>
      </div>
    );
  }
}

BookmarksPage.propTypes = {
  bookmarks: PropTypes.arrayOf(bookmarkShape).isRequired,
  dispatch: PropTypes.func.isRequired,
  bookmarksLoading: PropTypes.bool.isRequired,
  bookmarksError: PropTypes.bool.isRequired
};

export default connect(state => ({
  bookmarks: getCurrentBookmarks(state),
  bookmarksLoading: getBookmarksLoading(state),
  bookmarksError: getBookmarksError(state)
}))(CSSModules(BookmarksPage, styles));
