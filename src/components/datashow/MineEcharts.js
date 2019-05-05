import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";
class mineEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            type:"mine",
            option:{}
        };
    }
    componentWillMount(){
        this.setState({
            type:this.props.type,
        });
    }
    componentDidMount(){
        this[this.state.type]()
    }
    //矿山整体大数据
    mine=()=>{
         let option={
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             color:["#2964FA","#FFB800","#b93fff","#4DF6DC","#FE7401","#00ccee"],
             legend:{
                 orient:"vertical",
                 left:"left",
                 top:"20%",
                 data:["水土污染","预警次数","土地损毁","土地复垦","基金缴纳","基金提取"],
                 textStyle: {
                     color:"#fff"
                 }
             },
             series : [
                 {
                     name: '水土污染',
                     type: 'pie',
                     radius : ['25%', '30%'],
                     label: {
                         show:false
                     },
                     labelLine:{
                         show:false
                     },
                     data:[
                         {
                             value:'967',
                             name:'水土污染',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#2964FA'
                                     }
                                 },
                                 label: {
                                     show:false
                                 },
                                 labelLine:{
                                     show:false
                                 }
                             },
                         },
                         {
                             value:'2800',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '预警次数',
                     type: 'pie',
                     radius : ['35%', '40%'],
                     data:[
                         {
                             value:'825',
                             name:'预警次数',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'500',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]

                 },  {
                     name: '土地损毁',
                     type: 'pie',
                     radius : ['45%', '50%'],
                     data:[
                         {
                             value:'1078',
                             name:'土地损毁',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'800',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }

                     ]
                 },  {
                     name: '土地复垦',
                     type: 'pie',
                     radius : ['55%', '60%'],
                     data:[
                         {
                             value:'981',
                             name:'土地复垦',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'900',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '基金缴纳',
                     type: 'pie',
                     radius : ['65%', '70%'],
                     data:[
                         {
                             value:'877',
                             name:'基金缴纳',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 },
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'500',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '基金提取',
                     type: 'pie',
                     radius : ['75%', '80%'],
                     data:[
                         // {value:939, name:'地理'}
                         {
                             value:'439',
                             name:'基金提取',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'200',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },
             ]
        };
         this.setState({option})
    };
    //地质灾害数据
    earth=()=>{
        let option={
            color: ['#fdda29'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis : [{
                    type : 'category',
                    data : ['塌陷', '地裂缝', '位移', '沉降', '滑坡', '形变'],
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
            }],
            yAxis : [{
                    name:"设备个数",
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                }],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '28%',
                    data:[10, 22, 20, 24, 30, 15],
                }
            ]
        };
        this.setState({option})
    };
    //地形地貌数据总览
    terrain=()=>{
        let option={
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:["#22db5f","#00c6ff"],
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问',selected:true},
                        {value:210, name:'邮件营销'},
                    ],
                    label: {
                        color: "#fff",
                    },
                    labelLine:{
                        lineStyle:{
                            color: "#fff",
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.setState({option})
    };
    //含水层数据
    waterLayer=()=>{
        let option={
            legend: {
                data:['监测点1','监测点2'],
                icon:"circle",
                left:"45%",
                textStyle:{
                    color:"#fff"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '6%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                name:"时间",
                type: 'category',
                data: ['4.23', '4.24', '4.25', '4.26', '4.27', '4.28', '4.29'],
                axisLine:{
                    show:false
                },
                axisLabel:{
                    color:"#fff"
                }
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        type:"dashed",
                        color:"#1c4e8f"
                    }
                },
                axisLine:{
                    show:false
                },
                axisLabel:{
                    color:"#fff"
                }
            },
            series: [{
                name:"监测点1",
                data: [220, 332, 261, 434, 390, 330, 320],
                type: 'line',
                itemStyle:{
                    normal:{
                        lineStyle:{
                            type:"dotted"
                        },
                        color:new echarts.graphic.LinearGradient(0,0,1,0,[{
                            offset:0,
                            color:'#2F89EC'
                        },{
                            offset:0.8,
                            color:"#1E5CAF"
                        }],false)
                    }
                }
            },{
                name:"监测点1",
                data: [420, 232, 201, 234, 390, 430, 220],
                type: 'line',
                itemStyle:{
                    normal:{
                        color:"#42AAE4"
                    }
                }
            },{
                name:"监测点2",
                data: [120, 132, 101, 134, 190, 230, 120],
                type: 'line',
                itemStyle:{
                    normal:{
                        lineStyle:{
                            type:"dotted"
                        },
                        color:new echarts.graphic.LinearGradient(0,0,1,0,[{
                            offset:0,
                            color:"#F37653"
                        },{
                            offset:0.8,
                            color:"#F80304"
                        }],false)
                    }
                }
            },{
                name:"监测点2",
                data: [110, 112, 131, 164, 140, 210, 170],
                type: 'line',
                itemStyle:{
                    normal:{
                        color:"#EF2631"
                    }
                }
            }]
        };
        this.setState({option})
    };
    //水土污染总览
    soilWater=()=>{
        let placeHolderStyle = {
            normal: {
                color: '#fff',
                opacity: .1
            },
            emphasis: {
                color: '#fff',
                opacity: .1
            }
        };
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} : {c} ({d}%)"
            },
            legend: {
                show:false,
                orient: 'vertical',
                top: '45%',
                right: '10%',
                data: ['土污染', '水污染'],
                textStyle: {
                    color: '#40E7F4 ',
                    fontSize: 14
                },
                formatter(name) {
                    return name
                },
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 16
            },
            series: [{
                name: '土污染',
                type: 'pie',
                radius: ['70%', '74%'],
                label: false,
                startAngle: 180,
                clockWise: true,
                hoverAnimation: true,
                hoverOffset: 3,
                data: [{
                    value: 877,
                    name: '收货人',
                    itemStyle: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#FFEA4F' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F89212' // 100% 处的颜色
                            }]
                        }
                    }
                },
                    {
                        value: 500,
                        hoverAnimation: false,
                        itemStyle: placeHolderStyle
                    }
                ]
            }, {
                name: '水污染',
                type: 'pie',
                radius: ['50%', '54%'],
                label: false,
                startAngle: 0,
                clockWise: true,
                hoverAnimation: true,
                hoverOffset: 3,
                data: [{
                    value: 939,
                    name: '司机',
                    itemStyle: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#FF7671' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#A14AFF' // 100% 处的颜色
                            }]
                        }
                    }
                },
                    {
                        value: 200,
                        hoverAnimation: false,
                        itemStyle: placeHolderStyle
                    }
                ]
            }]
        };
        this.setState({option})
    };
    //土地损毁与复垦总览
    destruction=()=>{
        let option={
            tooltip:{},
            color:["#FA4767","#41FD8F"],
            series: [
                {
                    type: 'pie',
                    data: [
                        {
                            name: '土地复垦',
                            value: 60,
                        },
                        {
                            name: '土地损毁',
                            value: 40,
                        },
                    ],
                    label: {
                        position: 'inside',
                        show:false
                    },
                    radius: [0, 60],
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#0A1D43',
                    },
                    clockwise: true,
                    animation: false,
                },
                {
                    type: 'pie',
                    data: [
                        {
                            name: '土地复垦',
                            value: 60,
                        },
                        {
                            name: '土地损毁',
                            value: 40,
                        }
                    ],
                    label: {
                        color: "#fff",
                    },
                    labelLine:{
                        lineStyle:{
                            color: "#fff",
                        }
                    },
                    radius: [72, 95],
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#0A1D43',
                    },
                    animation: false,
                },
            ]
        };
        this.setState({option})
    };
    render() {
        return (
            <ReactEcharts
                option={this.state.option}
                style={{width:"100%",height:this.props.dataHeight+"px"}}
            />
        );
    }
}
export default mineEcharts