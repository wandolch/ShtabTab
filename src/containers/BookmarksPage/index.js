import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import { getCollections, getCurrentBookmarks, getCurrentCollection, getSearchQuery } from '../../states/bookmarksState';
import {
  fetchCollections, fetchBookmarks, setBookmarksSearch,
  setCurrentCollection
} from '../../actions/bookmarksActions';
import { bookmarkShape } from '../../model/bookmarkShape';
import { collectionShape } from '../../model/collectionShape';
import BookmarksView from '../../components/BookmarkView/index';
import SearchInput from '../../components/SearchInput/index';

class BookmarksPage extends Component {
  componentWillMount() {
    if (!this.props.collections) {
      this.props.dispatch(fetchCollections());
    } else {
      this.setCurrentCollections(this.props.collections);
    }
    this.props.dispatch(fetchBookmarks(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collections !== this.props.collections) {
      this.setCurrentCollections(nextProps.collections);
    }
  }

  onSearch = (query) => {
    this.props.dispatch(setBookmarksSearch(query));
  };

  setCurrentCollections(collections) {
    const currentCollection = collections.find(collection => collection.id === +this.props.match.params.id);
    this.props.dispatch(setCurrentCollection(currentCollection));
  }

  getCurrentCollectionTitle() {
    return this.props.currentCollection ? this.props.currentCollection.title : '';
  }

  checkBookmarksEmpty = () => {
    if (!this.props.bookmarks.length) {
      if (!!this.props.searchQuery.length) {
        return (<div styleName="nothing-found">No bookmarks found for your query «<b>{this.props.searchQuery}</b>»</div>);
      }
      return (<div styleName="no-content">No bookmarks</div>);
    }
  };

  showBookmarksSide() {
    const bm = this.props.bookmarks;
    if (bm) {
      return (
        <div>
          <div styleName="bookmarks-header">
            <h1 styleName="collection-title">{this.getCurrentCollectionTitle()}</h1>
            <SearchInput onSearch={this.onSearch} />
          </div>
          <div>
            <CSSTransitionGroup
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              transitionName={styles}>
              {bm.map(item => (<BookmarksView item={item} key={item.id}/>))}
            </CSSTransitionGroup>
            {this.checkBookmarksEmpty()}
          </div>
        </div>
      );
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
            {this.showBookmarksSide()}
          </div>
        </section>
      </div>
    );
  }
}

BookmarksPage.propTypes = {
  bookmarks: PropTypes.arrayOf(bookmarkShape),
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  collections: PropTypes.arrayOf(collectionShape),
  currentCollection: collectionShape,
  searchQuery: PropTypes.string
};

export default connect(state => ({
  bookmarks: getCurrentBookmarks(state),
  collections: getCollections(state),
  currentCollection: getCurrentCollection(state),
  searchQuery: getSearchQuery(state)
}))(CSSModules(BookmarksPage, styles));
