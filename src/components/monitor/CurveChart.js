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
      this.setState({
          xdata:xdata,
          levelvalue:levelvalue,
          vertical,
      });
      console.log("vertical11",vertical);
  }
  componentDidMount(){

}
  render() {
    return (
        <div className="CurveChart" style={{width:"100%",height:'600px' }}>
            <DataOverviewEcharts
                type="dotdetails"
                xdata={this.state.xdata}
                levelvalue={this.state.levelvalue}
                vertical={this.props.vertical}
            />
            {/*<DataOverviewEcharts*/}
                {/*type="displacement"*/}
                {/*datax={[22, 675, 356, 789, 339, 1330, 1320,720, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 134]}*/}
                {/*// datay={v.datay}*/}
                {/*// dataz={v.dataz}*/}
            {/*/>*/}
        </div>
    );
  }
}
export default CurveChart;
