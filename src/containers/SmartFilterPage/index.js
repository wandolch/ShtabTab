import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.css';
import {
  getFilteredBookmarks, getFilterSearch, getFilteredBookmarksLoading,
  getTopics
} from '../../states/bookmarksState';
import {
  getFilteredBookmarksAction, getTopicsAction, sendStat,
  setSmartFilterSearch
} from '../../actions/bookmarksActions';
import BookmarkView from '../../components/BookmarkView/index';
import TopicView from '../../components/TopicView/index';
import SearchInput from '../../components/SearchInput/index';
import { bookmarkShape } from '../../model/bookmarkShape';

let selectedTopics = [];

class SmartFilterPage extends Component {
  componentWillMount() {
    this.props.dispatch(getTopicsAction());
    this.props.dispatch(getFilteredBookmarksAction([]));
  }

  componentWillUnmount() {
    selectedTopics = [];
  }

  onSearch = (query) => {
    this.props.dispatch(setSmartFilterSearch(query));
  };

  toggleTopic = (topic) => {
    const index = selectedTopics.indexOf(topic);
    if (index === -1) {
      selectedTopics.push(topic);
    } else {
      selectedTopics.splice(index, 1);
    }
    this.props.dispatch(getFilteredBookmarksAction(selectedTopics));
  };

  goBack = () => {
    this.props.history.goBack();
  };

  sendStats = (id) => {
    this.props.dispatch(sendStat(id));
  };

  isTopicActive = topic => selectedTopics.indexOf(topic) !== -1;

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


  showMenuSide() {
    const topics = this.props.topics;
    if (topics) {
      return (
        <section styleName="menu-container">
          <div
            onClick={this.goBack}
            styleName="back-icon">
            <i className="material-icons">arrow_back</i>
          </div>
          <div>
            { topics.map(item => (
              <TopicView topic={item} isActive={this.isTopicActive(item)} onToggle={this.toggleTopic} key={item} />
            )) }
          </div>
        </section>
      );
    }
  }

  showBookmarksSide() {
    const bm = this.props.bookmarks;
    if (bm && !this.props.bookmarksLoading) {
      return (
        <section styleName="bookmarks-container">
          <div styleName="bookmarks-header">
            <h1 styleName="collection-title">Закладки по темам</h1>
            <SearchInput onSearch={this.onSearch} />
          </div>
          <div>
            <CSSTransitionGroup
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              transitionName={styles}>
              { bm.map(item => (<BookmarkView stat={this.sendStats} item={item} key={item.id}/>)) }
            </CSSTransitionGroup>
            {this.checkBookmarksEmpty()}
          </div>
        </section>
      );
    }
  }

  render() {
    return (
      <div styleName="bookmarks-page-wrapper">
        <Helmet>
          <title>Smart filter</title>
        </Helmet>
        <main styleName="bookmarks-page">
          {this.showMenuSide()}
          {this.showBookmarksSide()}
        </main>
      </div>
    );
  }
}

SmartFilterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  history: PropTypes.object,
  bookmarks: PropTypes.arrayOf(bookmarkShape),
  bookmarksLoading: PropTypes.bool,
  topics: PropTypes.arrayOf(PropTypes.string)
};

export default connect(state => ({
  searchQuery: getFilterSearch(state),
  bookmarks: getFilteredBookmarks(state),
  bookmarksLoading: getFilteredBookmarksLoading(state),
  topics: getTopics(state)
}))(CSSModules(SmartFilterPage, styles));
