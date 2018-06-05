import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import {
  getCollections, getCurrentBookmarks, getCurrentCollection,
  getSearchQuery, getAddBookmarkLoading, getBookmarksLoading,
  getShareCollectionLoading, getShareCollectionError
} from '../../states/bookmarksState';
import {
  fetchCollections, fetchBookmarks, setBookmarksSearch, sendStat,
  setCurrentCollection, addBookmark, delBookmark, addCollection, shareCollection,
  deleteCollection, toggleCollectionView, editCollection
} from '../../actions/bookmarksActions';
import { bookmarkShape } from '../../model/bookmarkShape';
import { collectionShape } from '../../model/collectionShape';
import BookmarkView from '../../components/BookmarkView/index';
import BookmarkAltView from '../../components/BookmarkAltView/index';
import CollectionView from '../../components/CollectionView/index';
import SearchInput from '../../components/SearchInput/index';
import Modal from '../../components/Modal/index';
import StatModal from '../../components/StatModal/index';

class BookmarksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBookmarkLink: '',
      newCollection: '',
      userToShare: '',
      newCollectionTitle: '',
      loadingDots: '',
      dotsInterval: null,
      statModalOpen: false,
      user: JSON.parse(localStorage.getItem('st-user')),
      shareCollectionId: null,
      collectionEditId: null
    };
  }

  componentWillMount() {
    if (!this.props.collections) {
      this.props.dispatch(fetchCollections());
    } else {
      this.setNewCurrentCollection(this.props.match.params.id, this.props.collections);
    }
    this.props.dispatch(fetchBookmarks(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setNewCurrentCollection(nextProps.match.params.id, nextProps.collections);
      this.props.dispatch(fetchBookmarks(nextProps.match.params.id));
    }

    if (nextProps.collections && (nextProps.collections !== this.props.collections)) {
      this.setNewCurrentCollection(this.props.match.params.id, nextProps.collections);
    }

    if (nextProps.addBookmarkLoading === true && this.props.addBookmarkLoading === false) {
      const dotsInterval = this.startLoadingDots();
      this.setState({ dotsInterval });
    } else if (nextProps.addBookmarkLoading === false && this.props.addBookmarkLoading === true) {
      clearInterval(this.state.dotsInterval);
    }

    if (!nextProps.shareCollectionError && !nextProps.shareCollectionLoading
      && this.props.shareCollectionLoading && !this.props.shareCollectionError) {
      this.closeShareModal();
      toast.success('Вы поделились коллекцией!', {
        position: toast.POSITION.TOP_RIGHT,
        className: {
          borderRadius: '10px'
        },
        hideProgressBar: true
      });
    }

    if (this.props.collections && nextProps.collections
      && this.props.currentCollection && !nextProps.currentCollection) {
      this.props.history.push(`/collection/${nextProps.collections[0].id}`);
    }
  }

  onSearch = (query) => {
    this.props.dispatch(setBookmarksSearch(query));
  };

  onLinkChange = (event) => {
    this.setState({ newBookmarkLink: event.target.value.replace(/(\r\n\t|\n|\r\t)/gm, '') });
  };

  onNewCollectionChange = (event) => {
    this.setState({ newCollection: event.target.value });
  };

  onShareInputChange = (event) => {
    this.setState({ userToShare: event.target.value });
  };

  onEditInputChange = (event) => {
    this.setState({ newCollectionTitle: event.target.value });
  };

  onDelete= (id) => {
    this.props.dispatch(delBookmark(id));
  };

  onLogout = () => {
    localStorage.removeItem('st-user');
    // this.props.dispatch(userLogout());
    // this.props.history.push('/info');
    window.location.reload();
  };

  goToSmartFilter = () => {
    this.props.history.push('/smart-filter');
  };

  sendStats = (id) => {
    this.props.dispatch(sendStat(id));
  };

  onCollectionShare = (id) => {
    this.setState({ shareCollectionId: id });
  };

  onCollectionEdit = (item) => {
    this.setState({ collectionEditId: item.id, newCollectionTitle: item.title });
  };

  onCollectionDelete = (id) => {
    this.props.dispatch(deleteCollection(id));
  };

  onToggleView = (id) => {
    this.props.dispatch(toggleCollectionView(id));
  };

  getCurrentCollectionTitle() {
    return this.props.currentCollection ? this.props.currentCollection.title : '';
  }

  setNewCurrentCollection(id, collections) {
    const currentCollection = collections
      .find(collection => collection.id === id);
    this.props.dispatch(setCurrentCollection(currentCollection));
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
        return (<div styleName="nothing-found">Не найдено ни одной закладки по запросу «<b>{this.props.searchQuery}</b>»</div>);
      }
      if (!this.props.bookmarksLoading) {
        return (<div styleName="no-content">Нет закладок</div>);
      }
    }
  };

  handleAddCollectionPress = (event) => {
    if (event.key === 'Enter' && this.state.newCollection) {
      this.props.dispatch(addCollection(this.state.newCollection));
      this.setState({ newCollection: '' });
    }
  };

  handleAddBookmarkPress = (event) => {
    if (event.key === 'Enter' && this.state.newBookmarkLink) {
      this.props.dispatch(addBookmark({
        collectionId: this.props.match.params.id,
        bookmark: { link: this.state.newBookmarkLink }
      }));
      this.setState({ newBookmarkLink: '' });
    }
  };

  openStatModal = () => {
    this.setState({ statModalOpen: true });
  };

  closeStatModal = () => {
    this.setState({ statModalOpen: false });
  };

  handleShareInputPress = (event) => {
    if (event.key === 'Enter' && this.state.userToShare) {
      this.props.dispatch(shareCollection(this.state.shareCollectionId, this.state.userToShare));
      this.setState({ userToShare: '' });
    }
  };

  handleEditInputPress = (event) => {
    if (event.key === 'Enter' && this.state.newCollectionTitle) {
      this.props.dispatch(editCollection(this.state.collectionEditId, this.state.newCollectionTitle));
      this.setState({ collectionEditId: null, newCollectionTitle: '' });
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
          onKeyPress={this.handleAddBookmarkPress}
          placeholder="поместите сюда ссылку и нажмите клавишу enter"
          spellCheck="false"
          styleName="add-bookmark-input"
          type="text"/>
        <i styleName="add-icon" className="material-icons">add</i>
      </div>
    );
  };

  showMenuSide() {
    const collections = this.props.collections;
    if (collections) {
      return (
        <section styleName="menu-container">
          <div styleName="top-part">
            <div styleName="collections-container">
              {collections.map(item => (<CollectionView
                isActive={this.props.match.params.id === item.id}
                item={item}
                onDelete={this.onCollectionDelete}
                onToggleView={this.onToggleView}
                onCollectionShare={this.onCollectionShare}
                onCollectionEdit={this.onCollectionEdit}
                key={item.id}/>))}
            </div>
            <div styleName="add-collection">
              <input
                value={this.state.newCollection}
                onChange={this.onNewCollectionChange}
                onKeyPress={this.handleAddCollectionPress}
                styleName="add-collection-input"
                type="text"
                placeholder="Новая коллекции"/>
            </div>
          </div>
          <div styleName="bottom-part">
            <div styleName="smart-filter" onClick={this.goToSmartFilter}>Фильтровать по темам</div>
            <div styleName="account-info-container">
              <img styleName="avatar" src={this.state.user.picture} alt="avatar"/>
              <div styleName="account-info-block">
                <div styleName="user-name">{this.state.user.givenName}
                  <span onClick={this.openStatModal} className="material-icons" styleName="stat">info_outline</span>
                </div>
                <div onClick={this.onLogout} styleName="logout">выйти</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  showBookmarksSide() {
    const bm = this.props.bookmarks;
    const defaultStyle = this.props.currentCollection ? this.props.currentCollection.defaultStyle : true;
    if (bm && !this.props.bookmarksLoading) {
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
              {
                defaultStyle ?
                  bm.map(item => (<BookmarkView stat={this.sendStats} item={item} onDelete={this.onDelete} key={item.id}/>))
                  : bm.map(item => (<BookmarkAltView stat={this.sendStats} item={item} onDelete={this.onDelete} key={item.id}/>))
              }
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

  closeShareModal = () => {
    this.setState({ shareCollectionId: null, userToShare: '' });
  };

  closeEditModal = () => {
    this.setState({ collectionEditId: null, newCollectionTitle: '' });
  };

  displayShareModal() {
    return (
      <Modal
        title="Поделиться коллекцией"
        display={this.state.shareCollectionId}
        onClose={this.closeShareModal}>
        <p>Введите эл. адрес пользователя системы</p>
        <input
          value={this.state.userToShare}
          onChange={this.onShareInputChange}
          onKeyPress={this.handleShareInputPress}
          type="email"
          placeholder="johnsmith@mail.com"/>
      </Modal>
    );
  }

  displayEditModal() {
    return (
      <Modal
        title="Редактирование"
        display={this.state.collectionEditId}
        onClose={this.closeEditModal}>
        <p>Введите новое имя коллекции и нажмите enter</p>
        <input
          value={this.state.newCollectionTitle}
          onChange={this.onEditInputChange}
          onKeyPress={this.handleEditInputPress}
          type="text"/>
      </Modal>
    );
  }

  displayStatModal() {
    return (
      <StatModal
        title="Статистика"
        display={this.state.statModalOpen}
        onClose={this.closeStatModal}>
        <p>Самый посещаемый сайт — YOUTUBE.COM</p>
        <p>Самый посещаемый сайт за сегодня — VK.COM</p>
        <p>Самая частая тема сайта — SOCIAL NETWORK</p>
        <p>Самая частая тема сайта на сегодня — IT</p>
        <p>Самый неиспользуемый сайт — COURSERA.ORG</p>
      </StatModal>
    );
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
        {this.displayShareModal()}
        {this.displayEditModal()}
        {this.displayStatModal()}
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
  history: PropTypes.object,
  bookmarksLoading: PropTypes.bool,
  shareCollectionLoading: PropTypes.bool,
  shareCollectionError: PropTypes.bool
};

export default connect(state => ({
  bookmarks: getCurrentBookmarks(state),
  collections: getCollections(state),
  currentCollection: getCurrentCollection(state),
  searchQuery: getSearchQuery(state),
  addBookmarkLoading: getAddBookmarkLoading(state),
  bookmarksLoading: getBookmarksLoading(state),
  shareCollectionLoading: getShareCollectionLoading(state),
  shareCollectionError: getShareCollectionError(state)
}))(CSSModules(BookmarksPage, styles));
