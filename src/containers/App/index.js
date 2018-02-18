import React from 'react';
import { Helmet } from 'react-helmet';
import CSSModules from 'react-css-modules';
import { Switch, Route } from 'react-router-dom';
import createPageLoadable from '../../utils/pageLoadable';
import styles from './index.css';
import Main from '../Main';

function App() {
  return (
    <div styleName="app-wrapper">
      <Helmet
        titleTemplate="%s - ShtabTab"
        defaultTitle="ShtabTab">
        <meta name="description" content="Modern bookmarks manager" />
      </Helmet>
      <Switch>
        <Route path="/login" exact component={createPageLoadable('LoginPage')} />
        <Route path="/not-found" component={createPageLoadable('NotFoundPage')} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default CSSModules(App, styles);
