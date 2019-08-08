import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';

var myColor = ['#552967', '#1c459d', '#037ffe', '#1c9544', '#f9da15', '#d15705', '#e62920'];
export default class BaseEchart extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{
                backgroundColor:'rgba(0,0,0,.3)',
                grid: {
                    left: '5%',
                    top: '12%',
                    right: '10%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: [{
                    show: false,
                }],
                yAxis: [{
                    axisTick: 'none',
                    axisLine: 'none',
                    offset: '10',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '12',
                        }
                    },
                    
                    data: ['南坪', '工贸', '石桥铺', '沙坪坝', '嘉州路', '红旗河沟', '两路口']
                }, {
                    axisTick: 'none',
                    axisLine: 'none',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '0',
                        }
                    },
                    data:[10,9,8,7,6,5,4]
                }, {
                    name: '',
                    nameGap: '30',
                    nameTextStyle: {
                        color: '#ffffff',
                        fontSize: '20',
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: [],
                }],
                series: [{
                        name: '条',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: [6647, 7473, 8190, 8488, 9491, 11726, 12745],
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '12',
                                }
                            }
                        },
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                            }
                        },
                        z: 2
                    }, {
                        name: '白框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                                color: '#0e2147',
                                barBorderRadius: 2,
                            }
                        },
                        z: 1
                    }, {
                        name: '外框',
                        type: 'bar',
                        yAxisIndex: 2,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100, 100, 100],
                        barWidth: 14,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                                barBorderRadius: 2,
                            }
                        },
                        z: 0
                    },
                    {
                        name: '外圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0, 0, 0, 0, 0, 0, 0],
                        yAxisIndex: 1,
                        // 圆圆大小
                        symbolSize: 15,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                },
                                opacity: 1,
                            }
                        },
                        z: 2
                    }
                ]
            }
        };
    }
    componentWillMount(){

    }
    render() {
        return (
            <div>
                <ReactEcharts 
                 option={this.state.option}
                 style={{width:"100%",height:"300px"}}
                 />
            </div>
        )
    }
}
