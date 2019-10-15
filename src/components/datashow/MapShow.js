import React, { Component } from 'react';
import moment from 'moment';
import {Icon, message,Modal,Tag } from 'antd'
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
import cameraone from '../../style/imgs/cameraone.png';
import cameratwo from '../../style/imgs/cameratwo.png';
import axios from "../../axios";
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CleanLayers,Allroad,Core,Cameras,HistoryEveryone } from '../../actions/postActions';
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
            // 时间轴
            // timelist:[
            //     "2017-10","2017-12","2017-3","2017-4",
            // ],
            // 第几个时间被点击了
            timeindex:0,
            // 历史图层
            historicalLayer:{},
            // 上一图层
            Lastlayer:-1,
            // 当前图层
            layer:-1,
            // 下一图层
            Nextlayer:-1,
            // 标签颜色
            tagcolor:["magenta","red","volcano","orange","gold","lime","green","cyan","blue","geekblue","purple"],
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
        
        // 历史图层，设置时间轴初始状态
        // let elmfa=document.getElementsByClassName("timepf");
        // let child=elmfa[0].childNodes[this.state.timeindex];
        // console.log(child);
        // child.className = 'newStyle'


    }
    // 四个菜单被点击
    clickbtn=(val)=>{
        this.props.CleanLayers(0);

        this.setState({showitem:val,activepointer:'active'+val});
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
        // 促发redux,清理图层
        this.props.CleanLayers(0);

    };
    reduxCleanLayers(){
        // 促发redux,清理图层
        this.props.CleanLayers(0);
    }
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
    // 点击各个时间轴（历史图层）
    Timep=(item,keys)=>{
        // console.log(keys);
        // 上一图层
        let Lastlayer=keys-1;
        // 当前图层
        let layer=keys;
        // 下一图层
        let Nextlayer=keys+1;
        if(keys==0){
            Lastlayer=0;
        }
        if(keys==this.state.historicalLayer.map.length-1){
            Nextlayer=this.state.historicalLayer.map.length-1;
        }

        // let elmfa=document.getElementsByClassName("timepf");
        let timeAxis=document.getElementsByClassName("timeAxis");
        let childs=timeAxis[0].childNodes;
        for (var i = 0; i < childs.length; i++) {
            childs[i].classList.remove("newStyle")
        }

        this.setState({
            timeindex:keys,
            Lastlayer,
            layer,
            Nextlayer,
        },()=>{
            childs[this.state.timeindex].className = 'newStyle';
            // let elmfa=document.getElementsByClassName("timepf");

            // if(this.state.timeindex<3){
            //     elmfa[0].style.left = '0px';
            // }else if((this.state.timelist.length - this.state.timeindex)<6){
            //     elmfa[0].style.right = '0px';
            // }else{
            //     elmfa[0].style.left = "-"+(this.state.timeindex-3)*100 + "px";
            // }
        })


        console.log(item);
        this.props.HistoryEveryone(item);


    }

    componentWillReceiveProps(nextProps,nextState){
        console.log(nextProps);
        console.log(nextState);
        

        if(nextProps.identify=="historicalLayer"){
             let Lastlayer;
             let layer;
             let Nextlayer;
            if(nextProps.historicalLayer.map.length>=1){
                // 上一图层
                Lastlayer=0;
                // 当前图层
                layer=0;
                // 下一图层
                Nextlayer=1;
                if(nextProps.historicalLayer.map.length==1){
                    Nextlayer=0;
                }
            }
            

           
            
            this.setState({
                historicalLayer:nextProps.historicalLayer,
                // 上一图层
                Lastlayer,
                // 当前图层
                layer,
                // 下一图层
                Nextlayer,
            },()=>{
                if(this.state.historicalLayer.ifmany==true && this.state.historicalLayer.map.length>=1){
                    let timeAxis=document.getElementsByClassName("timeAxis")[0].childNodes[this.state.layer].click();
                }
            });
        }
    }
    // 上一个图层
    previous(){
        if(this.state.layer!=0){
            let timeAxis=document.getElementsByClassName("timeAxis")[0].childNodes[this.state.Lastlayer].click();
        }
    }
    // 下一个图层
    next(){
        if(this.state.layer!=this.state.historicalLayer.map.length-1){
            let timeAxis=document.getElementsByClassName("timeAxis")[0].childNodes[this.state.Nextlayer].click();
        }
    }

    render() {
        let _this=this;
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
                            {/* reduxCleanLayers */}
                                <a href="#/pandect/mapshow" className='filledsty filledact' onClick={()=>this.reduxCleanLayers()}>
                                    <Icon type="home" />
                                </a>
                                <a href="#/main/userinfo" className='filledsty' onClick={()=>this.reduxCleanLayers()}>
                                    <Icon type="user" />
                                </a>
                                <a href="#/main/companyinfo" className='filledsty' onClick={()=>this.reduxCleanLayers()}>
                                    <Icon type="setting" />
                                </a>
                                <a className='filledsty' onClick={this.hanleClose}>
                                    <Icon type="poweroff" />
                                </a>
                                <a href="#/main/scheme" className='filledsty' onClick={()=>this.reduxCleanLayers()}>
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
                                    <div className={this.state.showitem==='monitor'?'showitem rounditem monitor':'rounditem monitor'} onClick={()=>this.clickbtn('monitor')}>监测数据</div>
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

                {/* 历史图层 */}
                {this.props.historicalLayer.ifmany==true && this.props.historicalLayer.map.length>=1?
                <div>
                    <div className="previous" onClick={_this.previous.bind(_this)}>&lt;&lt;</div>
                    <div className="next" onClick={_this.next.bind(_this)}>&gt;&gt;</div>
                    <div className="timeAxis" style={{width:this.props.historicalLayer.map.length * 120 + "px"}}>
                        {/* <div className="timepf" style={{width:this.state.timelist.length * 100 + "px"}}> */}
                        {this.props.historicalLayer.map.map(function(item,keys){
                            return (
                                <p key={keys} onClick={_this.Timep.bind(_this,item,keys)}>{item.title}</p>
                            )
                        })}
                        {/* </div> */}
                    </div>
                    <div className="layerManager">
                        <div className="title">图层管理器</div>
                        <div className="">
                            <h3>历史图层</h3>
                            {this.props.historicalLayer.map.map(function(item,keys){
                                return (
                                    <Tag key={keys} color={_this.state.tagcolor[keys%11]} onClick={_this.Timep.bind(_this,item,keys)}>{item.title}</Tag>
                                )
                            })}
                        </div>
                        
                    </div>
                </div>
                :null
                 } 




                {/* 摄像头 */}
                <div className="camerafa">
                    {this.props.camera==1?

                    <img src={cameratwo} alt="" onClick={()=>this.camerafa(2)}/>
                    :
                    <img src={cameraone} alt="" onClick={()=>this.camerafa(1)}/>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
  camera: state.posts.camera,
  historicalLayer: state.posts.historicalLayer,
  identify: state.posts.identify,
})

MapShow.propTypes = {
    CleanLayers: PropTypes.func.isRequired,
    Allroad: PropTypes.func.isRequired,
    Core: PropTypes.func.isRequired,
    Cameras: PropTypes.func.isRequired,
    HistoryEveryone: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { CleanLayers,Allroad,Core,Cameras,HistoryEveryone })(MapShow); 