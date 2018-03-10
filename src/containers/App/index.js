import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import createPageLoadable from '../../utils/pageLoadable';
import styles from './index.css';
import Main from '../Main';
import PrivateRoute from '../../components/PrivateRoute/index';
import { getAppError } from '../../states/commonState';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.appErr && (nextProps.appErr !== this.props.appErr)) {
      this.handleError(nextProps.appErr);
    }
  }

  handleError(err) {
    if (!err.response) return;

    switch (err.response.status) {
    case 401:
      this.props.history.push('/info');
      break;
    case 404:
      this.props.history.push('/not-found');
      break;
    default:
      alert(err.message); // TODO make toast
    }
  }

  render() {
    return (
      <div styleName="app-wrapper">
        <Helmet
          titleTemplate="%s - ShtabTab"
          defaultTitle="ShtabTab">
          <meta name="description" content="Modern bookmarks manager"/>
        </Helmet>
        <Switch>
          <Route path="/info" component={createPageLoadable('InfoPage')}/>
          <Route path="/not-found" component={createPageLoadable('NotFoundPage')}/>
          <PrivateRoute path="/" component={Main}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  appErr: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(connect(state => ({
  appErr: getAppError(state)
}))(CSSModules(App, styles)));

