import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

//仪表盘所用字段
var startAngle = 225;
var endAngle = -45;
var splitWidth = 15;
var splitNumber = 5;
var tickColor = ['#BC090E','#CA6F0E','#722291','#3B24A4','#254EC9','#1973B4','#2BDAD2','#64D41D'];
class Egraph extends Component {
  constructor(props){
    super(props);
    this.state={
      option:{}
    };

  }

  componentDidMount(){
    const cahrtp=this.props.cahrtp;
    const data={ //进度测试数据
      item:['项目方案','监测规划','评估报告','调查报告','勘察报告','设计报告','施工报告','施工监理','治理方案','项目验收',],
      values:[60,100,40,20,70,48,30,69,78,0]
    }
    switch(cahrtp){
      case 'progressbar':
        this.progressbar(data)
        break;
      case 'meter':
        this.meter()
        break;
      case 'columnar':
        this.columnar()
        break;

    }
    // this[this.props.cahrtp]()
  }
  
  //仪表盘
  meter=()=>{
    const _this=this;
    var option= {
      series: _this.getSeries(80).concat(_this.getAxisTick())
    };
    this.setState({option})
  }
  getSeries=(data)=>{
    return [
        {
            name: '数据',
            type: 'gauge',
            startAngle: startAngle,
            endAngle: endAngle,
            radius: '50%',
            center: ['50%','55%'],
            min: 0,
            max: 100,
            splitNumber:splitNumber,
            axisLine: {
                lineStyle: {
                    width: 1,
                    color: [[1, '#fff']]
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                distance:-48,
                fontSize:10
            },
            splitLine: {
                lineStyle: {
                    width: 0
                }
            },
            itemStyle:{
                color:'#04A4CE'
            },
            pointer: { //指针
                show:true,
                length: '100%'
            },
            detail: {
                offsetCenter: [0, '150%'],
                textStyle: {
                    fontSize: 12,
                    color:'#04A4CE'
                },
                formatter: '已损毁{value}% \n'
            },
            data: [{
                name: "",
                value: data
            }]
        }
    ];
  }

  getAxisTick=()=>{
      
      var tickWidth = (startAngle - endAngle - (splitNumber - 1) * splitWidth) / splitNumber;
      var ticks = [];
        for(var i=0; i<splitNumber; i++){
            ticks.push({
                    name: "刻度",
                    type: 'gauge',
                    splitNumber: 1,
                    startAngle: startAngle-i*(tickWidth+splitWidth),
                    endAngle: startAngle-tickWidth-i*(tickWidth+splitWidth),
                    radius: '100%',
                    center:['50%','55%'],
                    axisLine: {
                        lineStyle: {
                            width: 0,
                            shadowBlur: 0
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: tickColor[i],
                            width: 2
                        },
                        length: '10%',
                        splitNumber: 10
                    },
                    splitLine: {
                        show: true,
                        length: '12%',
                        lineStyle: {
                            width: 2,
                            color: tickColor[i]
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    markPoint: {
                        symbol:'circle',
                        symbolSize:5,
                        itemStyle: {
                            color: "#fff"
                        },
                        data: [
                            {
                                x: "50%",
                                y: "55%"
                            }
                        ]
                    }
                });
        }

        return ticks;
    }

  progressbar=(data)=>{
    var option=  {
    grid: {
        left: '4%',
        top: '2%',
        right: '1%',
        bottom: '2%',
        containLabel: true
    },
    xAxis: [{
        show: false,
    }],
    yAxis: [{
        axisTick: 'none',
        axisLine: 'none',
        offset: '5',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '12',
            }
        },
        data: data.item
    }, {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '10',
            }
        },
        data: data.values
    }, {
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        data: [],
    }],
    series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: data.values,
            barWidth: 5,
            itemStyle: {
                normal: {
                  barBorderRadius: 4,
                  color: {
                      type: 'linear',
                      x: 0,
                      x1: 1,
                      colorStops: [{
                          offset: 0,
                          color: '#0285FF'
                      }, {
                          offset: 1,
                          color: '#00F2FF'
                      }]
                  }
                }
            },
            z: 2
        }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: data.values.map(()=>{return 99.5}),
            barWidth: 8,
            itemStyle: {
                normal: {
                    color: '#0e2147',
                    barBorderRadius: 2,
                }
            },
            z: 1
        }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: data.values.map(()=>{return 100}),
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: '#0285FF',
                    barBorderRadius: 4,
                }
            },
            z: 0
        },
        {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: data.values.map(()=>{return 0}),
            yAxisIndex: 1,
            symbolSize: 12,
            itemStyle: {
                normal: {
                    color: '#0285FF',
                    opacity: 1,
                }
            },
            z: 2
        }
    ]
};
    this.setState({option})
  }
  columnar=()=>{
    var option = {
        xAxis: {
            data: ['涉恐人员', '涉稳人员', '涉毒人员', '在逃人员', '刑事犯罪\n前科、劣迹人员', '肇事肇祸\n精神病人', '重点上访\n人员'],
            axisLine: {
                lineStyle: {
                    color: '#0177d4'
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 14
            }
        },
        yAxis: {
            name: "（人）",
            nameTextStyle: {
                color: '#fff',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#0177d4'
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 16
            },
            splitLine: {
                show:false,
                lineStyle: {
                    color: '#0177d4'
                }
            },
            interval:500,
            max:5000

        },
        series: [{
            type: 'bar',
            barWidth: 18,
            itemStyle:{
                normal:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#00b0ff'
                    }, {
                        offset: 0.8,
                        color: '#7052f4'
                    }], false)
                }
            },
            data: [254, 3254, 1654, 2454, 4757, 2011, 1211]
        }]
    };
    this.setState({option})

  }

  render() {    
    return (
      <div className="Egraph">
        <ReactEcharts
            option={this.state.option}
            style={{width:"100%",height:this.props.dataHeight+"px"}}
        />
      </div>
    );



  }
}

export default Egraph;

