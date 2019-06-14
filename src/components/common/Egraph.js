import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';


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
    };

  }

  componentDidMount(){

  }
  
  creatchart=(params)=>{
    const type=this.props.type;
    const _this=this;
    switch(){
      case 'meter':
      _this.meter(_this.props.data);
      break;

    }

  }
  //仪表盘
  meter=()=>{
    return {
      backgroundColor:'transpront',
      series: getSeries(80).concat(getAxisTick())
    };
  }
  function getSeries(data){
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
                    width: 3,
                    color: [[1, '#fff']]
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                distance:-70,
                fontSize:20
            },
            splitLine: {
                lineStyle: {
                    width: 0
                }
            },
            itemStyle:{
                color:'#04A4CE'
            },
            pointer: {
                show:true,
                length: '100%'
            },
            detail: {
                offsetCenter: [0, '70%'],
                textStyle: {
                    fontSize: 20,
                    color:'#04A4CE'
                },
                formatter: '已用{value}% \n男厕所总数：100个'
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
                    radius: '80%',
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
                            width: 5
                        },
                        length: '10%',
                        splitNumber: 10
                    },
                    splitLine: {
                        show: true,
                        length: '12%',
                        lineStyle: {
                            width: 5,
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



  render() {
    
    return (
      <div className="Egraph">
        <ReactEcharts
            option={()=>this.creatchart(this.props.cahrtp)}
            style={{width:"100%",height:this.props.dataHeight+"px"}}
        />
      </div>
    );



  }
}

export default Egraph;

