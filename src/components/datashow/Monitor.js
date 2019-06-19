import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon,List,Card,Progress,Typography } from 'antd'
import Egraph from './../common/Egraph'
import './mapshow.less'
class Monitor extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){


    }


    render() {
        const netlist=[{
            code:1,
            text:"形变沉降监测网",
            icon:"red",
        },{
            code:3,
            text:"地形地貌监测网",
            icon:"orange",
        },{
            code:4,
            text:"土地损毁监测网",
            icon:"yellow",
        },{
            code:7,
            text:"土壤环境监测网",
            icon:"green",
        },{
            code:2,
            text:"地裂缝监测网",
            icon:"blue",
        },{
            code:5,
            text:"地下水监测网",
            icon:"indigo",
        },{
            code:6,
            text:"地表水监测网",
            icon:"purple",
        },{
            code:8,
            text:"雨量监测网",
            icon:"gray",
        }]
        
        return (
            <div className="Monitor">
                <dl className="columndl">
                    <dt className="columndt">监测网<a className="columndtright"></a></dt>
                    <List className='listitem'>
                    {netlist.map((item,i)=>(<List.Item style={{textAlign:'left',paddingLeft:'35px',position:'relative'}} key={'Item'+i}><span className={'micon micon'+item.icon} /> {item.text}</List.Item>))} 
                    </List>
                </dl>
                <dl className="columndl">
                    <dt className="columndt">监测设备</dt>
                    <div className="egraph">
                        <Egraph dataHeight='150' cahrtp='columnar' />  
                    </div>
                </dl>
            </div>
        );
    }
}
export default Monitor