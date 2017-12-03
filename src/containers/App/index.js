import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import createPageLoadable from '../../utils/pageLoadable';

export default function App() {
  return (
    <div className="app-wrapper">
      <Helmet
        titleTemplate="%s - ShtabTab"
        defaultTitle="ShtabTab">
        <meta name="description" content="Modern bookmarks manager" />
      </Helmet>
      <Switch>
        <Route path="/login" exact component={createPageLoadable('Login')} />
        <Route path="/not-found" component={createPageLoadable('NotFound')} />
        <Route path="/" component={createPageLoadable('Main', true)} />
      </Switch>
    </div>
  );
}
