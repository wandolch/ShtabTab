import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import {
  getCollections, getCurrentBookmarks, getCurrentCollection,
  getSearchQuery, getAddBookmarkLoading
} from '../../states/bookmarksState';
import {
  fetchCollections, fetchBookmarks, setBookmarksSearch,
  setCurrentCollection, addBookmark, delBookmark
} from '../../actions/bookmarksActions';
import { bookmarkShape } from '../../model/bookmarkShape';
import { collectionShape } from '../../model/collectionShape';
import BookmarkView from '../../components/BookmarkView/index';
import CollectionView from '../../components/CollectionView/index';
import SearchInput from '../../components/SearchInput/index';

class BookmarksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBookmarkLink: '',
      loadingDots: '',
      dotsInterval: null,
      user: JSON.parse(localStorage.getItem('st-user'))
    };
  }

  componentWillMount() {
    if (!this.props.collections) {
      this.props.dispatch(fetchCollections());
    } else {
      this.setCurrentCollections(this.props.match.params.id, this.props.collections);
    }
    this.props.dispatch(fetchBookmarks(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setCurrentCollections(nextProps.match.params.id, nextProps.collections);
      this.props.dispatch(fetchBookmarks(nextProps.match.params.id));
    }

    if (nextProps.collections && (nextProps.collections !== this.props.collections)) {
      this.setCurrentCollections(this.props.match.params.id, nextProps.collections);
    }

    if (nextProps.addBookmarkLoading === true && this.props.addBookmarkLoading === false) {
      const dotsInterval = this.startLoadingDots();
      this.setState({ dotsInterval });
    } else if (nextProps.addBookmarkLoading === false && this.props.addBookmarkLoading === true) {
      clearInterval(this.state.dotsInterval);
    }
  }

  onSearch = (query) => {
    this.props.dispatch(setBookmarksSearch(query));
  };

  onLinkChange= (event) => {
    this.setState({ newBookmarkLink: event.target.value.replace(/(\r\n\t|\n|\r\t)/gm, '') });
  };

  onDelete= (id) => {
    this.props.dispatch(delBookmark(id));
  };

  setCurrentCollections(id, collections) {
    const currentCollection = collections
      .find(collection => collection.id === id);
    this.props.dispatch(setCurrentCollection(currentCollection));
  }

  getCurrentCollectionTitle() {
    return this.props.currentCollection ? this.props.currentCollection.title : '';
  }

  startLoadingDots() {
    return window.setInterval(() => {
      if (this.state.loadingDots.length > 2) {
        this.setState({ loadingDots: '' });
      } else {
        this.setState(prevProps => ({ loadingDots: (prevProps.loadingDots += '.') }));
      }
    }, 500);
  }

  checkBookmarksEmpty = () => {
    if (!this.props.bookmarks.length) {
      if (!!this.props.searchQuery.length) {
        return (<div styleName="nothing-found">No bookmarks found for your query «<b>{this.props.searchQuery}</b>»</div>);
      }
      return (<div styleName="no-content">No bookmarks</div>);
    }
  };

  showMenuSide() {
    const collections = this.props.collections;
    if (collections) {
      return (
        <section styleName="menu-container">
          <div styleName="collections-container">
            {collections.map(item => (<CollectionView
              isActive={this.props.match.params.id === item.id}
              item={item}
              key={item.id}/>))}
          </div>
          <div styleName="account-info-container">
            <img styleName="avatar" src={this.state.user.picture} alt="avatar"/>
            <div styleName="account-info-block">
              <div styleName="user-name">{this.state.user.givenName}</div>
              <div styleName="logout">logout</div>
            </div>
          </div>
        </section>
      );
    }
  }

  handleAddPress = (event) => {
    if (event.key === 'Enter' && this.state.newBookmarkLink) {
      this.props.dispatch(addBookmark({
        collectionId: this.props.match.params.id,
        bookmark: { link: this.state.newBookmarkLink }
      }));
      this.setState({ newBookmarkLink: '' });
    }
  };

  showAddBookmarkInput = () => {
    if (this.props.addBookmarkLoading) {
      return (
        <div>
          <div styleName="add-bookmarks-loading-open">{`Loading${this.state.loadingDots}`}</div>
          <div styleName="add-bookmarks-loading-close">{this.state.loadingDots}</div>
        </div>
      );
    }
    return (
      <div>
        <textarea
          value={this.state.newBookmarkLink}
          onChange={this.onLinkChange}
          onKeyPress={this.handleAddPress}
          placeholder="place your link here and press enter"
          spellCheck="false"
          styleName="add-bookmark-input"
          type="text"/>
        <i styleName="add-icon" className="material-icons">add</i>
      </div>
    );
  };

  showBookmarksSide() {
    const bm = this.props.bookmarks;
    if (bm) {
      return (
        <section styleName="bookmarks-container">
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
              {bm.map(item => (<BookmarkView item={item} onDelete={this.onDelete} key={item.id}/>))}
            </CSSTransitionGroup>
            {this.checkBookmarksEmpty()}
          </div>

          <div styleName="fixed-action-btn">
            {this.showAddBookmarkInput()}
          </div>
        </section>
      );
    }
  }

  render() {
    return (
      <div styleName="bookmarks-page-wrapper">
        <Helmet>
          <title>{this.getCurrentCollectionTitle()}</title>
        </Helmet>
        <main styleName="bookmarks-page">
          {this.showMenuSide()}
          {this.showBookmarksSide()}
        </main>
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
  searchQuery: PropTypes.string,
  addBookmarkLoading: PropTypes.bool,
};

export default connect(state => ({
  bookmarks: getCurrentBookmarks(state),
  collections: getCollections(state),
  currentCollection: getCurrentCollection(state),
  searchQuery: getSearchQuery(state),
  addBookmarkLoading: getAddBookmarkLoading(state),
}))(CSSModules(BookmarksPage, styles));
