import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Monitoringdatas,CleanLayers } from '../../actions/postActions';

import './mapshow.less'
class Monitor extends Component {
    constructor(props){
        super(props);
        this.state={ 
            netlist:[],
            iconlist:["red","orange","yellow","green","blue","indigo","purple","gray"]

        };
    }
    componentWillUnmount(){
        // 促发清空图层
        this.props.CleanLayers(0);
    }

    componentDidMount(){
        homeSystemMonitoring.monitoringdata({layertype:3})
        .then(res=>{
            console.log(res);
            this.setState({
                netlist:res.data
            })
        })
    }
    // 点击各个监测网，促发redux
    monitoring(val){
        this.props.Monitoringdatas(val);
    }


    render() {
        let _this=this;
        return (
            <div className="Monitor">
                <dl className="columndl">
                    <dt className="columndt">监测网<a className="columndtright" href="/#/main/dotequip"></a></dt>
                    <List className='listitem'>
                        {
                            this.state.netlist.map(function(item,i){
                                return (
                                    <List.Item 
                                    onClick={_this.monitoring.bind(_this,item)}
                                    style={{textAlign:'left',paddingLeft:'35px',position:'relative'}} key={'Item'+i}>
                                    <span className={'micon micon'+_this.state.iconlist[i%8]} /> {item.layername}
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                </dl>
                <dl className="columndl">
                    <dt className="columndt">监测设备</dt>
                    <div className="egraph">
                        <Egraph dataHeight='150' cahrtp='columnar' />  
                    </div>
                </dl>
            </div>
        );
    }
}
Monitor.propTypes = {
    Monitoringdatas: PropTypes.func.isRequired,
    CleanLayers: PropTypes.func.isRequired
}


export default connect(null, { Monitoringdatas,CleanLayers })(Monitor); 