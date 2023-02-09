import React, {Component} from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';

import App from "@/views/App";
import Login from "@/views/login";
import MainContent from "@/views/mainContent";


import homeRouter from './homeRouter'

const routers = [
  homeRouter,
];

const renderRoutes = routers => {
  return routers.map((item, index)=>
    <Route path={item.path} component={item.component} exact={item.exact} key={index}>
      {item.children && renderRoutes(item.children)}
    </Route>)
};


export default class RouteConfig extends Component{
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/' render={()=>
            <App>
              <MainContent>
                {renderRoutes(routers)}
              </MainContent>
            </App>
          }>
          </Route>
        </Switch>
      </HashRouter>
    )
  }
}
