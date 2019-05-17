import React, { Component } from 'react';
import {Row, Col} from "antd";
import "../../style/yal/css/qualityonline.css";
import DataOverviewEcharts from "../DataOverviewEcharts";
import OverallEcharts from "../datashow/OverallEcharts";

const list=[
    {
        name:'1矿山',
        equpname:'1设备',
    },
    {
        name:'2矿山',
        equpname:'2设备',
    },
    {
        name:'3矿山',
        equpname:'3设备',
    },
    {
        name:'4矿山',
        equpname:'4设备',
    },
    {
        name:'5tt矿山',
        equpname:'5设备',
    },
];

class Qualityonline extends Component {
  constructor(props){
    super(props);
      this.state={
          list:list
      };
  }

    render() {
      return (
        <div className="Qualityonline">
            <Row className="qualityonline-item" type="flex" justify="space-between">
                {
                    this.state.list.map((v,i)=>(
                        <Col className="qualityonline-item-col" span={11}>
                            <DataOverviewEcharts
                                type="qualityonline"
                                name={v.name}
                            />
                        </Col>
                    ))
                }
            </Row>
        </div>
      );
  }
}

export default Qualityonline;
