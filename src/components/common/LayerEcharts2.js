import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import RemoteEchartgd from '../../style/imgs/RemoteEchartgd.png'

export default class LayerEcharts2 extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    componentDidMount(){
        var val1data2 = [{
            value: 0.2,
            name: '装配完成率',
        },
        {
            value: 0.3,
            name: '班检完成率',
        },
        {
            value: 0.4,
            name: '初检完成率',
        },
        {
            value: 0.3,
            name: '复检完成率',
        },
        {
            value: 0.1,
            name: '出厂检完成率',
        },
    ]
    
    var arr = ['middleLost', 0.6, val1data2, '其他']
    
    var option = {
        title: {
            top: '45%',
            left: 'center',
            text: arr[3],
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 14
            },
            subtext: '占比' + (arr[1] * 10000 / 100).toFixed(2) + '%',
            subtextStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(res) {
                if (res.componentSubType == 'liquidFill') {
                    return res.seriesName + ': ' + (res.value * 10000 / 100).toFixed(2) + '%';
                } else {
                    return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ':<br/> ' + res.data.value;
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
                    value: 0.6,
                    itemStyle: {
                        normal: {
                            color: '#53d5ff',
                            opacity: 0.6
                        }
                    }
                }],
                color: ['rgba(0,0,0,0)'],
                center: ['50%', '50%'],
                backgroundStyle: {
                    color: 'rgba(0,0,0,0)'
                },
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
                radius: ['70%', '85%'],
                color: ['#B71C1C', '#BF360C','#F29312', '#33691E', '#01579B', '#1A237E','#791EB8'],
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

    }
    render() {
        return (
            <div
            style={{width:"180px",height:"180px",margin:'10%',background:`url('${ RemoteEchartgd }') 100% 100% / cover no-repeat`}}>
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"180px",height:"180px"}}
                  /> 
            </div>
        )
    }
}
