import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './../App'
import Login from './../components/login'
import Main from './../components/main'
import Pandect from './../components/pandect'
import csone from './../components/datashow/csone'
import cstwo from './../components/datashow/cstwo'

//页面样式：登录，总览（大数据），main
class Routes extends Component {
  render() {
    return (
      <HashRouter>
      <App>
      	<Switch>
      		<Route path="/login" component={Login}/>
      		<Route path="/main" render={()=>
    				<Main>
    					<Switch>
	    					<Route path="/main/ui/buttons" component={csone} />
	      				<Route path="/main/ui/modals" component={cstwo} />
	      			</Switch>
    				</Main>
      		}/>
      		<Route path="/pandect" component={Pandect}/>
      	</Switch>
      	</App>
      </HashRouter>
    );
  }
}

export default Routes;
