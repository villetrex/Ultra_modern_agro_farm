import React from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
