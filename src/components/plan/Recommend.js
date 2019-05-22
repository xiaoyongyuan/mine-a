import React, { Component } from 'react';
import {Tabs,Row, Col,Select,Modal, Button} from 'antd'
import "../../style/yal/css/myplan.css";
import plan from '../../style/yal/image/plan.png';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

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
class Recommend extends Component {
  constructor(props){
    super(props);
    this.state={
      list:list
    };
  }
  showConfirm() {
        confirm({
            title: '添加',
            content: '确认添加至我的预案？',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
    return (
      <div className="Recommend">
          <Tabs type="card">
              <TabPane tab="系统推荐预案" key="1">
                  {
                      this.state.list.map((v,i)=>(
                          <Row>
                              <Col className="myplan-item">
                                  <Row className="recommend-item-inner">
                                      <Col className="recommend-item-left" span={3}>
                                          <div className="imgdiv">
                                              <img src={plan} alt="1"/>
                                          </div>
                                      </Col>
                                      <a href={"#/main/plan/detailplan"}>
                                          <Col className="myplan-item-right" span={17} push={1}>
                                              <div className="wordone">XXX矿山企业地址灾害预案</div>
                                              <div className="wordtwo">沉陷与地裂缝的关系，防治结合，综合治理</div>
                                              <div className="wordtwo">1.地下已废弃巷道或踩空区出现地面塌陷、地裂缝时，采取地下回填废渣，地下已废弃巷道或踩空区出现地面塌陷、地裂缝时，采取地下回填废渣减缓地面沉陷速度；</div>
                                          </Col>
                                      </a>
                                        <Col onClick={ this.showConfirm } className="addmy" span={3} push={1}>
                                            <div className="wordadd">添加</div>
                                            <div className="wordmy">至我的预案</div>
                                        </Col>

                                  </Row>
                              </Col>
                          </Row>
                      ))
                  }
              </TabPane>
              <TabPane tab="企业预案" key="2">
                  Content of Tab Pane 2
              </TabPane>
          </Tabs>
      </div>
    );
  }
}

export default Recommend;
