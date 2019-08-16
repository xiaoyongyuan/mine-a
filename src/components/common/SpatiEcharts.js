import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import menubg from '../../style/imgs/menubg.png'


export default class SpatiEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    componentWillMount(){
        var option = {
            backgroundColor:"rgba(0,0,0,0)",
            color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
            // title: {
            //     text: '网络/安全设备',
            //     left: '60',
            //     top: 0,
            //     textAlign: 'center',
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         fontWeight: 0
            //     }
            // },
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
                // x: "right",
                top: "center",
                // right: "15",
                // bottom: "0%",
                // itemWidth: 0,
                // itemHeight: 0,
                // itemGap: 0,
                // textStyle: {
                //     color: '#A3E2F4',
                //     fontSize: 12,
                //     fontWeight: 0
                // },
                data: ['IDS', 'VPN', '交换机', '防火墙', 'WAF', '堡垒机']
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
                // labelLine: {
                //     normal: {
                //         show: false,
                //         length: 30,
                //         length2: 55
                //     },
                //     emphasis: {
                //         show: false
                //     }
                // },
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
                // labelLine: {
                //     normal: {
                //         show: false,
                //         length: 30,
                //         length2: 55
                //     },
                //     emphasis: {
                //         show: false
                //     }
                // },
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
                radius: ['0%', '80%'],
                roseType: 'area',
                zlevel:0,
                label: {
                    normal: {
                        show: true,
                        formatter: "{c}",
                        textStyle: {
                            fontSize: 12,
                        },
                        // position: 'inside'
                        position: 'inside'
                    },
                    // emphasis: {
                    //     show: false
                    // }
                },
                // labelLine: {
                //     normal: {
                //         show: false,
                //         length: 20,
                //         length2: 55
                //     },
                //     emphasis: {
                //         show: false
                //     }
                // },
                data: [{
                        value: 10,
                        name: 'IDS'
                    },
                    {
                        value: 5,
                        name: 'VPN'
                    },
                    {
                        value: 15,
                        name: '交换机'
                    },
                    {
                        value: 25,
                        name: '防火墙'
                    },
                    {
                        value: 20,
                        name: 'WAF'
                    },
                    {
                        value: 35,
                        name: '堡垒机'
                    }
                ]
            }, ]
        }
        this.setState({
            option:option
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
