import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon,List,Card,Progress,Typography } from 'antd'

import './mapshow.less'
const { Paragraph } = Typography;
class Itemshow extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){
        const carouselpart=document.getElementById('carouselpart');
        setInterval(()=>{
                
        },1000)

    }
    warnico=(type)=>{ //预警颜色
        switch(type){
            case 1:
                return 'warnico greenbg'
            case 2:
                return 'warnico redbg'
            case 3:
                return 'warnico bluebg'
            default:
                return 'warnico'
        }

    }

    render() {
        const warnlist=[{
            code:1,
            text:"1xx点超过预警值",
        },{
            code:2,
            text:"2xx点超过预警值",
        },{
            code:3,
            text:"3xx点超过预警值",
        },{
            code:4,
            text:"4xx点超过预警值",
        },{
            code:5,
            text:"5xx点超过预警值",
        },{
            code:6,
            text:"6xx点超过预警值",
        },]
        const netlist=[{
            code:1,
            text:"形变沉降监测网",
        },{
            code:3,
            text:"地形地貌监测网",
        },{
            code:4,
            text:"土地损毁监测网",
        },{
            code:7,
            text:"土壤环境监测网",
        },{
            code:2,
            text:"地裂缝监测网",
        },{
            code:5,
            text:"地下水监测网",
        },{
            code:6,
            text:"地表水监测网",
        },{
            code:8,
            text:"雨量监测网",
        }]
        const prodectsch=[{
            code:1,
            text:"监测方案",
            num:46,
        },{
            code:2,
            text:"监测规划",
            num:26,
        },{
            code:4,
            text:"评估报告",
            num:89,
        },{
            code:5,
            text:"调查报告",
            num:76,
        },{
            code:6,
            text:"勘察报告",
            num:54,
        },{
            code:7,
            text:"设计报告",
            num:74,
        },{
            code:8,
            text:"施工报告",
            num:98,
        },{
            code:9,
            text:"施工监理",
            num:44,
        },{
            code:10,
            text:"治理方案",
            num:8,
        },{
            code:11,
            text:"项目验收",
            num:1,
        },]
        return (
            <div className="Itemshow">
                <div className="pandectitem" style={{display:this.props.showitem=='pandect'?'block':'none'}}>
                    <List bordered>
                        <List.Item key='Item1'>基础数据</List.Item>
                        <List.Item key='Item2'>监测设备</List.Item>
                        <List.Item key='Item3'>遥感监测</List.Item>
                        <List.Item key='Item4'>空间分析</List.Item>
                        <List.Item key='Item5'>图层管理</List.Item>
                        <List.Item key='Item6'>矿区导航</List.Item> 
                    </List>
                    <dl className="columndl">
                        <dt className="columndt">预警信息<a className="columndtright">更多<Icon type="right" /></a></dt>
                        <div className="carouselcol">
                        <div className="carouselpart" id="carouselpart">
                        {warnlist.map((item)=>(<dd className="columndd" key={'warn'+item.code}><Paragraph ellipsis><span className={this.warnico(item.code)}>[警]</span>{item.text}</Paragraph></dd>))}
                        </div>
                        </div>
                    </dl>
                    <Card title="矿区雨量">
                      
                    </Card>
                </div>
                <div className="pandectitem"  style={{display:this.props.showitem=='monitor'?'block':'none'}}>
                    <dl key='net' className="columndl">
                        <dt className="columndt">监测网<a className="columndtright">详情<Icon type="right" /></a></dt>
                        {netlist.map((item)=>(<dd className="columndd" key={'net'+item.code}>{item.text}</dd>))}
                    </dl>
                </div>
                <div className="pandectitem"  style={{display:this.props.showitem=='gis'?'block':'none'}}>
                    <List bordered>
                        <List.Item key='gis4'>地形地貌</List.Item>
                        <List.Item key='gis5'>insar</List.Item>
                        <List.Item key='gis6'>高光谱</List.Item> 
                        <List.Item key='gis2'>土地损毁与复垦</List.Item> 
                    </List>
                </div>
                <div className="pandectitem"  style={{display:this.props.showitem=='prodect'?'block':'none'}}>
                    <dl key='prodectcol' className="columndl">
                        <dt className="columndt">项目进度<a className="columndtright">详情<Icon type="right" /></a></dt>
                        {prodectsch.map((item)=>(<dd className="columndd" key={'prodects'+item.code}><span>{item.text} </span><span className='percentsty'><Progress percent={item.num} showInfo={false} /></span></dd>))}
                    </dl>
                </div>
            </div>
        );
    }
}
export default Itemshow