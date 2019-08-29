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
      var xdata = this.props.xdata;
      var levelvalue = this.props.levelvalue;
      var vertical = this.props.vertical;
      var typeid = this.props.typeid;
      var deviceType = this.props.deviceType;

      this.setState({
          xdata:xdata,
          levelvalue:levelvalue,
          vertical,
          deviceType,
          typeid
      });
  }
  componentDidMount(){

  }
    test = (id,type) => {
      var EchaetsType;
      if(type === '1'){
          EchaetsType = "dotdetails";
      }
      else {
          EchaetsType = "dotdetails2";
      }
       return(
           <DataOverviewEcharts
            type={EchaetsType}
            typeid={this.state.typeid}
            deviceType={this.state.deviceType}
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
                this.test(this.state.typeid,this.state.deviceType)
            }
        </div>
    );
  }
}
export default CurveChart;
