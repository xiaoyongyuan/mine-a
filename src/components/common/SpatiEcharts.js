import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
import menubg from '../../style/imgs/menubg.png'


export default class SpatiEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    componentDidMount(){
        homeSystemMonitoring.spatialan()
        .then(res => {
            console.log("空间分析",res);
            var data1 = [];
            var data2 = [];
            res.data.forEach(function(al,index){
                data1.push(al.DNAME);
                data2.push({
                    value: al.LAYERITEMTYPENUM,
                    name: al.DNAME
                });
            })
            
            var option = {
                backgroundColor:"rgba(0,0,0,0)",
                color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
                grid: {
                    left: -100,
                    top: 10,
                    bottom: 10,
                    right: 10,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    type: "scroll",
                    orient: "vartical",
                    show: false,
                    top: "center",
                    data: data1
                },
                polar: {},
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgb(67, 241, 218)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "rgb(67, 241, 218)",
                        margin: 5,
                        fontSize: 16
                    },
                },
                radiusAxis: {
                    min: 40,
                    max: 120,
                    interval: 20,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgb(67, 241, 218)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 0, 0],
                        color: "#0B3E5E",
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgb(67, 241, 218)",
                            width: 1,
                            type: "solid"
                        }
                    }
                },
                calculable: true,
                series: [{
                    type: 'pie',
                    radius: ["5%", "6%"],
                    hoverAnimation: false,
                    data: [{
                        name: '',
                        value: 0,
                        itemStyle: {
                            normal: {
                                color: "rgb(67, 241, 218)"
                            }
                        }
                    }]
                }, {
                    type: 'pie',
                    radius: ["80%", "81%"],
                    hoverAnimation: true,
                    name: "",
                    data: [{
                        name: '',
                        value: 0,
                        itemStyle: {
                            normal: {
                                color: "rgb(67, 241, 218)"
                            }
                        }
                    }]
                },{
                    stack: 'a',
                    type: 'pie',
                    radius: ['20%', '80%'],
                    roseType: 'area',
                    zlevel:0,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}",
                            textStyle: {
                                fontSize: 12,
                            },
                            position: 'inside'
                        },
                    },
                    data: data2
                }, ]
            }
            this.setState({
                option:option
            })
            
        })

        
    }
    render() {
        return (
            <div
            style={{width:"200px",height:"200px",background:`url('${ menubg }') 100% 100% / cover no-repeat`}}>
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"200px",height:"200px"}}
                  /> 
            </div>
        )
    }
}
