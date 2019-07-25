import React, { Component } from 'react';
import './basedata.less'
import './mapshow.less'
import Egraph from "../common/Egraph";
class Basedata extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){
        
    }
    shape = () =>{
      alert("dd");
    };


    render() {
        return (
            <div className="Basedata">
                <div className="BasedataAll">
                    <div className="Basedata-item-zw">
                    </div>
                    <div className="Basedata-item-sbsl">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>设备数量</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>131/132</span>
                        </div>
                    </div>
                    <div className="Basedata-item-xbjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>形变监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>3/50</span>
                        </div>
                    </div>
                    <div className="Basedata-item-cjjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>沉降监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>6/68</span>
                        </div>
                    </div>
                    <div className="Basedata-item-dlfjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地裂缝监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>13/21</span>
                        </div>
                    </div>
                    <div className="Basedata-item-dxsjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地下水监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>6/58</span>
                        </div>
                    </div>
                    <div className="Basedata-item-dbsjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地表水监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>21/64</span>
                        </div>
                    </div>
                    <div className="Basedata-item-trhjjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>土壤环境监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>3/57</span>
                        </div>
                    </div>
                    <div className="Basedata-item-yljcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>雨量监测网</span>
                            </div>
                            <div className="jcwnumword">
                                在线数/总数
                            </div>
                        </div>
                        <div className="jcwnum">
                            <span>18/34</span>
                        </div>
                    </div>
                    <div className="columndl" style={{marginBottom:'10px'}}>
                        <div className="columndt">在线率及设备占比</div>
                        <div className="echartbj">
                            <Egraph key='fuk' dataHeight='200' cahrtp='piechart' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Basedata