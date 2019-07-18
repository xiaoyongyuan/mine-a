import React, { Component } from 'react';
import './basedata.less'
class Basedata extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){
        
    }


    render() {
        return (
            <div className="Basedata">
                <div className="basedata-item">
                    基础数据个数
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    形变监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    沉降监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    地裂缝监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    地下水监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    地表水监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    土壤环境监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
                <div className="basedata-item">
                    地表水监测网
                </div>
                <div className="basedata-item">
                    130
                </div>
            </div>
        );
    }
}
export default Basedata