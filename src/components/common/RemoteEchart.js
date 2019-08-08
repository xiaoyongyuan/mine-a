import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';

var myColor = ['#552967', '#1c459d', '#037ffe', '#1c9544', '#f9da15', '#d15705', '#e62920'];
export default class BaseEchart extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    componentWillMount(){

    }
    render() {
        return (
            <div>
                遥感监测的echarts
                {/* <ReactEcharts  */}
                 {/* option={this.state.option} */}
                {/* //  style={{width:"100%",height:"300px"}} */}
                 {/* /> */}
            </div>
        )
    }
}
