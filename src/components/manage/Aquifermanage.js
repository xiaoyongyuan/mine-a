import React, { Component } from 'react';
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane;


class Aquifermanage extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

    render() {
    return (
      <div className="Aquifermanage">
        <Tabs type="card">
          <TabPane tab="水位" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="水压" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="在线监测" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="水质简分析" key="4">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="水质全分析" key="5">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default Aquifermanage;
