import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";

export default class RemoteEchart extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{},
        };
    }

    componentWillMount(){
        homeSystemMonitoring.remotesensing()
        .then(res => {
            console.log(res);
            var data = [];
            res.data.forEach(function(al,index){
                data.push({
                    name:al.dname,
                    value:parseInt(al.layerremotetypenum)
                });
            })
            var colors=[['#f043ac', '#00addf'],['#8e49ff', '#00addf'],['#ffdb15', '#00addf'], ['#00df93', '#00addf']]

            var total = 0;
            var titleArr= [], seriesArr=[];
            data.map((sum,i) => {total+=sum.value});
            

            data.forEach(function(item, index){
                seriesArr.push(
                    {
                        name: item.name,
                        type: 'pie',
                        clockWise: false,
                        radius: [60, 70],
                        itemStyle:  {
                            normal: {
                                color: colors[index][0],
                                shadowColor: colors[index][0],
                                shadowBlur: 0,
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                            }
                        },
                        hoverAnimation: false,
                        center: [ '50%',index * 22 + 10 +'%'],
                        data: [{
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function(params){
                                        return params.seriesName+'\n'+params.value +'个'+'\n'+params.percent+'%';
                                    },
                                    position: 'center',
                                    show: true,
                                    "textStyle": {
                                        "color": "white",
                                        "fontSize": 15,
                                        "height": 40
                                        
                                    },
                                }
                            },
                        }, {
                            value: total-item.value,
                            name: 'invisible',
                            itemStyle: {
                                normal: {
                                    color: colors[index][1]
                                },
                                emphasis: {
                                    color: colors[index][1]
                                }
                            }
                        }]
                    }    
                )
            });
           
            
            let option = {
                backgroundColor: "rgba(0,0,0,0)",
                title:titleArr,
                series: seriesArr
            }
            this.setState({  
                option:option
            });
        })
            
    }
    render() {
        
        return (
            <div style={{width:"100%",height:"85%"}}>
                <ReactEcharts option={this.state.option} style={{width:"100%",height:"100%"}} /> 
            </div>
        )
    }
}
