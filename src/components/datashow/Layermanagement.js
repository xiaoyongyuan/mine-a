import React, { Component } from 'react';
// import Egraph from './../common/Egraph'
// import './mapshow.less'
import LayerEcharts1 from '../common/LayerEcharts1'
import LayerEcharts2 from '../common/LayerEcharts2'

class Layermanagement extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{tilte:'总图层数',value:10,all:40},
            data1:{tilte:'道路',value:0.10,all:4},
            data2:{tilte:'村庄',value:0.32,all:13}
        };
    }

    componentDidMount(){
        
    }


    render() {
        
        return (
            <div
            style={{width:"280px",height:"900px",padding:"0 0 0 75px"}}
            >
                <LayerEcharts1 data={this.state.data}  />
                <LayerEcharts1 data={this.state.data1} two='2' />
                <LayerEcharts1 data={this.state.data2} two='2' />
                <LayerEcharts2 />
            </div>
        );
    }
}
export default Layermanagement