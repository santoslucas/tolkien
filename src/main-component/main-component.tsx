import React from 'react';
import Dashboard from '../scenes/dashboard';
import SignIn from '../scenes/signin/signin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import Header from '../components/header';
import './main-component.scss';

const MainComponent = () => {
  return (
    <BrowserRouter>
      <div className="main-component__wrapper">
        <div className="main-component__content">
          <Header />

          <Switch>
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainComponent;
