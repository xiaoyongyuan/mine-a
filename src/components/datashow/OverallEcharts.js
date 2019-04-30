import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class OverallEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            type:"masterPlan",
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
    //项目总体计划
    masterPlan=()=>{
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:["#4df6dc","#ffb800","#ff1a3a","#288dff"],
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
                    data:[
                        {value:135, name:'总体方案'},
                        {value:110, name:'投资计划'},
                        {value:134, name:'年度计划'},
                        {value:535, name:'计划完成进度'},
                    ]
                }
            ]
        };
        this.setState({option})
    };
    //项目方案
    programme=()=>{
        let chartData = [77.12, 81.36, 80.83,67];
        let chartName = ['编制', '评审', '通过','反馈'];
        let myColor = ['#6246fe','#d11f36','#83f47f','#d38875'];
        let option={
            grid: {
                left: '5%',
                right: '10%',
                bottom: '10%',
                top: '10%',
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

            series: [{
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
                        },
                        barBorderRadius: 15,
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: 'bold'
                        },
                        position: 'right',
                        formatter: function(data) {
                            return (chartData[data.dataIndex]).toFixed(2) + '%';
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
                            color: 'transparent',
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: [0, '-20'],
                            textStyle: {
                                fontSize:14,
                                color: '#fff',
                            },
                            formatter: function(data) {
                                return chartName[data.dataIndex];
                            }
                        }
                    },
                    data: [77.12, 81.36, 80.83,67]
                }
            ]};
        this.setState({option});
    };
    //项目勘察
    investigation=()=>{
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
    //项目设计
    design=()=>{
        let option={ tooltip: {},
            legend: {
                top: 20,
                itemWidth: 12,
                itemHeight: 12,
                data: ['预算分配（Allocated Budget）'],
                textStyle: {
                    color: '#fff'
                },
                show:false
            },
            radar: {
                radius: '60%',
                splitNumber: 8,
                splitLine: {
                    lineStyle: {
                        color: '#fc4465',
                    }
                },
                splitArea: {
                    show:false,
                    areaStyle: {
                        color: 'rgba(127,95,132,.3)',
                    }
                },
                axisLine:{
                    show:false,
                },
                indicator: [{
                    name: '施工',
                    max: 6000
                }, {
                    name: '预算',
                    max: 16000
                }, {
                    name: '验收',
                    max: 30000
                }, {
                    name: '技术',
                    max: 35000
                }, {
                    name: '器材',
                    max: 50000
                }, {
                    name: '人员',
                    max: 25000
                }]
            },
            series: [{
                name: '项目设计',
                type: 'radar',
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        shadowBlur: 13,
                        shadowColor: 'rgba(0,0,0,.2)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 10,
                        opacity: 1
                    }
                },
                data: [{
                    value: [5000, 7000, 12000, 11000, 15000, 14000],
                    name: '预算分配（Allocated Budget）',
                }]
            }],
            color: ['#fc4465'],};
        this.setState({option});
    };
    //项目施工
    construction=()=>{
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [

                {
                    name: '施工进度',
                    type: 'pie',
                    radius: [70, 90],
                    center: ['50%', '50%'],
                    data: [{
                        value: 34,
                        name: '施工进度',
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
                            formatter: '施工进度',
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
                            name: '施工进度',
                            itemStyle: {
                                color: "transparent"
                            }
                        }
                    ]
                },
                {
                    name: '施工方案',
                    type: 'pie',
                    radius: [70, 80],
                    center: ['50%', '50%'],
                    data: [{
                        value: 34,
                        name: '施工方案',
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
                                formatter: '施工方案',
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
    //项目监理
    supervisor=()=>{
        function roundDatas(num) {
            var datas = [];
            for (var i = 0; i < num; i++) {
                datas.push({
                    name: 'circle' + i
                });
            }
            return datas;
        }
        let option={
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            roam: false, //鼠标缩放及平移
            focusNodeAdjacency: false, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            dataRange: {
                min: 0,
                max: 60,
                y: '70%',
                calculable: true,
                show: false,
                color: ['#ff1a3a', '#22db5f',"#f55832","#fdda29","#fc4465","#4df6dc","#3da0ff"]
            },
            series: [{
                name: '',
                type: 'pie',
                startAngle: 0,
                hoverAnimation: false,
                radius: ['60%', '60%'],
                center: ['50%', '50%'],
                data: [{
                    name: '公司A1',
                    value: 19
                }, {
                    name: '公司A2',
                    value: 15
                }, {
                    name: '公司A3',
                    value: 20
                }, {
                    name: '公司A4',
                    value: 25
                }, {
                    name: '公司A5',
                    value: 30
                }, {
                    name: '公司A6',
                    value: 35
                }, {
                    name: '公司A7',
                    value: 40
                }],
                itemStyle: {
                    normal: {
                        color: '#000',
                        borderWidth: 5,
                        borderColor: 'rgba(0,0,0,0)',
                        labelLine: {
                            show: true,
                            length: 40,
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }
                }
            }, {
                type: 'graph',
                tooltip: {},
                ribbonType: true,
                layout: 'circular',
                hoverAnimation: false,
                width: '60%',
                height: '60%',
                circular: {
                    rotateLabel: true
                },
                symbolSize: 1,
                data: roundDatas(300),
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        color: '#58446C',
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    }
                },
            }, {
                type: 'graph',
                tooltip: {},
                ribbonType: true,
                layout: 'circular',
                width: '60%',
                height: '60%',

                circular: {
                    rotateLabel: true
                },
                symbolSize: 30,
                edgeSymbol: ['circle'],
                edgeSymbolSize: [8, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 13,
                            fontWeight: 'bold',
                            fontFamily: '宋体'
                        }
                    }
                },

                itemStyle: {
                    normal: {
                        label: {
                            rotate: true,
                            show: false,
                            textStyle: {
                                color: '#9474B4',
                            }
                        },
                        borderColor: '#0c1c41',
                        borderWidth: 3,

                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    }
                },

                data: [{
                    name: '公司A1',
                    "symbolSize": 19,
                    value: 10,
                }, {
                    name: '公司A2',
                    "symbolSize": 15,
                    value: 15,
                }, {
                    name: '公司A3',
                    "symbolSize": 20,
                    value: 20,
                }, {
                    name: '公司A4',
                    "symbolSize": 25,
                    value: 25,
                }, {
                    name: '公司A5',
                    "symbolSize": 30,
                    value: 30,
                }, {
                    name: '公司A6',
                    "symbolSize": 35,
                    value: 35,
                }, {
                    name: '公司A7',
                    "symbolSize": 40,
                    value: 40,
                }],
            }]
        };
        this.setState({option})
    };
    //基金管理
    fund=()=>{
        let option={
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "shadow",
                    textStyle: {
                        color: "#fff"
                    }
                }
            },
            "grid": {
                 left:"13%",
                "bottom": "10%",
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                textStyle: {
                    color: '#fff',
                },
                left:"right",
                "data": ['提取', '余额', '缴纳'],
                icon:"circle"
            },


            "calculable": true,
            "xAxis": [{
                "type": "category",
                "axisLine": {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                "axisLabel": {
                    color:"#FFF"

                },
                "data": ["4.24","4.25","4.26","4.27","4.28","4.29","4.30"],
            }],
            "yAxis": [{
                name:"数值",
                "type": "value",
                "splitLine": {
                    "show": false
                },
                "axisLine": {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    color:"#FFF"

                },
                "splitArea": {
                    "show": false
                },

            }],
            "series": [{
                "name": "提取",
                "type": "bar",
                "stack": "总量",
                "barMaxWidth": 20,
                "barGap": "10%",
                "itemStyle": {
                    "normal": {
                        "color": "#f55832",
                        /*"label": {
                            "show": true,
                            "textStyle": {
                                "color": "#fff"
                            },
                            "position": "insideTop",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }*/
                    }
                },
                "data": [
                    709,
                    1917,
                    2455,2610,1719,1433,1544],
            },

                {
                    "name": "余额",
                    "type": "bar",
                    "stack": "总量",
                    "itemStyle": {
                        "normal": {
                            "color": "#4195f4",
                            "barBorderRadius": 0,
                            /*"label": {
                                "show": true,
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }*/
                        }
                    },
                    "data": [327,1776,507,1200,800,482,204]
                }, {
                    "name": "缴纳",
                    "type": "line",
                    "stack": "总量",
                    symbolSize:10,
                    smooth:true,
                    symbol:'circle',
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(252,230,48,1)",
                            "barBorderRadius": 0,
                            /* "label": {
                                 "show": true,
                                 "position": "top",
                                 formatter: function(p) {
                                     return p.value > 0 ? (p.value) : '';
                                 }
                             }*/
                        }
                    },
                    "data": [236,593, 962,210,519,915,748]
                },
            ]};
        this.setState({option})
    };
    //土地损毁于复垦
    land=()=>{
        let option={tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                left:'right',
                data: ['塌陷','复垦','损毁'],
                textStyle:{
                    color:"#fff"
                }
            },
            color:["#ff244b","#4df6dc","#f55832"],
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'塌陷'},
                        {value:310, name:'复垦'},
                        {value:934, name:'损毁'},
                    ],
                    label:{
                        color:"#fff"
                    },
                    labelLine:{
                        color:"#fff"
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                    }
                }
            ]};
        this.setState({option})
    };
    //项目验收
    acceptance=()=>{
        let option={tooltip : {
                show:false,
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                show:false,
                data:['直接访问','邮件营销','联盟广告','视频广告']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [{
                type : 'category',
                data : ['4.23','4.24','4.25','4.26','4.27','4.28','4.30'],
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
            }
            ],
            yAxis : [{
                type : 'value',
                name:"数值",
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine:{
                    show:false
                }
            }],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    stack: '1',
                    data:[320, 332, 301, 334, 390, 330, 320],
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color:"#f55832",
                            borderWidth: 0,
                            borderColor: '#333',
                            barBorderRadius: [0,0,50,50],
                        }
                    },
                },
                {
                    name:'验收',
                    type:'bar',
                    stack: '1',
                    data:[120, 132, 180, 134, 190, 130, 120],
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color:"#f93847",
                            borderWidth: 0,
                            borderColor: '#333',
                            barBorderRadius: [50,50,0,0],
                        }
                    },
                },
                {
                    name:'邮件营销',
                    type:'bar',
                    stack: '广告',
                    data:[120, 132, 101, 134, 90, 230, 210],
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color:"#4df6dc",
                            borderWidth: 0,
                            borderColor: '#333',
                            barBorderRadius: [0,0,50,50],
                        }
                    },
                },
                {
                    name:'联盟广告',
                    type:'bar',
                    stack: '广告',
                    data:[220, 182, 191, 234, 290, 330, 310],
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color:"#22db5f",
                            borderWidth: 0,
                            borderColor: '#333',
                        }
                    },
                },
                {
                    name:'视频广告',
                    type:'bar',
                    stack: '广告',
                    data:[150, 232, 201, 154, 190, 130, 210],
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            show: true,
                            color:"#4195f4",
                            borderWidth: 0,
                            borderColor: '#333',
                            barBorderRadius: [50,50,0,0],
                        }
                    },
                },

            ]};
        this.setState({option});
    };
    render() {
        return(
            <ReactEcharts
                option={this.state.option}
                style={{width:"100%",height:this.props.proHeight+"px"}}
            />
        );
    }
}
export default OverallEcharts