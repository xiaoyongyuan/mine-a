import React, { Component } from 'react';
import moment from 'moment';
import {Icon, message,Modal} from 'antd'
import ArcGISMap from './ArcGISMap';
import Pandect from './Pandect';
import Basedata from './basedata';
import Monitorequip from './monitorequip';
import Remotesensing from './remotesensing';
import Spatialanalyze from './spatialanalyze';
import Layermanagement from './Layermanagement';
import Miningnavigation from './Miningnavigation';
import Monitor from './Monitor';
import Gis from './Gis';
import Prodect from './Prodect';
import logo from '../../style/imgs/logonew.png';
import globa from '../../style/imgs/globa.png';
import pointer from '../../style/imgs/pointer.png';
import hometitle from '../../style/imgs/hometitle.png';
import camera from '../../style/imgs/camera.png';
import axios from "../../axios";
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CleanLayers,Allroad,Core,Cameras } from '../../actions/postActions';
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";


import './mapshow.less'
const confirm = Modal.confirm;
class MapShow extends Component {
    constructor(props){
        super(props);
        this.state={ 
            leftLayer:true,
            showitem:'pandect', 
            activepointer:'activepandect',
            display:'block',
            displaybasedata:'none',
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        const _this=this;
        //30秒循环一次
        setInterval(()=>{
                _this.setState({systime:moment().format('YYYY-MM-DD HH:mm:ss')})
        },30000)
    }
    clickbtn=(val)=>{
        this.props.CleanLayers(0);

        this.setState({showitem:val,activepointer:'active'+val});
        console.log(this);

        
    };
    trigger=()=>{
        const tigclose=this.state.tigclose;
        this.setState({tigclose:!tigclose})
    };
    leftmoveHidden=(val,params)=>{
        this.setState(
            {
                display:val,
                displaybasedata:'block',
                leftShow:params,
            },()=>{
                console.log("display",this.state.display,params);
                if(params=='miningnavigation'){
                    homeSystemMonitoring.miniNavigationlist({layertype:2,pageindex:this.state.pagenum,pagesize:this.state.everypage})
                    .then(res=>{
                        // 总路网信息resux
                        if(res.success && res.data.length>0){
                            this.props.Allroad(res.data[0].layerurl);
                        }
                    })
                }
            }
        )
    };
    
    leftmoveShow=(val)=>{
        this.setState(
            {
                display:val,
                displaybasedata:'none'
            },()=>{
                console.log("display",this.state.display);
            }
        )
        console.log(this);
        // 促发redux
        this.props.CleanLayers(0);

    };
    hanleClose=()=>{
        const _this=this;
        confirm({
            title: '退出',
            content: '确认退出吗？',
            onOk() {
                axios.logout({}).then((res)=>{
                    if(res.success){
                        localStorage.removeItem('token');
                        _this.props.history.push("/login")
                    }else message.error(res.msg)
                })
            },
        });
    };
    // 点击小地球回到中心点（redux）
    globa=(val)=>{
        this.props.Core(val);
    }
    // 摄像头
    camerafa=(val)=>{
        this.props.Cameras(val)
    }

    render() {
        return (
            <div className="MapShow">
                <div className="hometitle">
                    <img alt="" src={hometitle} width="100%" />
                </div>
                <div className="arcgis">
                    <ArcGISMap />
                </div>
                <div className="leftmove" style={this.state.tigclose?{transform:'translateX(-100%)'}:null} >
                    <div className="leftLayer" style={this.state.tigclose?{transform:'translateX(-100%)'}:null}>
                        <div className="leftmeun" style={{ display:this.state.display }}>
                            <div className='clickmeun'>
                                <a href="#/pandect/mapshow" className='filledsty filledact'>
                                    <Icon type="home" />
                                </a>
                                <a href="#/main/userinfo" className='filledsty'>
                                    <Icon type="user" />
                                </a>
                                <a href="#/main/companyinfo" className='filledsty'>
                                    <Icon type="setting" />
                                </a>
                                <a className='filledsty' onClick={this.hanleClose}>
                                    <Icon type="poweroff" />
                                </a>
                                <a href="#/main/scheme" className='filledsty'>
                                    <Icon type="ellipsis" />
                                </a>
                            </div>
                        </div>
                        <div className="rightshow" style={{ display:this.state.display }}>
                            <div className="headlogo">
                                <img alt="" src={logo} />
                            </div>
                            <div className="switchRound">
                                <div className='currentweek'>
                                    {moment(this.state.systime).format('dddd')}
                                    <br/>
                                    {moment(this.state.systime).format('YYYY-MM-DD')}
                                </div>
                                <div className='currenttime'>
                                    {moment(this.state.systime).format('HH:mm')}
                                </div>
                            </div>
                            <div className="roundBtn">
                                <div className="roundline">
                                    <div className='centericon'><img alt="" src={globa} onClick={()=>this.globa("core")} /></div>
                                    <div className={'pointer '+this.state.activepointer }><img alt="" src={pointer}  /></div>
                                    <div className={this.state.showitem==='pandect'?'showitem rounditem pandect':'rounditem pandect'} onClick={()=>this.clickbtn('pandect')}>系统总览</div>
                                    <div className={this.state.showitem==='monitor'?'showitem rounditem monitor':'rounditem monitor'} onClick={()=>this.clickbtn('monitor')}>生态监测</div>
                                    <div className={this.state.showitem==='gis'?'showitem rounditem gis':'rounditem gis'} onClick={()=>this.clickbtn('gis')}>遥感监测</div>
                                    <div className={this.state.showitem==='prodect'?'showitem rounditem prodect':'rounditem prodect'} onClick={()=>this.clickbtn('prodect')}>项目管理</div>
                                </div>
                            </div>
                            <div className="itemshow">
                                <div className="Itemshow">
                                    {this.state.showitem==='pandect'?<Pandect basedataShow={(params)=>this.leftmoveHidden('none',params)}/>:null}
                                    {this.state.showitem==='monitor'?<Monitor basedataShow={(params)=>this.leftmoveHidden('none',params)}/>:null}
                                    {this.state.showitem==='gis'?<Gis />:null}
                                    {this.state.showitem==='prodect'?<Prodect />:null}
                                </div>
                            </div>
                        </div>
                        <div className="basedataShow" style={{ display:this.state.displaybasedata }}>
                            <div className="backup" onClick={()=>this.leftmoveShow('block')}>
                                <div className="backupWord">
                                    返回上一层
                                    <Icon className="backupIcon" type="rollback" />
                                </div>
                            </div>
                            {this.state.leftShow === 'basedata' ? <Basedata /> : null}
                            {this.state.leftShow === 'monitorequip' ? <Monitorequip /> : null}
                            {this.state.leftShow === 'remotesensing' ? <Remotesensing /> : null}
                            {this.state.leftShow === 'spatialanalyze' ? <Spatialanalyze /> : null}
                            {this.state.leftShow === 'layermanagement' ? <Layermanagement /> : null}
                            {this.state.leftShow === 'miningnavigation' ? <Miningnavigation /> : null}
                        </div>
                    </div>
                </div>


                {/* 摄像头 */}
                <div className="camerafa" onClick={()=>this.camerafa('camera')}>
                    <img src={camera} alt=""/>
                </div>
            </div>
        );
    }
}

MapShow.propTypes = {
    CleanLayers: PropTypes.func.isRequired,
    Allroad: PropTypes.func.isRequired,
    Core: PropTypes.func.isRequired,
    Cameras: PropTypes.func.isRequired,
}



export default connect(null, { CleanLayers,Allroad,Core,Cameras })(MapShow); 