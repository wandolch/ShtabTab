import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import {
  getBookmarksError, getBookmarksLoading, getCollections, getCollectionsError, getCollectionsLoading,
  getCurrentBookmarks, getCurrentCollection
} from '../../states/bookmarksState';
import { fetchBookmarks, fetchCollections, setCurrentCollection } from '../../actions/bookmarksActions';
import { bookmarkShape } from '../../model/bookmarkShape';
import { collectionShape } from '../../model/collectionShape';
import BookmarksView from '../../components/BookmarkView/index';

class BookmarksPage extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCollections());
    this.props.dispatch(fetchBookmarks(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collections !== this.props.collections) {
      const currentCollection = nextProps.collections.find(collection => collection.id === +this.props.match.params.id);
      this.props.dispatch(setCurrentCollection(currentCollection));
    }
  }

  getCurrentCollectionTitle() {
    return this.props.currentCollection ? this.props.currentCollection.title : '';
  }

  showBookmarks() {
    const bm = this.props.bookmarks;
    if (bm) {
      return (
        <div>
          {bm.map(item => (<BookmarksView item={item} key={item.id}/>))}
        </div>
      );
    } else if (this.props.bookmarksLoading) {
      return (<h1>loading</h1>);
    } else if (this.props.bookmarksError) {
      return (<h1>ERROR</h1>);
    }
  }

  showCollections() {
    const col = this.props.collections;
    if (col) {
      return (
        <div>
          {col.map(item => (<div key={item.id}>{item.title}</div>))}
        </div>
      );
    } else if (this.props.collectionsLoading) {
      return (<h1>loading</h1>);
    } else if (this.props.collectionsError) {
      return (<h1>ERROR</h1>);
    }
  }

  render() {
    return (
      <div styleName="bookmarks-page-wrapper">
        <Helmet>
          <title>{this.getCurrentCollectionTitle()}</title>
        </Helmet>
        <section styleName="bookmarks-page">
          <div styleName="menu-container">
            {this.showCollections()}
          </div>
          <div styleName="bookmarks-container">
            <h1 styleName="collection-title">{this.getCurrentCollectionTitle()}</h1>
            {this.showBookmarks()}
          </div>
        </section>
      </div>
    );
  }
}

BookmarksPage.propTypes = {
  bookmarks: PropTypes.arrayOf(bookmarkShape),
  dispatch: PropTypes.func.isRequired,
  bookmarksLoading: PropTypes.bool.isRequired,
  bookmarksError: PropTypes.bool.isRequired,
  match: PropTypes.any.isRequired,
  collections: PropTypes.arrayOf(collectionShape),
  collectionsLoading: PropTypes.bool.isRequired,
  collectionsError: PropTypes.bool.isRequired,
  currentCollection: collectionShape
};

export default connect(state => ({
  bookmarks: getCurrentBookmarks(state),
  bookmarksLoading: getBookmarksLoading(state),
  bookmarksError: getBookmarksError(state),
  collections: getCollections(state),
  collectionsLoading: getCollectionsLoading(state),
  collectionsError: getCollectionsError(state),
  currentCollection: getCurrentCollection(state)
}))(CSSModules(BookmarksPage, styles));
