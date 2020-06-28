import React, { useContext } from "react";
import Dashboard from "../scenes/dashboard";
import { UserContext } from "../UserProvider";
import SignIn from "../scenes/signin/signin";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./private-route";

const MainComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainComponent;
