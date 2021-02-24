import React from 'react';
import Navbar from './components/Navbar/Navbar';
import MainTemplate from './templates/MainTemplate/MainTemplate';
import {Container} from '@material-ui/core';
import {Switch, Route} from 'react-router-dom';
import {routes} from './routes'
import MainView from './views/MainView/MainView';
import AuthView from './views/AuthView/AuthView';

const Root = () => {
  return ( 
    <MainTemplate>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route exact path={routes.home} component={MainView} />
          <Route exact path={routes.autentication} component={AuthView} />
        </Switch>
      </Container>
    </MainTemplate>
   );
}
 
export default Root;