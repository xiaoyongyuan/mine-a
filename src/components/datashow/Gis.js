import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'


// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoteSensing,CleanLayers } from '../../actions/postActions';

import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import menubg from '../../style/imgs/menubg.png';
import triangleR from '../../style/imgs/triangleR.png';
import triangleL from '../../style/imgs/triangleL.png';
import './mapshow.less';
class Gis extends Component {
    constructor(props){
        super(props);
        this.state={  
            ifshow:-1, 
            remoteSensing:[
                {name:"地形地貌",children:["基础信息","时序监测","破坏区监测"]},
                {name:"形变监测",children:["形变监测","累计形变","时序监测","数字高程模型","数字线化模型"]},
                {name:"生态环境",children:["植被监测","农作物监测","地表水监测","土壤监测"]},
                {name:"损毁复垦",children:["基础信息","损毁监测","复垦监测"]},
            ]
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
    shrink(val,tal){
        
        // 所以受点击的li
        var doc = document.querySelectorAll("li.sub-menu");
        // 方向
        var direction = document.querySelectorAll("img.directionimg");
        // 第二层ul(控制其他ul不显示)
        var twoul = document.querySelectorAll("ul.twoul");
        for(var i=0;i<twoul.length;i++){
            twoul[i].setAttribute('style','display: none');
            direction[i].setAttribute('src',triangleR);
        }
        
        // 获取受点击的li下面的方向
        var thisdirection = doc[val].children[0].children[2];
        // 获取受点击的li下面的ul
        var thisul = doc[val].children[1];
        // 控制是否是第二次点击
        if(val==this.state.ifshow){
            thisdirection.setAttribute('src',triangleR);
            thisul.setAttribute('style','display: none');
        }else{
            thisdirection.setAttribute('src',triangleL);
            thisul.setAttribute('style','display: block');
        }

        
        this.setState({
            ifshow:val
        })
    }
    menucont(val,inde){
        // 获取第几个大li被点击了
        let ifshow = this.state.ifshow;
        // 所有第二层li
        let docli = document.querySelectorAll("li.twoli");
        for(var i=0;i<docli.length;i++){
            docli[i].setAttribute('style','background-color: none;');
        }
        // 改变受点击的li的背景颜色
        var doc = document.querySelectorAll("li.sub-menu")[ifshow].children[1].children[inde].setAttribute('style','background-color: rgba(12,62,94,1);')



    }
    render() {   
        const _this=this;    
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
              {/* 下拉导航 remoteSensing */}
                <div id="leftside-navigation">
                    <ul className="nano-content" id="nano-content"
                        style={{ background:`url('${ menubg }') 100% 100% / cover no-repeat`,border:'none'}}>
                        { this.state.remoteSensing.map(function(spatidata,keys){
                            return (
                                <li className="sub-menu" key={keys}>
                                    <div className="onetitle"
                                    onClick={_this.shrink.bind(_this,keys)}>
                                        <div className="num">{ spatidata.children.length }</div>
                                        <div className="titlecontent">{ spatidata.name }</div>
                                        <img className="directionimg" src={ triangleR } />
                                    </div>
                                    
                                    <ul className="twoul">
                                        {spatidata.children?spatidata.children.map(function(item2,key2){
                                            return ( 
                                                <li key={key2} className="twoli">
                                                    <div onClick={_this.menucont.bind(_this,item2,key2)}>
                                                    { item2 }
                                                    </div>
                                                </li>
                                            )
                                        }):""}
                                    </ul>
                                </li>
                            )
                        }) }
                    </ul>
                </div>

              {/* <List className='listitem'>
                    <List.Item key='ItemLandform' onClick={()=>this.insar('topographic')}>地形地貌</List.Item>
                    <List.Item key='ItemInsar' onClick={()=>this.insar('INSAR')}>INSAR</List.Item>
                    <List.Item key='ItemDestru' onClick={()=>this.insar('land')}>土地损毁与复垦</List.Item>
                </List> */}
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