import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'


// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoteSensing,CleanLayers } from '../../actions/postActions';

import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import './mapshow.less'
class Gis extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }
    componentWillUnmount(){
        // 促发清空图层
        this.props.CleanLayers(0);
    }
    // 点击各个监测网,触发redux
    insar(val){
        this.props.RemoteSensing(val);
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    //     // this.setState({
    //     //     animationName:"animated fadeOutRight"
    //     // })
    // }
    render() {       
        return (
            <div className="Gis">
             <ReactCSSTransitionGroup
          transitionEnter={true}
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName="left"
  >
              <div key="amache" className="animated fadeInLeftBig">
              <List className='listitem'>
                    <List.Item key='ItemLandform' onClick={()=>this.insar('topographic')}>地形地貌</List.Item>
                    <List.Item key='ItemInsar' onClick={()=>this.insar('INSAR')}>INSAR</List.Item>
                    <List.Item key='ItemHyperspectral' onClick={()=>this.insar('gaoguangpu')}>高光谱</List.Item>
                    <List.Item key='ItemDestru' onClick={()=>this.insar('land')}>土地损毁与复垦</List.Item>
                </List>
                <dl className="columndl">
                    <dt className="columndt">土地损毁</dt>
                    <div className="egraph">
                        <Egraph key='sunh' dataHeight='150' cahrtp='shmeter' />
                    </div>
                </dl>
                <dl className="columndl">
                    <dt className="columndt">土地复垦</dt>
                    <div className="egraph">
                        <Egraph key='fuk' dataHeight='150' cahrtp='meter' />    
                    </div>
                </dl>
              </div>
        </ReactCSSTransitionGroup>
                
            </div>
        );
    }
}

Gis.propTypes = {
    RemoteSensing: PropTypes.func.isRequired,
    CleanLayers: PropTypes.func.isRequired
}

export default connect(null, { RemoteSensing,CleanLayers })(Gis); 