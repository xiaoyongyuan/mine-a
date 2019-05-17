import React, { Component } from 'react';
import {Row, Col} from "antd";
import "../../style/yal/css/fissure.css";
import DataOverviewEcharts from "../DataOverviewEcharts";

const list=[
    {
        name:'1矿山',
        equpname:'1设备',
        datas:[444, 456, 934, 789, 339, 1330, 1320,720, 632, 501, 660, 880, 660, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 777, 501],
        maxdata:1350,
        mindata:220
    },
    {
        name:'2矿山',
        equpname:'2设备',
        datas:[587, 678, 789, 1320, 1320, 1330, 880,720, 632, 880, 934, 880, 1330, 567,934, 660, 632, 1320,720, 632, 501, 934, 509, 501, 590],
        maxdata:1200,
        mindata:350
    },
    {
        name:'3矿山',
        equpname:'3设备',
        datas:[666, 987, 632, 632, 720, 239, 1320,720, 632, 501, 934, 880, 1330, 567,632, 660, 880, 880,720, 632, 501, 934, 501, 777, 1320],
        maxdata:1500,
        mindata:240
    },
    {
        name:'4矿山',
        equpname:'4设备',
        datas:[555, 789, 501, 720, 1330, 1330, 1320,720, 632, 501, 934, 880, 1330, 567,934, 660, 1330, 1320,720, 632, 501, 934, 509, 777, 590],
        maxdata:1200,
        mindata:440
    },
    {
        name:'5矿山',
        equpname:'5设备',
        datas:[657, 643, 567, 934, 1290, 1330, 1320,720, 632, 501, 934, 880, 632, 567,934, 660, 880, 1320,720, 632, 501, 934, 509, 777, 590],
        maxdata:1444,
        mindata:333
    }
];

class Fissure extends Component {
  constructor(props){
    super(props);
    this.state={
        list:list
    };
  }

    render() {
    return (
      <div className="Fissure">
          <a href={"#/main/geology/detaildata"}>
              <Row className="fissure-item" type="flex" justify="space-between">
                  {
                      this.state.list.map((v,i)=>(
                          <Col className="fissure-item-col" span={11}>
                              <div className="title"><span className="titleName">{ v.name }监测点——{ v.equpname }设备</span></div>
                              <DataOverviewEcharts
                                  type="acceptance"
                                  // proHeight={200}
                                  data={v.datas}
                                  maxdata={v.maxdata}
                                  mindata={v.mindata}
                              />
                          </Col>
                      ))
                  }
              </Row>
          </a>
      </div>
    );
  }
}

export default Fissure;
