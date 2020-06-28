import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserProvider";

const PrivateRoute = ({ component, ...rest }: any) => {
  const { user, loadingAuth } = useContext(UserContext);

  if (loadingAuth) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const routeComponent = (props: any) =>
    user ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signin" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
