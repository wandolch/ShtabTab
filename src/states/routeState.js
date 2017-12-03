import { createSelector } from 'reselect';

export const routeState = {
  location: null
};

const getRouteState = state => state.route;

export const getLocation = createSelector([getRouteState], state => state.location);
