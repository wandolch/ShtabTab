import { createSelector } from 'reselect';

export const commonState = {
  user: null,
  signInLoading: false,
  appError: null
};

const getCommonState = state => state.common;

export const getUser = createSelector([getCommonState], state => state.user);
export const getSignInLoading = createSelector([getCommonState], state => state.signInLoading);
export const getAppError = createSelector([getCommonState], state => state.appError);

