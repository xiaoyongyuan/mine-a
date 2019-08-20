import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import homeSystemMonitoring from '../../axios/homeSystemMonitoring'
import RemoteEchartgd from '../../style/imgs/RemoteEchartgd.png'

export default class MonitorequipEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    // 算监测设备总数,算监测设备在线数
    totalnums(arr,some){
        var s = 0;
        arr.forEach(function(val, idx, arr) {
          s +=  parseInt(val[some]);
        }, 0);
        return s;
    }

    componentWillMount(){
        homeSystemMonitoring.monitoring()
        .then(res=>{
            console.log(res);
            // #0E2147

            //   算监测设备总数
            let sums1 = this.totalnums(res.data,'totalnum');
            // 算监测设备在线数 Online
            let sums2 = this.totalnums(res.data,'onlinenum');


            // 组装val1data2数据
            let val1data2=[]
            res.data.forEach(function(val, idx) {
                // s +=  parseInt(val.some);
                val1data2.push({
                    value: val.onlinenum/val.totalnum,
                    name: val.netname,
                })
            });
            var arr = ['middleLost', sums2/sums1, val1data2, '设备在线率']
            var option = {
                title: {
                    top: '45%',
                    left: 'center',
                    text: arr[3],
                    textStyle: {
                        color: '#0C3E5E',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 14
                    },
                    subtext: (arr[1] * 10000 / 100).toFixed(2) + '%',
                    subtextStyle: {
                        color: '#0C3E5E',
                        fontSize: 12
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(res2) {
                        if (res2.componentSubType == 'liquidFill') {
                            return res2.seriesName + ': ' + (res2.value * 10000 / 100).toFixed(2) + '%';
                        } else {
                            return '<span class="ii" style="background:' + res2.color + ' "></span>' + res2.name + ':<br/> ' + res2.data.value + '%';
                        }
                    }
                },
                series: [{
                        type: 'liquidFill',
                        itemStyle: {
                            normal: {
                                opacity: 0.6,
                                shadowBlur: 0,
                                shadowColor: 'rgba(0,0,0,0)'
                            }
                        },
                        name: arr[3],
                        data: [{
                            value: sums2/sums1,
                            itemStyle: {
                                normal: {
                                    color: '#53d5ff',
                                    opacity: 0.6
                                }
                            }
                        }],
                        color: ['rgba(0,0,0,0)'],
                        center: ['50%', '50%'],
                        label: {
                            normal: {
                                formatter: '',
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        },
                        outline: {
                            itemStyle: {
                                borderColor: 'rgba(0,0,0,0)',
                                borderWidth: 0
                            },
                            borderDistance: 0
                        }
                    },
                    {
                        type: 'pie',
                        radius: ['50%', '85%'],
                        // 00f8ff中间透明度
                        color: ['#E35D68', '#D15502','#FADB14', '#34DA62', '#0096F3', '#1C459D','#AD46F3'],
                        hoverAnimation: false, ////设置饼图默认的展开样式
                        label: {
                            show: false,
                            
                            normal: {
                                formatter: '{b}\n{d}%',
                                show: false,
                                position: 'none'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
        
            
                        itemStyle: { // 此配置
                            normal: {
                                borderWidth: 0,
                                borderColor: '#fff',
                            },
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 2,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: arr[2]
                    }
                ]
            }
            this.setState({
                option:option
            })

        })
        
    
    
        

    }
    render() {
        return (
            <div
            style={{width:"200px",height:"200px",margin:'0 auto',background:`url('${ RemoteEchartgd }') 100% 100% / cover no-repeat`}}>
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"200px",height:"200px"}}
                  /> 
            </div>
        )
    }
}
