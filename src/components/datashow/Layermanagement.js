import React, { Component } from 'react';
// import Egraph from './../common/Egraph'
// import './mapshow.less'
import LayerEcharts1 from '../common/LayerEcharts1'
import LayerEcharts2 from '../common/LayerEcharts2'
import menubg from '../../style/imgs/menubg.png'

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
            <div className="Layermanagement" style={{width:"100%"}}>
                <p className="myiconfont">
                    <span className="actionfont action-guanli1"></span><span>图层管理</span>
                </p>
                <div className="LayerAll" style={{height: '100%',paddingLeft: '59px'}}>
                    <div style={{width:"100%",margin:"12% 10%"}}>
                        <div style={{width:"176px",height:"22px",background:"#0C3E5E",textAlign:"left",color:"#00ADDF",fontSize:"16px",paddingLeft:"5px"}}>行政区划</div>
                        <div style={{width:"176px",height:"45px",background:`url('${ menubg }') 100% 100% / cover no-repeat`,lineHeight:"45px",textAlign:"center",color:"white",fontSize:"18px"}}>陕西省榆林市</div>
                    </div>
                    <LayerEcharts1 data={this.state.data}  />
                    <LayerEcharts1 data={this.state.data1} two='2' />
                    <LayerEcharts1 data={this.state.data2} two='2' />
                    <LayerEcharts2 />
                </div>
            </div>
        );
    }
}
export default Layermanagement