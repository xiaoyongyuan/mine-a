import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
// import RemoteEchartgd from '../../style/imgs/RemoteEchartgd.png'

export default class RemoteEchart1 extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{},
        };
    }
    componentWillMount(){
        homeSystemMonitoring.remotesensing()
        .then(res=>{
            // console.log(res);
            var num = 0;
            res.data.forEach(function(al,index){
                num+=parseInt(al.layerremotetypenum)
            })
            let data = [
                {
                    value: num,
                    name: '总共'
                }
            ];
    
            let color = ['#00addf'];
            let data1 = data[0].value;
            let baseData = [];
            for (var i = 0; i < data.length; i++) {
                baseData.push({
                    value: data[i].value,
                    name: data[i].name,
                    itemStyle: {
                        normal: {
                            borderWidth: 0,
                            shadowBlur: 12,
                            borderColor: color[i],
                            shadowColor: 'rgba(0, 0, 0, .5)'
                        }
                    }
                });
            }
            let option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                    },
                    top: '15%',
                    left: '15%',
                },
                backgroundColor: 'rgba(0,0,0,.0)',
                color: color,
                tooltip: {
                    show:true,
                    trigger: 'item',
                    formatter: "{a}：{b} <br/>占比：{d}%"
                },
                grid: {
                    top: 'bottom',
                    left: '10',
                    width: '10%',
                    height: '10%',
                },
                series: [{
                        zlevel: 1,
                        name: '数据采集',
                        type: 'pie',
                        selectedMode: '',
                        radius: [55, 65],
                        startAngle: '75',
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                formatter: ['{c|{c}}', '{b|{b}}'].join('\n'),
                                rich: {
                                    b: {
                                        fontSize: 8,
                                        lineHeight: 15
                                    }
            
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowColor: 'rgba(0, 0, 0, 0.8)',
                                shadowBlur: 12,
                            }
                        },
                        data: baseData
                    },
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [55, 65],
                        startAngle: '75',
                        data: [{
                            "value": data1,
                            "name": "",
                            "label": {
                                "normal": {
                                    "show": true,
                                    "formatter": '{a|遥感成果} \n {c|{c}}',
                                    rich: {
                                        c: {
                                            color: '#00addf',
                                            fontSize: 25,
                                            fontWeight: 'bold',
                                            height: 50,
                                        },
                                        a: {
                                            align: 'center',
                                            color: 'white',
                                            fontSize: 15,
                                            height: 25,
                                        },
                                    },
                                    "textStyle": {
                                        "fontSize": 18,
                                        "fontWeight": "bold"
                                    },
                                    "position": "center"
            
                                }
                            }
                        }, ]
                    }
                ]
            };
            this.setState({  
                option:option
            });
        })


        
    }
    render() {
        
        return (
            <div
            style={{width:"170px",height:"170px",margin:"0 10%"}}>
                {/* ,background:`url('${ RemoteEchartgd }') 100% 100% / cover no-repeat` */}
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"170px",height:"170px"}}
                  /> 
            </div>
        )
    }
}
