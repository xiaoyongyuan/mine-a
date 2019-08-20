import React, { Component } from 'react'
import SpatiEcharts from '../common/SpatiEcharts'
import './Spatialanalyze.less'
import menubg from '../../style/imgs/menubg.png';
import triangleR from '../../style/imgs/triangleR.png';
import triangleL from '../../style/imgs/triangleL.png';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;




export default class Spatialanalyze extends Component {
    constructor(props){
        super(props);
        this.state={
            ifshow:-1,
            show:true,
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
    menucont(val){
        // 获取第几个大li被点击了
        let ifshow = this.state.ifshow;
        // 所有第二层li
        let docli = document.querySelectorAll("li.twoli");
        for(var i=0;i<docli.length;i++){
            docli[i].setAttribute('style','background-color: none;');
        }

        // 改变受点击的li的背景颜色
        var doc = document.querySelectorAll("li.sub-menu")[ifshow].children[1].children[val].setAttribute('style','background-color: rgba(12,62,94,1);')
        
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
                        <ul className="nano-content" id="nano-content"
                         style={{ background:`url('${ menubg }') 100% 100% / cover no-repeat`,border:'none'}}>
                            { this.state.spatidata.map(function(spatidata,keys){
                                return (
                                    <li className="sub-menu" key={keys}>
                                        <div className="onetitle"
                                        onClick={_this.shrink.bind(_this,keys)}>
                                            <div className="num">{ spatidata.MenuChildren.length }</div>
                                            <div className="titlecontent">{ spatidata.titlename }</div>
                                            <img className="directionimg" src={ triangleR } />
                                        </div>
                                        <ul className="twoul">
                                            {spatidata.MenuChildren.map(function(item2,key2){
                                                return (
                                                    <li key={key2} className="twoli">
                                                        <div onClick={_this.menucont.bind(_this,key2)}>
                                                        {item2.titlename}
                                                        </div>
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
