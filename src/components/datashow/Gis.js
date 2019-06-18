import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon,List,Card,Progress,Typography } from 'antd'
import Egraph from './../common/Egraph'



import './mapshow.less'
class Gis extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){

    }


    render() {
        
        return (
            <div className="Gis">
                <List className='listitem'>
                    <List.Item key='Item1'>地形地貌</List.Item>
                    <List.Item key='Item1'>INSAR</List.Item>
                    <List.Item key='Item1'>高光谱</List.Item>
                    <List.Item key='Item1'>土地损毁与复垦</List.Item>
                </List>
                <dl className="columndl">
                    <dt className="columndt">土地损毁</dt>
                    <div className="egraph">
                        <Egraph key='sunh' dataHeight='150' cahrtp='meter' />  
                    </div>
                </dl>
                <dl className="columndl">
                    <dt className="columndt">土地复垦</dt>
                    <div className="egraph">
                        <Egraph key='fuk' dataHeight='150' cahrtp='meter' />    
                    </div>
                </dl>
            </div>
        );
    }
}
export default Gis