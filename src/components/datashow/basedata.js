import React, { Component } from 'react';
import './basedata.less'
// import './mapshow.less'
import BaseEchart from "../common/BaseEchart";

// 背景颜色
import whitebg from '../../style/imgs/sbsl.png';
import redbg from '../../style/imgs/xbjcw.png';
import orangebg from '../../style/imgs/cjjcw.png';
import yellowbg from '../../style/imgs/dlfjcw.png';
import greenbg from '../../style/imgs/dxsjcw.png';
import bluebg from '../../style/imgs/dbsjcw.png';
import Navybluebg from '../../style/imgs/trhjjcw.png';
import purplebg from '../../style/imgs/yljcw.png';
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ChangeEarth } from '../../actions/postActions';

class Basedata extends Component {
    constructor(props){
        super(props);
        this.state={   
            responsedata:[
                {"id":1,"name":"基础数据个数","num":232,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/xingbian_jiance4/FeatureServer"},
                {"id":2,"name":"形变监测网","num":60,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":3,"name":"沉降监测网","num":20,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":4,"name":"地裂缝监测网","num":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":5,"name":"地下水监测网","num":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":6,"name":"地表水监测网","num":75,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":7,"name":"土壤环境监测网","num":25,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":8,"name":"雨量监测网","num":32,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
            ],
            
        };
    }

    componentDidMount(){
        
    }
    shape = () =>{
      alert("dd");
    };
    Changeglobe(val){
      console.log('触发redux');
      console.log(this);
      console.log(val);

      this.props.ChangeEarth(val);
    };


    render() {
        var _this=this;
        // 背景图
        var bgdata=[whitebg,redbg,orangebg,yellowbg,greenbg,bluebg,Navybluebg,purplebg]
        // 字体和背景颜色一致
        var wddata=['white','#e62920','#d15705','#f9da15','#1c9544','#037ffe','#1c459d','#552967']
        return (
            <div className="Basedata">
                <div className="BasedataAll" id="BasedataAll">
                    <div className="Basedata-item-zw">
                    </div>
                    {
                        this.state.responsedata.map(function(item,keys){
                          return (
                                <div className="Basedata-item-sbsl" 
                                onClick={_this.Changeglobe.bind(_this,item)}
                                key={item.id} 
                                style={{ marginTop: 10,height: 35,background:`url('${ bgdata[keys] }') 100% 100% / cover no-repeat`}}>
                                    <div className="jcwname">
                                        <div className="jcwword">
                                            <span>{item.name}</span>
                                        </div>
                                        {/* className="jcwnumword colorBase" */}
                                        <div style={{ width: '20%',fontSize: 18,color:`${ wddata[keys] }`}}>
                                            {item.num} 
                                        </div>
                                    </div>
                                </div>
                            )})
                    }

                    
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
Basedata.propTypes = {
    ChangeEarth: PropTypes.func.isRequired
}

export default connect(null, { ChangeEarth })(Basedata); 