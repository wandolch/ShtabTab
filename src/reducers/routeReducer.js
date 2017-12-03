import { LOCATION_CHANGE } from 'react-router-redux';
import { routeState } from '../states/routeState';

export default function (state = routeState, action) {
  switch (action.type) {
  case LOCATION_CHANGE:
    return Object.assign({}, state, {
      location: action.payload
    });

  default:
    return state;
  }
}
