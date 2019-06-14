import React, { Component } from "react";
import OverallEcharts from "../datashow/OverallEcharts";
import DataOverviewEcharts from "../DataOverviewEcharts";
class CurveChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="CurveChart" style={{width:"100%",height:'600px' }}>
            <DataOverviewEcharts
                type="dotdetails"
            />
        </div>
    );
  }
}
export default CurveChart;
