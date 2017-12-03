import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import createPageLoadable from '../../utils/pageLoadable';

export default function Main() {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path="/" component={createPageLoadable('Bookmarks')} />
        <Route exact path="/settings" component={createPageLoadable('Settings')} />
        <Redirect to="/not-found"/>
      </Switch>
    </div>
  );
}
