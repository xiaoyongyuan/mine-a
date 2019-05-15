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
    //项目验收
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

    //详细数据
    detaildata=()=>{
        let option={
            title: {
                text: 'Beijing AQI'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:[1,2,3,4,5]
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
                data:[100,222,333,444],
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