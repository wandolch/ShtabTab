import React from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route, Redirect } from 'react-router-dom';
import createPageLoadable from '../../utils/pageLoadable';
import styles from './index.css';

function Main() {
  return (
    <div styleName="main-wrapper">
      <Switch>
        <Route exact path="/" component={createPageLoadable('BookmarksPage')} />
        <Route exact path="/settings" component={createPageLoadable('Settings')} />
        <Redirect to="/not-found"/>
      </Switch>
    </div>
  );
}

export default CSSModules(Main, styles);