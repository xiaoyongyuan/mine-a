import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'
import './mapshow.less'
class Pandect extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){


    }


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
            text:"4xx4xx4xx4xx4xx",
        },{
            code:5,
            text:"5xx",
        },{
            code:6,
            text:"6xx",
        }]
        return (
            <div className="Pandect">
                <div className="pandectitem">
                    <List className='listitem' style={{marginLeft:'30px',marginRight:'30px'}}>
                        <List.Item key='ItemBaseData'><i className="actionfont action-shujuzonglan"></i> 基础数据</List.Item>
                        <List.Item key='ItemEquip'><i className="actionfont action-101"></i> 监测设备</List.Item>
                        <List.Item key='ItemYg'><i className="actionfont action-shebeiguanli"></i> 遥感监测</List.Item>
                        <List.Item key='ItemAlilse'><i className="actionfont action-jichushujuguanli"></i> 空间分析</List.Item>
                        <List.Item key='ItemMangeer'><i className="actionfont action-guanli1"></i> 图层管理</List.Item>
                        <List.Item key='ItemDh'><i className="actionfont action-daohang"></i> 矿区导航</List.Item>
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
        );
    }
}
export default Pandect