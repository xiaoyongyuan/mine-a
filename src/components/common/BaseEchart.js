import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";


import menubg from '../../style/imgs/menubg.png'

class BaseEchart extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:[],
            chartName:[],
            option:{}
        };
    }
    componentDidMount(){
       var _this=this;
        // 请求数据
        homeSystemMonitoring.basedatalist()
        .then(res => {
            var chartData = [];
            var chartName = [];
            res.data.forEach(function(al,index){
                chartData.push(parseInt(al.netnum));
                chartName.push(al.netname);
            })
            var myColor = ['#E9261C','#D25400','#F7DA16','#189542','#0480FE','#1C459D','#512465']

            var option = {
            
                backgroundColor: 'rgba(0,0,0,0)',
                grid: {
                    left: '10%',
                    right: '22%',
                    bottom: '10%',
                    top: '2%',
                    containLabel: true
                },
                xAxis: [{
                        show: false,
                    },
                    {
                        show: false,
                    }
                ],
                yAxis: {
                    type: 'category',
                    inverse: true,
                    show: false
                },
            
                series: [
            
                    //亮色条 百分比
                    {
                        show: true,
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: '20%',
                        z: 2,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length;
                                    return myColor[params.dataIndex % num]
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: 'white',
                                    fontSize: 16
                                },
                                position: 'right',
                                formatter: function(data) {
                                    return (chartData[data.dataIndex]);
                                }
                            }
                        },
                        data: chartData,
                    },
                    //年份
                    {
                        show: true,
                        type: 'bar',
                        xAxisIndex: 1, //代表使用第二个X轴刻度
                        barGap: '-100%',
                        barWidth: '10%',
                        itemStyle: {
                            normal: {
                                barBorderRadius: 200,
                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: [0, '-20'],
                                textStyle: {
                                    fontSize:14,
                                    color: 'white',
                                },
                                formatter: function(data) {
                                    
                                    return chartName[data.dataIndex];
                                }
                            }
                        },
                        data: chartData
                    }
                ]
            };
            _this.setState({
                option:option
            })
        });

    }
    render() {
        return (
            <div
            style={{width:"100%",height:"400px",background:`url('${ menubg }') 100% 100% / cover no-repeat`}}>
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"100%",height:"450px"}}
                  /> 
            </div>
        )
    }
}

export default BaseEchart; 