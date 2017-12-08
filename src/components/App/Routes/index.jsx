import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/App/Pages/home';

export default function Routes () {
  return(
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  );
}
