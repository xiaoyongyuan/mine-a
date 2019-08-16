import React, { Component } from 'react';
import MonitorequipEcharts from './../common/MonitorequipEcharts';
import homeSystemMonitoring from '../../axios/homeSystemMonitoring'
import './mapshow.less';
import './monitorequip.less';

// 背景颜色
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
import { Monitoring } from '../../actions/postActions';

class Monitorequip extends Component {
    constructor(props){
        super(props);
        this.state={  
            online:0, 
            total:0,
            monitoringdata:[]
        };
    }

    componentWillMount(){
        homeSystemMonitoring.monitoring()
        .then(res=>{
            //   算监测设备总数
            let sums1 = this.totalnums(res.data,'totalnum');
            // 算监测设备在线数 On-line
            let sums2 = this.totalnums(res.data,'onlinenum');
            this.setState({
                monitoringdata:res.data,
                total:sums1,
                online:sums2
            })
        })
    }

    //   算监测设备总数,算监测设备在线数
    totalnums(arr,some){
        var s = 0;
        arr.forEach(function(val, idx, arr) {
          s +=  parseInt(val[some]);
        }, 0);
        return s;
    }

    // 点击各个监测网,触发redux
    monitoringfun(val){
        this.props.Monitoring(val);
    }
    render() {
        var _this=this;
        // 背景图 whitebg
        var bgdata=[redbg,orangebg,yellowbg,greenbg,bluebg,Navybluebg,purplebg];

        return (
            <div className="monitorequip">
                <p className="myiconfont">
                    <span className="actionfont action-101"></span><span>监测设备</span>
                </p>
                <div className="BasedataAll">
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
                            <span>{ this.state.online }/{ this.state.total }</span>
                        </div>
                    </div>

                    {
                        this.state.monitoringdata.map(function(item,keys){
                            return (
                            <div className="Basedata-item-xbjcw" 
                            key={keys} 
                            onClick={ _this.monitoringfun.bind(_this,item) } 
                            style={{ background:`url('${ bgdata[keys%6] }') 100% 100% / cover no-repeat`}}>
                                <div className="jcwname">
                                    <div className="jcwword">
                                        <span>{ item.netname }</span>
                                    </div>
                                    <div className="jcwnumword">
                                        在线数/总数
                                    </div>
                                </div>
                                <div className="jcwnum">
                                    <span>{ item.onlinenum }/{ item.totalnum }</span>
                                </div>
                            </div>
                            )
                        })
                    }
                    <div className="columndl" style={{marginBottom:'10px'}}>
                        <div className="columndt">在线率及设备占比</div>
                        <div style={{width:'100%'}}>
                            <MonitorequipEcharts />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Monitorequip.propTypes = {
    Monitoring: PropTypes.func.isRequired
}

export default connect(null, { Monitoring })(Monitorequip); 