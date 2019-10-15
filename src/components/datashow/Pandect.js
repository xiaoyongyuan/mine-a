import React, { Component } from 'react';
import { List } from 'antd';
import Egraph from './../common/Egraph';
import './mapshow.less';
import "animate.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Pandect extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    //     // this.setState({
    //     //     animationName:"animated fadeOutRight"
    //     // })
    // }

    leftShowitem = (params) =>{
        const _this=this;
        _this.props.basedataShow(params);
    };
    render() {
        const warnlist=[{
            code:1,
            text:"1xx",
        },{
            code:2,
            text:"2xx",
        },{
            code:3,
            text:"3xx",
        },{
            code:4,
            text:"4xx",
        }];
        return (
            
            <div className="Pandect">
            <ReactCSSTransitionGroup
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="left"
            >
              <div key="amache" className="animated fadeInLeftBig" >
                <div className="c">
                    <List className='listitem' style={{marginLeft:'30px',marginRight:'30px'}}>
                        <List.Item key='ItemBaseData' onClick={()=>this.leftShowitem('basedata')}><i className="actionfont action-shujuzonglan" /> 基础数据</List.Item>
                        <List.Item key='ItemEquip' onClick={()=>this.leftShowitem('monitorequip')}><i className="actionfont action-101" /> 监测设备</List.Item>
                        <List.Item key='ItemYg' onClick={()=>this.leftShowitem('remotesensing')}><i className="actionfont action-shebeiguanli" /> 遥感监测</List.Item>
                        <List.Item key='ItemAlilse' onClick={()=>this.leftShowitem('spatialanalyze')}><i className="actionfont action-jichushujuguanli" /> 空间分析</List.Item>
                        <List.Item key='ItemMangeer' onClick={()=>this.leftShowitem('layermanagement')}><i className="actionfont action-guanli1" /> 图层管理</List.Item>
                        <List.Item key='ItemDh' onClick={()=>this.leftShowitem('miningnavigation')}><i className="actionfont action-daohang" /> 矿区导航</List.Item>
                        {/*<List.Item key='ItemBaseData'><i className="actionfont action-shujuzonglan" /> 基础数据</List.Item>*/}
                        {/*<List.Item key='ItemEquip'><i className="actionfont action-101" /> 监测设备</List.Item>*/}
                        {/*<List.Item key='ItemYg'><i className="actionfont action-shebeiguanli" /> 遥感监测</List.Item>*/}
                        {/*<List.Item key='ItemAlilse'><i className="actionfont action-jichushujuguanli" /> 空间分析</List.Item>*/}
                        {/*<List.Item key='ItemMangeer'><i className="actionfont action-guanli1" /> 图层管理</List.Item>*/}
                        {/*<List.Item key='ItemDh'><i className="actionfont action-daohang" /> 矿区导航</List.Item>*/}
                    </List>
                    <dl className="columndl">
                        <dt className="columndt">预警信息<a className="columndtright"></a></dt>
                        <div className="carouselcol">
                            <div className="carouselpart" id="carouselpart">
                               {warnlist.map((item,i)=>(<dd className="columndd bluewarn" key={'warn'+item.code}><span className='mintitle'>{i+1}.{item.text}</span><span className='mintext'> 点超过预警值</span></dd>))} 
                            </div>
                        </div>
                    </dl>
                    <div className="columndl" style={{marginBottom:'10px'}}>
                        <div className="columndt">矿区雨量</div>
                        <div className="egraph">
                           <Egraph key='fuk' dataHeight='150' cahrtp='brokenline' /> 
                        </div>
                    </div>
                </div>
              
                   





               </div>
             </ReactCSSTransitionGroup>

                
            </div>
        );
    }
}
export default Pandect