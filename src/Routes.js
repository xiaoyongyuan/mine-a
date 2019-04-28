import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './components/login'
import Main from './components/main'
import Pandect from './components/pandect'
import Datamanage from './components/datashow/datamanage'
import Projectmanage from './components/datashow/projectmanage'
import Notfound from './components/pages/notfound'


//页面样式：登录，总览（大数据），main
class Routes extends Component {
  render() {
    return (
      <HashRouter>
      <App>
      	<Switch>
          <Route exact path="/" render={()=> <Redirect to="/main/datashow/projectmanage" />}/>
      		<Route path="/login" component={Login}/>
      		<Route path="/main" render={()=>
    				<Main>
    					<Switch>
	    					<Route path="/main/datashow/datamanage" component={Datamanage} />
	      				<Route path="/main/datashow/projectmanage" component={Projectmanage} />
	      			</Switch>
    				</Main>
      		}/>
      		<Route path="/pandect" render={()=>
            <Pandect>
              <Switch>
                <Route path="/pandect/datashow/datamanage" component={Datamanage} />
                <Route path="/pandect/datashow/projectmanage" component={Projectmanage} />
              </Switch>
            </Pandect>
          } />
          <Route path="/404" component={Notfound} />
          <Route component={Notfound} />
      	</Switch>
      	</App>
      </HashRouter>
    );
  }
}

export default Routes;
