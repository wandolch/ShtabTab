import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import BookmarksPage from '../BookmarksPage';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import styles from './index.css';
import { getBookmarksLoading, getCollectionsLoading, getCollections } from '../../states/bookmarksState';
import { fetchBookmarks, fetchCollections } from '../../actions/bookmarksActions';
import { collectionShape } from '../../model/collectionShape';

class Main extends Component {
  componentWillMount() {
    if (this.props.location.pathname === '/') {
      this.props.dispatch(fetchCollections());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname === '/' && nextProps.collections) {
      this.props.dispatch(fetchBookmarks(nextProps.collections[0].id));
      this.props.history.push(`/collection/${nextProps.collections[0].id}`);
    }
  }

  showLoading() {
    if (this.props.collectionsLoading || this.props.bookmarksLoading) {
      return (
        <LoadingIndicator/>
      );
    }
  }

  render() {
    return (
      <div styleName="main-wrapper">
        {this.showLoading()}
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/collection/:id" component={BookmarksPage}/>
          <Redirect to="/not-found"/>
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bookmarksLoading: PropTypes.bool.isRequired,
  collections: PropTypes.arrayOf(collectionShape),
  collectionsLoading: PropTypes.bool.isRequired,
  history: PropTypes.object,
  location: PropTypes.object
};

export default connect(state => ({
  bookmarksLoading: getBookmarksLoading(state),
  collections: getCollections(state),
  collectionsLoading: getCollectionsLoading(state)
}))(CSSModules(Main, styles));

