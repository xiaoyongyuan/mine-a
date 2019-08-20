import React, { Component } from 'react'
import SpatiEcharts from '../common/SpatiEcharts'
import './Spatialanalyze.less'
import menubg from '../../style/imgs/menubg.png';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;




export default class Spatialanalyze extends Component {
    constructor(props){
        super(props);
        this.state={
            spatidata:[
                {id:1,titlename:"矢量空间分析",MenuChildren:[
                    {id:11,titlename:"1空间分析",url:"setdryugijosercvnj"},
                    {id:12,titlename:"2空间分析",url:"setdryugijosercvnj"},
                    {id:13,titlename:"3空间分析",url:"setdryugijosercvnj"},
                    {id:14,titlename:"4空间分析",url:"setdryugijosercvnj"}
                ]},
                {id:1,titlename:"栅格空间分析",MenuChildren:[
                    {id:21,titlename:"1栅格空间分析",url:"setdryugijosercvnj"},
                    {id:22,titlename:"2栅格空间分析",url:"setdryugijosercvnj"}
                ]},
                {id:1,titlename:"三维分析",MenuChildren:[
                    {id:31,titlename:"1三维分析",url:"setdryugijosercvnj"},
                    {id:32,titlename:"2三维分析",url:"setdryugijosercvnj"},
                    {id:33,titlename:"3三维分析",url:"setdryugijosercvnj"}
                ]},
                {id:1,titlename:"地统计分析",MenuChildren:[
                    {id:41,titlename:"1地统计分析",url:"setdryugijosercvnj"},
                    {id:42,titlename:"2地统计分析",url:"setdryugijosercvnj"},
                    {id:43,titlename:"3地统计分析",url:"setdryugijosercvnj"},
                    {id:44,titlename:"4地统计分析",url:"setdryugijosercvnj"}
                ]},
                {id:1,titlename:"水文分析",MenuChildren:[
                    {id:51,titlename:"1水文分析",url:"setdryugijosercvnj"},
                    {id:52,titlename:"2水文分析",url:"setdryugijosercvnj"},
                    {id:53,titlename:"3水文分析",url:"setdryugijosercvnj"},
                    {id:54,titlename:"4水文分析",url:"setdryugijosercvnj"},
                    {id:55,titlename:"5水文分析",url:"setdryugijosercvnj"}
                ]}
            ]
        };
    }
    // handleClick = e => {
    //     console.log('click ', e);
    // }
    shrink(tal,val){

        console.log("val",val);
        console.log("tal",tal);
        console.log("this",this);

    }

    render() {
        const _this=this;
        return (
            <div className="Spatialanalyze">
                <p className="myiconfont">
                    <span className="actionfont action-jichushujuguanli"></span><span>空间分析</span>
                </p>
                <div className="SpatialanalyzeAll">
                    {/* 标题 */}
                    <div className="spatiaTitle">
                        <div className="num">82</div>
                        <div className="titlename">空间分析</div>
                    </div>


                    {/* 下拉导航 */}
                    <div id="leftside-navigation">
                        <ul className="nano-content" id="nano-content">
                            { this.state.spatidata.map(function(spatidata,keys){
                                return (
                                    <li className="sub-menu" 
                                    onClick={_this.shrink.bind(_this,keys)}
                                    key={keys}>
                                        <a href="javascript:;">
                                            <span className="num">{ spatidata.MenuChildren.length }</span>
                                            <span>{ spatidata.titlename }</span>
                                            <i className="arrow fa fa-angle-right pull-right"></i>
                                        </a>
                                        <ul>
                                            {spatidata.MenuChildren.map(function(item2,key2){
                                                return (
                                                    <li key={key2}>
                                                        <a href="javascript:;">{item2.titlename}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>









                    {/* <div className="Menucont">
                        <Menu
                            onClick={this.handleClick.bind(this)}
                            style={{ width: '100%',background:`url('${ menubg }') 100% 100% / cover no-repeat`,border:'none'}}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                        {this.state.spatidata.map(function(spatidata,keys){
                            return (
                                <SubMenu
                                style={{ width:'100%',padding: "10px 0",backgroundColor:'rgba(0,0,0,0)' }}
                                key={ keys }
                                title={
                                    <div className="titleMenu">
                                        <div className="num">{ spatidata.MenuChildren.length }</div>
                                        <div className="titlename">{ spatidata.titlename }</div>
                                    </div>
                                }>
                                    {spatidata.MenuChildren.map(function(item2,key2){
                                        return (
                                            <Menu.Item 
                                            style={{ width:'100%', height: '50px',backgroundColor:'rgba(0,0,0,0)',color: 'white',fontSize: '16px', backgroundImage:`url('${ menubg }') 100% 100% / cover no-repeat`,margin:0,padding:0,border: 'none' }}
                                            key={key2}>
                                                {item2.titlename}
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        })}
                        </Menu>
                    </div> */}


                    {/* 空间分析成果占比 */}
                    <div className="columndl" style={{margin:'30px 0'}}>
                        <div className="columndt">空间分析成果占比</div>
                    </div>


                    {/* echarts */}
                    <SpatiEcharts />








                </div>
            </div>
        )
    }
}
