import React, { Component } from 'react';
import moment from 'moment';
import Itemshow from './Itemshow';
import { Icon} from 'antd'
import ArcGISMap from './ArcGISMap';
import Pandect from './Pandect';
import Monitor from './Monitor';
import Gis from './Gis';
import Prodect from './Prodect';

import logo from '../../style/imgs/logo.png';
import globa from '../../style/imgs/globa.png';
import pointer from '../../style/imgs/pointer.png';
import hometitle from '../../style/imgs/hometitle.png';


import './mapshow.less'
class MapShow extends Component {
    constructor(props){
        super(props);
        this.state={ 
            leftLayer:true,
            showitem:'pandect', 
            activepointer:'activepandect',
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        const _this=this;
        //30秒循环一次
        setInterval(()=>{
                _this.setState({systime:moment().format('YYYY-MM-DD hh:mm:ss')})
        },30000)


    }
    clickbtn=(val)=>{
        this.setState({showitem:val,activepointer:'active'+val})
    }
    trigger=()=>{
        const tigclose=this.state.tigclose;
        this.setState({tigclose:!tigclose})
    }

    render() {
        return (
            <div className="MapShow">
                <div className="hometitle">
                    <img src={hometitle} width="100%" />
                </div>
                <div className="arcgis">
                    <ArcGISMap />
                </div>
                <div className="leftmove" style={this.state.tigclose?{transform:'translateX(-100%)'}:null} >
                <div className="leftLayer" style={this.state.tigclose?{transform:'translateX(-100%)'}:null}>
                    <div className="leftmeun">
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
                            <a href="#/main/scheme" className='filledsty'>
                                <Icon type="ellipsis" />
                            </a>
                        </div>
                    </div>
                    <div className="rightshow">
                        <div className="headlogo">
                            <img src={logo} />
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
                                <div className='centericon'><img src={globa}  /></div>
                                <div className={'pointer '+this.state.activepointer }><img src={pointer}  /></div>
                                <div className={this.state.showitem=='pandect'?'showitem rounditem pandect':'rounditem pandect'} onClick={()=>this.clickbtn('pandect')}>系统总览</div>
                                <div className={this.state.showitem=='monitor'?'showitem rounditem monitor':'rounditem monitor'} onClick={()=>this.clickbtn('monitor')}>监测数据</div>
                                <div className={this.state.showitem=='gis'?'showitem rounditem gis':'rounditem gis'} onClick={()=>this.clickbtn('gis')}>遥感监测</div>
                                <div className={this.state.showitem=='prodect'?'showitem rounditem prodect':'rounditem prodect'} onClick={()=>this.clickbtn('prodect')}>项目管理</div>
                            </div>
                        </div>
                        <div className="itemshow">
                            <div className="Itemshow">
                            {this.state.showitem=='pandect'?<Pandect />:null}
                            {this.state.showitem=='monitor'?<Monitor />:null}
                            {this.state.showitem=='gis'?<Gis />:null}
                            {this.state.showitem=='prodect'?<Prodect />:null}   
                            </div>
                            {/*<Itemshow showitem={this.state.showitem} />  */} 
                        </div> 
                    </div>               
                </div>
                {/*<div className="trigger" onClick={this.trigger}>
                                    <div className="triggercont"><Icon type={this.state.tigclose?'double-right':'double-left'} /></div>
                                </div>*/}
                </div>
            </div>
        );
    }
}
export default MapShow