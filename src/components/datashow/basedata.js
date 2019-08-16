import React, { Component } from 'react';
import './basedata.less'
import BaseEchart from "../common/BaseEchart";
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";

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
            responsedata:[],
            total:0
        };
    }
    componentWillMount(){
        // 请求数据
        homeSystemMonitoring.basedatalist()
        .then(res => {
            console.log(res)
            //   算基础数据总数
            let sums = this.sum(res.data);
            this.setState({ 
                responsedata: res.data,
                total:sums
             });
          });
    }
    //   算基础数据总数
    sum(arr){
        var s = 0;
        arr.forEach(function(val, idx, arr) {
          s +=  parseInt(val.netnum);
        }, 0);
        return s;
    }

    // 点击各个监测网,触发redux
    Changeglobe(val){
      this.props.ChangeEarth(val);
    }

    render() {
        var _this=this;
        // 背景图 whitebg
        var bgdata=[redbg,orangebg,yellowbg,greenbg,bluebg,Navybluebg,purplebg]
        // 字体和背景颜色一致 white
        var wddata=['#E9261C','#D25400','#F7DA16','#189542','#0480FE','#1C459D','#512465']
        return (
            <div className="Basedata">
                <p className="myiconfont">
                    <span className="actionfont action-shujuzonglan"></span><span>基础数据</span>
                </p>
            
                <div className="BasedataAll" id="BasedataAll">
                <div className="Basedata-item-sbsl" 
                    style={{width:'215px',height: '42px',marginTop: '15px',background:`url('${ whitebg }') 100% 100% / cover no-repeat`}}>
                        <div className="jcwname">
                            <div className="jcwword">
                                <span>基础数据总数</span>
                            </div>
                            <div style={{ width: '20%',fontSize: 18,color:'white'}}>
                                {this.state.total} 
                            </div>
                        </div>
                </div>
                    {
                        this.state.responsedata.map(function(item,keys){
                          return (
                                <div className="Basedata-item-sbsl" 
                                onClick={_this.Changeglobe.bind(_this,item)}
                                key={item.netid} 
                                style={{ width:'215px',height: '42px',marginTop: '15px',background:`url('${ bgdata[keys%6] }') 100% 100% / cover no-repeat`}}>
                                    <div className="jcwname">
                                        <div className="jcwword">
                                            <span>{item.netname}</span>
                                        </div>
                                        <div style={{ width: '20%',fontSize: 18,color:`${ wddata[keys%6] }`}}>
                                            {item.netnum} 
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