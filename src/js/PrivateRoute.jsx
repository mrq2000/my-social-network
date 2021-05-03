/* eslint react/prop-types: 0, react/jsx-props-no-spreading: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './helpers/storage';

import BlankLayout from './components/common/BlankLayout';

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const hasToken = getToken();

  return (
    <Route
      {...rest}
      render={
        (props) => (hasToken
          ? (
            <Layout>
              <Component {...props} />
            </Layout>
          )
          : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: props.location },
              }}
            />
          ))
      }
    />
  );
};

PrivateRoute.defaultProps = {
  layout: BlankLayout,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func,
};

export default PrivateRoute;
