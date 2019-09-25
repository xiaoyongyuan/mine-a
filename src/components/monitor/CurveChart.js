import React, { Component } from "react";
import DataOverviewEcharts from "../DataOverviewEcharts";
import axios from "../../axios";

class CurveChart extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  componentWillMount(){

        //   数据
      var datainfo = this.props.datainfo;
        //   时间
      var createon = this.props.createon;
        // 点位id
      var typeid = this.props.typeid;
        // 类型 
      var deviceType = this.props.deviceType;
        // 单位
      var units = this.props.units;

      console.log("数据",datainfo);
      console.log("时间",createon);
      console.log("typeid",typeid);
      console.log("deviceType",deviceType);
      console.log("单位",units);

      this.setState({
        datainfo,
        createon,
        deviceType,
        typeid,
        units
      });
  }
  componentDidMount(){

  }
    test = (id,type) => {
        // 地表水监测网：ph01 雨量监测网：rain01 土壤环境监测网：env01 地裂缝监测网：rope01
       return(
           <DataOverviewEcharts
            type={type}
            typeid={this.state.typeid}
            deviceType={this.state.deviceType}
            datainfo={this.state.datainfo}
            createon={this.state.createon}
            units={this.state.units}
        />
       )
    };
  render() {
    return (
        <div className="CurveChart" style={{width:"100%",height:'600px' }}>
            {
                this.test(this.state.typeid,this.state.deviceType)
            }
        </div>
    );
  }
}
export default CurveChart;
