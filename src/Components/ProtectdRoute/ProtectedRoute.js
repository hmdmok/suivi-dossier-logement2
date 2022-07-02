import React from "react";
import { Route, Redirect } from "react-router";

function ProtectedRoute({
  getUsername,
  setAuthent,
  setUsertype,
  loadUser,
  getAuthent,
  getUserid,
  usertype,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getAuthent()) {
          // console.log(getUsername());
          return (
            <Component
              {...props}
              {...rest}
              getUserid={getUserid}
              getUsername={getUsername}
              usertype={usertype}
              loadUser={loadUser}
              setAuthent={setAuthent}
              setUsertype={setUsertype}
            />
          );
        } else {
          // console.log(getAuthent());
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
