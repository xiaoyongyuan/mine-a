import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class OverallEcharts extends Component {
    render() {
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
                        {value:335, name:'直接访问'},
                        {value:210, name:'邮件营销'},
                    ],
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
        return(
            <ReactEcharts
                option={option}
                style={{width:"100%",height:this.props.proHeight+"px"}}
            />
        );
    }
}
export default OverallEcharts