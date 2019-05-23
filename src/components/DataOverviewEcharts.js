import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class DataOverviewEcharts extends Component {
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
    //地裂缝数据
    acceptance=()=>{
        let option={
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '8%',
                bottom: '18%',
                top:'3%',
                containLabel: true
            },
            xAxis: {
                name:'时',
                type: 'category',
                boundaryGap: false,
                data: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            },
            yAxis: {
                type: 'value'
            },
            visualMap: {//不同值域，不同颜色
                top: -1000000,
                right: -100000,
                pieces: [ {
                    gt: this.props.mindata,
                    lte: this.props.maxdata,
                    color: '#cc0033'
                }],
                outOfRange: {
                    color: '#ff9933'
                }
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data: this.props.data,
                    markLine: {
                        symbol:'none',//去掉箭头
                        silent: false,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                        lineStyle: {
                            type: 'solid',
                            color: '#07fecf'
                        },
                        data: [
                            {yAxis: this.props.maxdata},
                            {yAxis: this.props.mindata}
                        ],
                        // label: {
                        //     normal: {
                        //         formatter: '安全基线'           // 这儿设置安全基线
                        //     }
                        // },
                    },
                },
            ]
        };
        this.setState({option});
    };

    //水位数据
    waterlevel=()=>{
        let option={
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '8%',
                bottom: '18%',
                top:'3%',
                containLabel: true
            },
            xAxis: {
                name:'时',
                type: 'category',
                boundaryGap: false,
                data: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data: this.props.data,
                    markLine: {
                        symbol:'none',//去掉箭头
                        silent: false,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
                        lineStyle: {
                            type: 'solid',
                            color: '#07fecf'
                        },
                        data: [
                            {yAxis: this.props.maxdata},
                            {yAxis: this.props.mindata}
                        ],
                        // label: {
                        //     normal: {
                        //         formatter: '安全基线'           // 这儿设置安全基线
                        //     }
                        // },
                    },
                },
            ]
        };
        this.setState({option});
    };

    // 详细数据
    detaildata=()=>{
        let option={
            title: {
                text: '矿山XXX监测点——XX设备'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:['2014-01-01','2014-01-02','2014-01-03','2014-01-04','2014-01-05','2014-01-06','2014-01-07','2014-01-08']
                // data: data.map(function (item) {
                //     return item[0];
                // })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            toolbox: {
                left: 'center',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                startValue: '2014-06-01'
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                    gt: 0,
                    lte: 50,
                    color: '#096'
                }, {
                    gt: 50,
                    lte: 100,
                    color: '#ffde33'
                }, {
                    gt: 100,
                    lte: 150,
                    color: '#ff9933'
                }, {
                    gt: 150,
                    lte: 200,
                    color: '#cc0033'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#660099'
                }, {
                    gt: 300,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: {
                name: 'Beijing AQI',
                type: 'line',
                data:[100,222,333,444,666],
                // data: data.map(function (item) {
                //     return item[1];
                // }),
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 30
                    }, {
                        yAxis: 100
                    }, {
                        yAxis: 150
                    }, {
                        yAxis: 200
                    }, {
                        yAxis: 300
                    }]
                }
            }
        };
        this.setState({option});
    };

    //含水层在线监测
    qualityonline=()=>{
        let option = {
            // title:{
            //     text:this.props.name + '监测点'
            // },
            backgroundColor: '#f0f2f5',
            legend: {
                data: ['长沙', '西安', '重庆'],
                top: "bottom",
                // show:false,//是否显示图例
                textStyle: {
                    color: '#000000'
                },
            },
            color: ['#65F5F3', '#EAE643', '#F56565'], // 调色盘颜色列表。
            radar: [{
                indicator: [{
                    text: '参数一'
                }, {
                    text: '参数二'
                }, {
                    text: '参数三'
                },
                    {
                    text: '参数四'
                },
                ],
                center: ['50%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#000000'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: '#0E2A43',
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }],
            series: [{
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [{
                    value:  [40, 2,0.6,34],
                    name: '长沙',
                    symbol: 'rect',
                    symbolSize: 5,
                    areaStyle: {
                        normal: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'solid',
                            width: 4
                        }
                    }
                }, {
                    value: [60, 5, 0.30,22],
                    name: '西安',
                    lineStyle: {
                        normal: {
                            type: 'dashed',

                        }
                    }

                }, {
                    value:[100, 8, 0.40,15],
                    name: '重庆',
                    lineStyle: {
                        normal: {
                            type: 'dashed',

                        }
                    }

                }]
            }]
        };
        this.setState({
            option
        });
    };

    //位移
    displacement=()=>{
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '5%',
                right: '8%',
                bottom: '18%',
                top:'3%',
                containLabel: true
            },
            xAxis: {
                name:'时',
                type: 'category',
                boundaryGap: false,
                data: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'X轴',
                    type:'line',
                    data:this.props.datax
                },
                {
                    name:'Y轴',
                    type:'line',
                    data:this.props.datay
                },
                {
                    name:'Z轴',
                    type:'line',
                    data:this.props.dataz
                }
            ]
        };
        this.setState({
            option
        });
    };

    render() {
        return(
            <ReactEcharts
                option={this.state.option}
                style={{width:"100%",height:"100%"}}
            />
        );
    }
}
export default DataOverviewEcharts