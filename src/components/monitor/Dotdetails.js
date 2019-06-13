import React, { Component } from "react";
import { Tabs } from "antd";

import CurveChart from "./CurveChart";
import AlarmInfo from "./AlarmInfo";
import CheckReport from "./CheckReport.js";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
class Dotdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Dotdetails">
        aa
        <Tabs type="card">
          <TabPane tab="数据列表" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="曲线图" key="2">
            <CurveChart />
          </TabPane>
          <TabPane tab="报警信息" key="3">
            <AlarmInfo />
          </TabPane>
          <TabPane tab="检测报告" key="4">
            <CheckReport />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dotdetails;
