import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'基金缴纳', selected:true},
                        {value:679, name:'基金提取'},
                    ]
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['40%', '55%'],
                    label: {
                        color: "#fff",
                    },
                    labelLine:{
                        lineStyle:{
                            color: "#fff",
                        }
                    },
                    data:[
                        {value:335, name:'水土污染'},
                        {value:310, name:'其他'},
                        {value:234, name:'预警次数'},
                        {value:135, name:'土地损毁'},
                        {value:1048, name:'土地复垦'},
                        {value:251, name:'水土污染'},

                    ]
                }
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
                    data : ['塌陷', '地裂缝', '位移', '沉降', '滑坡', '形变', '其他'],
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
            }],
            yAxis : [{
                    name:"数值",
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
                    data:[10, 22, 20, 24, 30, 15, 10],
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
                data:['岩石','卵石','松石'],
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
            color:["#f93847","#f55832","#49bcf9"],
            series: [{
                name:"岩石",
                data: [220, 332, 261, 434, 390, 330, 320],
                type: 'line'
            },{
                name:"卵石",
                data: [420, 232, 201, 234, 390, 430, 220],
                type: 'line'
            },{
                name:"松石",
                data: [120, 132, 101, 134, 190, 230, 120],
                type: 'line'
            }]
        };
        this.setState({option})
    };
    //水土污染总览
    soilWater=()=>{
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [

                {
                    name: '水污染',
                    type: 'pie',
                    radius: [70, 90],
                    center: ['50%', '50%'],
                    data: [{
                        value: 34,
                        name: '水污染',
                        itemStyle: {
                            color:"#f45945"
                        },
                        labelLine:{
                            lineStyle:{
                                color: "#D3D5D9",
                            }
                        },
                        label: {
                            color: "#D3D5D9",
                            fontSize: 14,
                            formatter: '水污染',
                            rich: {
                                a: {
                                    color: "#D3D5D9",
                                    fontSize: 20,
                                    lineHeight: 30
                                },
                            }
                        }
                    },
                        {
                            value: 52,
                            name: '土污染',
                            itemStyle: {
                                color: "transparent"
                            }
                        }
                    ]
                },
                {
                    name: '土污染',
                    type: 'pie',
                    radius: [70, 80],
                    center: ['50%', '50%'],
                    data: [{
                        value: 34,
                        name: '土污染',
                        itemStyle: {
                            color: "transparent"
                        }
                    },
                        {
                            value: 52,
                            name: 'rose2',
                            itemStyle: {
                                color:"#1785ff"
                            },
                            labelLine:{
                                lineStyle:{
                                    color: "#fff",
                                }
                            },
                            label: {
                                color: "#fff",
                                fontSize: 14,
                                formatter: '土污染',
                                rich: {
                                    a: {
                                        color: "#fff",
                                        fontSize: 20,
                                        lineHeight: 30
                                    },
                                }
                            }
                        }
                    ]
                }
            ]
        };
        this.setState({option})
    };
    //土地损毁与复垦总览
    destruction=()=>{
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                left: '50%',
                icon:"circle",
                data:['土地复垦','土地损毁'],
                textStyle:{
                    color:"#fff"
                }
            }
            ,
            color:["#41fd8f","#fa4767"],
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    label: {
                        color: "#fff",
                    },
                    labelLine:{
                        lineStyle:{
                            color: "#fff",
                        }
                    },
                    /*label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },*/
                    data:[
                        {value:435, name:'土地复垦'},
                        {value:248, name:'土地损毁'}
                    ]
                }
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