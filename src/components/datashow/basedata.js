import React, { Component } from 'react';
import './basedata.less'
// import './mapshow.less'
import BaseEchart from "../common/BaseEchart";

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
                                <span>基础数据个数</span>
                            </div>
                            <div className="jcwnumword colorBase">
                                232 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-xbjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>形变监测网</span>
                            </div>
                            <div className="jcwnumword colorDeformation">
                                60  
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-cjjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>沉降监测网</span>
                            </div>
                            <div className="jcwnumword colorSediment">
                                20 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-dlfjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地裂缝监测网</span>
                            </div>
                            <div className="jcwnumword colorFissure">
                                10 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-dxsjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地下水监测网</span>
                            </div>
                            <div className="jcwnumword colorGroundwater">
                                10 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-dbsjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>地表水监测网</span>
                            </div>
                            <div className="jcwnumword colorSurface">
                                75 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-trhjjcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>土壤环境监测网</span>
                            </div>
                            <div className="jcwnumword colorSoil">
                                25 
                            </div>
                        </div>
                    </div>
                    <div className="Basedata-item-yljcw">
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>雨量监测网</span>
                            </div>
                            <div className="jcwnumword colorRainfall">
                                32 
                            </div>
                        </div>
                    </div>
                    <div className="columndl" style={{marginBottom:'10px'}}>
                        <div className="columndt">各网基础数据对比</div>
                        <div className="echartbox">
                            <BaseEchart />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Basedata