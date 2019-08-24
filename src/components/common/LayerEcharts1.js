import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-liquidfill';
import RemoteEchartgd from '../../style/imgs/RemoteEchartgd.png'

export default class LayerEcharts1 extends Component {
    constructor(props){
        super(props);
        this.state={
            option:{}
        };
    }
    componentDidMount(){
        // 道路
        var tilte=this.props.data.tilte;
        // 百分比
        var value = this.props.data.value;
        // 总共
        var all =this.props.data.all;
        // 数据
        var data = [value,value,value,value];
        // 第二种圆圈样式
        var two=this.props.two;

        var option = {
            backgroundColor: 'rgba(0,0,0,0)',
            graphic: [{
                type: 'group',
                left: 'center',
                bottom: 10
            }],
            series: [{
                type: 'liquidFill',
                radius: '80%',
                center: ['50%', '50%'],
                data: data,
                backgroundStyle: {
                    borderWidth: 0,
                    borderColor: '#00ADDF',
                    color: '#00000000'
                },
                label: {
                    normal: {
                        formatter: function(params){
                            return two?tilte+'\n'+all+'\n'+(value * 100).toFixed(2) + '%':all+'\n'+'\n'+tilte;
                        },
                        textStyle: {
                            fontSize: 20,
                            color: '#00ADDF',
                        }
                    }
                }
            }]
        }

        this.setState({
            option:option
        })
    }
    render() {
        return (
            <div
            style={{width:"180px",height:"180px",margin:'10%',background:`url('${ RemoteEchartgd }') 100% 100% / cover no-repeat`}}>
                <ReactEcharts 
                 option={this.state.option} 
                style={{width:"180px",height:"180px"}}
                  /> 
            </div>
        )
    }
}
