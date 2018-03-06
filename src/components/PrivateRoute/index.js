import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('st-user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/info', state: { from: props.location } }} /> // eslint-disable-line react/prop-types
    )} />
);

PrivateRoute.propTypes = {
  component: PropTypes.func
};

export default PrivateRoute;
