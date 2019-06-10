import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './components/login'
import Main from './components/main'
import Pandect from './components/pandect'
import Notfound from './components/pages/notfound'
import Common from './components/cs/common'


//页面样式：登录，总览（大数据），main
class Routes extends Component {
  render() {
    return (
      <HashRouter>
      	<Switch>
          <Route exact path="/" render={()=> <Redirect to="/main/scheme" push />}/>
      		<Route path="/login" component={Login}/>
      		<Route path="/main" component={Main}/>
      		<Route path="/pandect" component={Pandect} />
          <Route path="/404" component={Notfound} />
          <Route component={Notfound} />
      	</Switch>
      </HashRouter>
    );
  }
}

export default Routes;
