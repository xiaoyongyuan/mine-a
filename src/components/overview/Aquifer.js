import React, { Component } from 'react';
import {Row, Col,Tabs} from 'antd'
import "../../style/yal/css/fissure.css";
import "../../style/yal/css/qualityeasy.css";
import DataOverviewEcharts from "../DataOverviewEcharts";
import easy from '../../style/yal/image/easy.png';
import test from "../../style/yal/image/test.png";


const TabPane = Tabs.TabPane;
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

class Aquifer extends Component {
  constructor(props){
    super(props);
    this.state={
      list:list,
      pagination:{}
    };
    this.params = {
        page:1,
    }
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="Aquifer">
          <Tabs type="card">
              <TabPane tab="水位" key="1">
                  <Row className="fissure-item" type="flex" justify="space-between">
                      {
                          this.state.list.map((v,i)=>(
                              <Col className="fissure-item-col" span={11}>
                                  <div className="title"><span className="titleName">{ v.name }监测点——{ v.equpname }设备</span></div>
                                  <DataOverviewEcharts
                                      type="waterlevel"
                                      data={v.datas}
                                      maxdata={v.maxdata}
                                      mindata={v.mindata}
                                  />
                              </Col>
                          ))
                      }
                  </Row>
              </TabPane>
              <TabPane tab="水压" key="2">
                  Content of Tab Pane 2
              </TabPane>
              <TabPane tab="在线监测" key="3">
                  <Row className="qualityonline" type="flex" justify="space-between">
                      {
                          this.state.list.map((v,i)=>(
                              <Col span={11}>
                                  <Row>
                                      <Col className="qualityonline-item-col-title" span={24}>
                                          <div className="big-title">矿山XXX监测点——XXX设备</div>
                                          <div className="small-title">监测点:监测点一,监测点二</div>
                                      </Col>
                                  </Row>
                                  <Row className="qualityonline-item" type="flex" justify="space-between">
                                      {/*{*/}
                                      {/*this.state.list.map((v,i)=>(*/}
                                      <Col className="qualityonline-item-col" span={24}>
                                          {/*<div className="title"><span className="titleName">{ v.name }监测点——{ v.equpname }设备</span></div>*/}
                                          <DataOverviewEcharts
                                              type="qualityonline"
                                              // data={v.datas}
                                              // maxdata={v.maxdata}
                                              // mindata={v.mindata}
                                          />
                                      </Col>
                                      {/*))*/}
                                      {/*}*/}
                                  </Row>
                              </Col>
                          ))
                      }
                  </Row>
              </TabPane>
              <TabPane tab="水质简分析" key="4">
                  <Row className="qualityeasy-row">
                      <Col className="qualityeasy-col" span={22}>
                          <Row className="qualityeasy-row-one">
                              <Col span={18}>
                                  <span>2019-12-12 09:18:23</span>
                              </Col>
                              <Col span={6}>
                                  <span>检测结果:异常</span>
                              </Col>
                          </Row>
                          <Row className="qualityeasy-row-two">
                              <Col>
                                  <span>
                                      监测点：监测点一，监测点二
                                  </span>
                              </Col>
                          </Row>
                          <Row className="qualityeasy-row-three">
                              <Col>
                                  <span>
                                      说明：这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明这是备注说明
                                  </span>
                              </Col>
                          </Row>
                          <Row className="qualityeasy-row-four">
                              <Col>
                                  <div className="qualityeasy-img">
                                      <div className="qualityeasy-img-inner">
                                          <img src={easy} alt="1"/>
                                      </div>
                                  </div>
                              </Col>
                          </Row>
                      </Col>
                  </Row>
              </TabPane>
              <TabPane tab="水质全分析" key="5">
                  Content of Tab Pane 3
              </TabPane>
          </Tabs>
      </div>
    );
  }
}

export default Aquifer;
