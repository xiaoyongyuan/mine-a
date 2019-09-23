import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Monitoringdatas,CleanLayers,changelayers } from '../../actions/postActions';
// 山水林田湖草
import ecologyshan from "../../style/imgs/ecologyshan.png";
import ecologyshui from "../../style/imgs/ecologyshui.png";
import ecologylin from "../../style/imgs/ecologylin.png";
import ecologytian from "../../style/imgs/ecologytian.png";
import ecologyhu from "../../style/imgs/ecologyhu.png";
import ecologycao from "../../style/imgs/ecologycao.png";

import './mapshow.less';

import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Monitor extends Component {
    constructor(props){
        super(props);
        this.state={ 
            netlist:[],
            iconlist:["red","orange","yellow","green","blue","indigo","purple","gray"],
            changetype:"1",
            ecologylist:["山","水","林","田","湖","草"],
            ecologycolo:["#037ffe","#e62920","#d15705","#1c9544"," #3671ec","#ac4ed3"],
            showdata:"1"
            
        };
    }
    componentWillUnmount(){
        // 促发清空图层
        this.props.CleanLayers(0);
    }

    componentDidMount(){
        homeSystemMonitoring.monitoringdata({layertype:3})
        .then(res=>{
            console.log(res);
            this.setState({
                netlist:res.data
            })
        })
    }
    // 点击各个监测网，促发redux
    monitoring(val){
        this.props.Monitoringdatas(val);
    }
    // 山水。。。
    changelayer(val){
        // console.log(val);
        this.props.changelayers(val);
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    //     // this.setState({
    //     //     animationName:"animated fadeOutRight"
    //     // })
    // }
    showfun(val){
        this.setState({
            showdata:val
        })
    }


    render() {
        let _this=this;
        let imglist=[ecologyshan,ecologyshui,ecologylin,ecologytian,ecologyhu,ecologycao];
        let ecologycolo=["#037ffe","#e62920","#d15705","#1c9544"," #3671ec","#ac4ed3"];
        let url=[
        "https://www.beidouhj.com/server/rest/services/Hosted/chengjiang_jiance1/FeatureServer",
        "https://www.beidouhj.com/server/rest/services/Hosted/hlg_xingbian_jiance/FeatureServer",
        "https://www.beidouhj.com/server/rest/services/Hosted/chengjiang_jiance1/FeatureServer",
        "https://www.beidouhj.com/server/rest/services/Hosted/hlg_xingbian_jiance/FeatureServer",
        "https://www.beidouhj.com/server/rest/services/Hosted/chengjiang_jiance1/FeatureServer",
        "https://www.beidouhj.com/server/rest/services/Hosted/hlg_xingbian_jiance/FeatureServer",
        ]
        return (
            <div className="Monitor">
            <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="left"
            >

              <div key="amache" className="animated fadeInLeftBig" >

                <dl className="columndl">
                    <dt className="columndt">
                        {this.state.showdata=="1"?<span style={{color:"white"}}>生态监测</span>:<span onClick={_this.showfun.bind(_this,1)}>生态监测</span>}
                        <span className="columndtright"></span>
                    </dt>
                    <dt className="columndt">
                        {this.state.showdata=="2"?<span style={{color:"white"}}>地质监测网</span>:<span onClick={_this.showfun.bind(_this,2)}>地质监测网</span>}
                        <span className="columndtright"></span>
                    </dt>
                    <dt className="columndt">
                        {this.state.showdata=="3"?<span style={{color:"white"}}>环境监测</span>:<span onClick={_this.showfun.bind(_this,3)}>环境监测</span>}
                        <span className="columndtright"></span>
                    </dt>
                </dl>


                
                {this.state.showdata=="1"?
                    <dl className="columndl">
                        <List className='listitem'>
                            {
                                this.state.ecologylist.map(function(item,i){
                                    return (
                                        <List.Item 
                                        style={{position:'relative',display:'flex',justifyContent:"space-around",alignItems:"center"}} key={'Item'+i}>
                                            <div style={{display:'flex',justifyContent:"space-around",alignItems:"center"}}
                                            onClick={_this.changelayer.bind(_this,url[i])}>
                                                <img style={{width:"50px",height:"50px",display:"block"}} src={imglist[i]} alt=""/>
                                                <div style={{width:"50px",marginLeft:"20px",color:`${ecologycolo[i]}`,fontSize:"16px",fontWeight:"bold"}}>{item}</div>
                                            </div>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </dl>
                :null
                }
                
                {this.state.showdata=="2"?
                    <dl className="columndl">
                        <List className='listitem'>
                            {
                                this.state.netlist.map(function(item,i){
                                    return (
                                        <List.Item 
                                        onClick={_this.monitoring.bind(_this,item)}
                                        style={{textAlign:'left',paddingLeft:'35px',position:'relative'}} key={'Item'+i}>
                                        <span className={'micon micon'+_this.state.iconlist[i%8]} /> {item.layername}
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </dl>
                :null
                }

                {this.state.showdata=="3"?
                    <dl className="columndl">
                        <List className='listitem'>
                            <List.Item 
                            style={{textAlign:'center',position:'relative'}}>
                            空 气
                            </List.Item>
                            <List.Item 
                            style={{textAlign:'center',position:'relative'}}>
                            气 象
                            </List.Item>
                            <List.Item 
                            style={{textAlign:'center',position:'relative'}}>
                            植 被
                            </List.Item>
                            <List.Item 
                            style={{textAlign:'center',position:'relative'}}>
                            防 火
                            </List.Item>
                        </List>
                    </dl>
                :null
                }

                    



                <dl className="columndl">
                    <dt className="columndt">监测设备</dt>
                    <div className="egraph">
                        <Egraph dataHeight='150' cahrtp='columnar' />  
                    </div>
                </dl>



              </div>
            </ReactCSSTransitionGroup>
                
                
            </div>
        );
    }
}

Monitor.propTypes = {
    Monitoringdatas: PropTypes.func.isRequired,
    CleanLayers: PropTypes.func.isRequired
}


export default connect(null, { Monitoringdatas,CleanLayers,changelayers })(Monitor); 