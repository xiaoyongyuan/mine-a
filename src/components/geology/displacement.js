import React, { Component } from 'react';
import "../../style/yal/css/fissure.css";
import DataOverviewEcharts from "../DataOverviewEcharts";
import {Col, Row} from "antd";


const list=[
    {
        name:'1矿山',
        equpname:'1设备',
        datax:[444, 675, 356, 789, 339, 1330, 1320,720, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 134],
        datay:[220, 182, 191, 234, 290, 330, 310, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,220, 182, 191, 234, 290, 330, 310],
        dataz:[333, 456, 934, 789, 339, 178, 123,720, 632, 501, 333, 880, 654, 567,934, 660, 222, 1320,720, 632, 501, 35, 509, 777],
    },
    {
        name:'1矿山',
        equpname:'1设备',
        datax:[444, 675, 356, 789, 339, 1330, 1320,720, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 134],
        datay:[220, 182, 191, 234, 290, 330, 310, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,220, 182, 191, 234, 290, 330, 310],
        dataz:[333, 456, 934, 789, 339, 178, 123,720, 632, 501, 333, 880, 654, 567,934, 660, 222, 1320,720, 632, 501, 35, 509, 777],
    },
    {
        name:'1矿山',
        equpname:'1设备',
        datax:[444, 675, 356, 789, 339, 1330, 1320,720, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 134],
        datay:[220, 182, 191, 234, 290, 330, 310, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,220, 182, 191, 234, 290, 330, 310],
        dataz:[333, 456, 934, 789, 339, 178, 123,720, 632, 501, 333, 880, 654, 567,934, 660, 222, 1320,720, 632, 501, 35, 509, 777],
    },
];

class Displacement extends Component {
  constructor(props){
    super(props);
    this.state={
      list:list
    };
  }

    render() {
    return (
      <div className="Displacement">
          <Row className="fissure-item" type="flex" justify="space-between">
              {
                  this.state.list.map((v,i)=>(
                      <Col className="fissure-item-col" span={11}>
                          <div className="title"><span className="titleName">{ v.name }监测点——{ v.equpname }设备</span></div>
                          <DataOverviewEcharts
                              type="displacement"
                              datax={v.datax}
                              datay={v.datay}
                              dataz={v.dataz}
                          />
                      </Col>
                  ))
              }
              {/*<Col className="fissure-item-col" span={11}>*/}
                  {/*<div className="title"><span className="titleName">xxx监测点——xx设备</span></div>*/}
                  {/*<DataOverviewEcharts*/}
                      {/*type="displacement"*/}
                  {/*/>*/}
              {/*</Col>*/}
          </Row>
      </div>
    );
  }
}

export default Displacement;
