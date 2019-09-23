import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from "../axios";

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
            // legend: {
            //     data:['X轴','Y轴','Z轴'],
            //     top:-10,
            // },
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
                    // data:[1,2,3]
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

    //点位设备曲线图
    dotdetails=()=>{

      let option = {
          title: {
              text: 'GNSS监测点1#',
              left:'center',
              subtext: '2019年05月'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['水平位移','垂直位移'],
              left:'left'
          },
          toolbox: {
              show: true,
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
              }
          },
          xAxis:  {//直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
              type: 'category',//坐标轴类型。'value' 数值轴，适用于连续数据。'category' 类目轴，适用于离散的类目数据，'time' 时间轴，
              boundaryGap: false ,//坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
              // data:this.props.xdata
              data:this.props.xdata
          },
          yAxis: {
              type: 'value',
              name:"位移量(mm)",
              axisLabel: {//坐标轴刻度相关设置。
                  formatter: '{value} mm'
              },
              splitArea: {
                  show: true,
                  // areaStyle:{
                  //     color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'],
                  //     shadowColor: 'rgba(0, 0, 0, 0.5)',
                  // }
              },
          },
          dataZoom: [{
              startValue: '2014-06-01'
          }, {
              type: 'inside'
          }],
          series: [
              {
                  name:'水平位移',
                  type:'line',
                  data:this.props.levelvalue,
                  // data:this.props.levelvalue,
                  // markPoint: {
                  //     data: [
                  //         {type: 'max', name: '最大值'},
                  //         {type: 'min', name: '最小值'}
                  //     ]
                  // },
                  markLine: {
                      data: [
                          {type: 'average', name: '平均值'}
                      ]
                  }
              },
              {
                  name:'垂直位移',
                  type:'line',
                  data:this.props.vertical,
                  // markPoint: {
                  //     data: [
                  //         {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                  //     ]
                  // },
                  markLine: {
                      data: [
                          {type: 'average', name: '平均值'},
                          [{
                              symbol: 'none',
                              x: '90%',
                              yAxis: 'max'
                          }, {
                              symbol: 'circle',
                              label: {
                                  normal: {
                                      position: 'start',
                                      formatter: '最大值'
                                  }
                              },
                              type: 'max',
                              name: '最高点'
                          }]
                      ]
                  }
              }
          ]
      };
        this.setState({
            option
        });
    };

    //点位设备曲线图2
    dotdetailtwo=()=>{
        let option = {
            title: {
                text: 'GNSS监测点1#',
                left:'center',
                subtext: '2019年03月'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {//工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false ,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                // data:this.props.xdata
            },
            yAxis: {
                type: 'value',
                name:"降雨量(mm)",
                splitArea: {
                    show: true,
                    areaStyle:{
                        color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'],
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                },
                axisLabel: {//坐标轴刻度相关设置。
                    formatter: '{value} mm'
                }
            },
            dataZoom: [{
                startValue: '2014-06-01'
            }, {
                type: 'inside'
            }],
            series: [{
                name:'降雨量',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        this.setState({
            option
        })
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