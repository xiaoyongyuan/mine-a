import React, { Component } from "react";
import OverallEcharts from "../datashow/OverallEcharts";
import DataOverviewEcharts from "../DataOverviewEcharts";
import {Col} from "antd";
class CurveChart extends Component {
  constructor(props) {
    super(props);
    this.state={
        xdata:[]
    }
  }
  componentWillMount(){
      var xdata = this.props.xdata;
      var levelvalue = this.props.levelvalue;
      var vertical = this.props.vertical;
      var typeid = this.props.typeid;
      this.setState({
          xdata:xdata,
          levelvalue:levelvalue,
          vertical,
          typeid
      });
  }
  componentDidMount(){

  }
    test = (value) => {
      var EchaetsType;
      if(value === '1'){
          EchaetsType = "dotdetails";
      }else if(value === '2'){
          EchaetsType = "dotdetailtwo";
      }else {
          EchaetsType = "displacement";
      }
       return(
           <DataOverviewEcharts
            type={EchaetsType}
            xdata={this.state.xdata}
            levelvalue={this.state.levelvalue}
            vertical={this.props.vertical}
        />
       )
    };
  render() {
    return (
        <div className="CurveChart" style={{width:"100%",height:'600px' }}>
            {
                this.test(this.state.typeid)
            }
        </div>
    );
  }
}
export default CurveChart;
