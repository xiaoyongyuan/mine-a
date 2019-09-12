import React, { Component } from 'react';
import Egraph from './../common/Egraph';
import './mapshow.less';

import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Prodect extends Component {
    constructor(props){
        super(props);
        this.state={  
        };
    }

  


    render() {
        
        return (
            <div className="Prodect">
             <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName="left"
  >
              <div key="amache" className="animated fadeInLeftBig">
                <dl className="columndl">
                        <dt className="columndt">项目管理<a className="columndtright" href="/#/main/scheme"></a></dt>
                        <div className="egraph">
                        <Egraph dataHeight='400' cahrtp='progressbar' />
                        </div>
                    </dl>
              </div>
            </ReactCSSTransitionGroup>
               
            </div>
        );
    }
}
export default Prodect