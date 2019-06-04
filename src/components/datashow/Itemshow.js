import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon,List,Card,Progress} from 'antd'


import './mapshow.less'
class Itemshow extends Component {
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
            text:"xx点超过预警值",
        },{
            code:2,
            text:"xx点超过预警值",
        },{
            code:3,
            text:"xx点超过预警值",
        },]
        const netlist=[{
            code:1,
            text:"形变监测网",
        },{
            code:2,
            text:"地裂缝监测网",
        },{
            code:3,
            text:"地形地貌监测网",
        },{
            code:4,
            text:"土地损毁与复垦监测网",
        },{
            code:5,
            text:"地下水监测网",
        },{
            code:6,
            text:"地表水监测网",
        },{
            code:7,
            text:"土地环境监测网",
        },{
            code:8,
            text:"雨量监测网",
        },]
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
            code:10,
            text:"项目验收",
            num:1,
        },]
        return (
            <div className="Itemshow">
                <div className="pandectitem" style={{display:this.props.showitem=='pandect'?'block':'none'}}>
                    <List bordered>
                        <List.Item key='Item1'>基础数据个数：<b>12</b>个</List.Item>
                        <List.Item key='Item2'>监测设备个数：<b>12</b>个</List.Item>
                        <List.Item key='Item3'>遥感监测图：<b>12</b>个</List.Item>
                        <List.Item key='Item4'>空间分析</List.Item>
                        <List.Item key='Item5'>图层管理</List.Item>
                        <List.Item key='Item6'>矿区导航</List.Item> 
                    </List>
                    <Card title="预警信息">
                      {warnlist.map((item)=>(<p key={item.code}>{item.text}</p>))}
                    </Card>
                    <Card title="矿区雨量">
                      
                    </Card>
                </div>
                <div className="pandectitem"  style={{display:this.props.showitem=='monitor'?'block':'none'}}>
                    <List key='netlist' bordered 
                        dataSource={netlist}
                        renderItem={item => (<List.Item key={item.code}>{item.text}</List.Item>)}
                    />
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
                    <List key='netlist' bordered 
                        dataSource={prodectsch}
                        renderItem={item => (<List.Item key={'pand'+item.code}><span>{item.text} </span><span className='percentsty'><Progress percent={item.num} showInfo={false} /></span></List.Item>)}
                    />
                </div>
            </div>
        );
    }
}
export default Itemshow