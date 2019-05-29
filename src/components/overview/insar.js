import React, { Component } from 'react';
import "../../style/yal/css/insar.css";
import { Row, Col, Button, DatePicker } from 'antd';
import test from '../../style/yal/image/test.png';
import moment from 'moment';
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import Utils from "../../utils/utils";
const { MonthPicker, RangePicker } = DatePicker;

class Insar extends Component {
  constructor(props){
    super(props);
    this.state={
        list:[],
    };
    this.formList = [
          {
              type:'datePicker',
              label: '日期',
              field:'selectdata',
              placeholder:'请输入日期',
              width: 150,
              // initialValue:'2019-03-09 12:09:09',
              // showTime:true,
              format:'YYYY-MM'
          },
      ]
  };
    componentDidMount(){
        this.requestList();
    };
    requestList = ()=>{
        axios.ajax({
            method: 'get',
            url: '/sensing',
            data: this.params
        }).then((res)=>{
            if(res.success){
                console.log("res",res);
                this.setState({
                    list:res.data,
                    pagination:Utils.pagination(res,(current)=>{
                        this.params.page=current;
                        this.requestList();
                    })
                })
            }
        });

    };

    handleFilterSubmit = (filterParams) => {
        // this.params = filterParams;

        this.requestList();
    };
    render() {
      return (
        <div className="Insar">
            <div className="InsarPush">
                <Row>
                    <Col>
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                    </Col>
                </Row>
                {this.state.list.map((el,i)=>(
                    <div>
                        <Row className="InsarTop">
                            <Col className="InsarTopLeft" span={12}>
                                <Row className="remote-sensing">
                                    <Col>矿山遥感影像</Col>
                                </Row>
                                <Row className="current-data">
                                    <Col>当前数据:{el.createin}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="InsarCenter">
                            <Col className="InsarCenterCol" span={24}>
                                <img src={el.img} alt="1"/>
                            </Col>
                        </Row>
                        <Row className="InsarBottom">
                            <Col>
                                <Row className="remote-sensing">
                                    <Col>
                                        矿山遥感数据分析
                                    </Col>
                                </Row>
                                <Row className="current-data">
                                    <Col>
                                        数字矿山
                                    </Col>
                                </Row>
                                <Row className="numk">
                                    <Col>
                                        矿产资源是社会发展和国民经济的重要物质基础，是我国重要支柱产业之一。随着我国经济的不断发展，对矿产资源的需求日益增加，伴随而来的环境问题和安全问题日益突出。遥感技术的不断进步，通过遥感技术监测矿产资源开发研究日益成熟，形成了较完整的技术路线。与常规手段相比，遥感技术用高空鸟瞰的形式进行探测，可以跨越交通的阻隔和视野的限制，遥感动态监测可以快速、及时地为有关部门行使政府职能及整顿矿业开发秩序提供适时、客观的基础数据与决策依据，能够增强监督管理中的高技术含量，提高监督管理效益和管理质量。山东省自2006年起开展矿山开采遥感监测试点工作，先后在全省93个县(市、区)基岩地区开展了多轮次监测；通过监测和野外核查统计，查清了监测区无证在采、停采图斑的分布现状和属性，及时发现越界开采、以采代探等违法现象，已经形成了全省基岩地区露天
                                        矿山遥感动态监测机制，为国土资源部门进行矿产资源的开发管理、低成本快速高效打击非法采矿行为，提供科学执法依据。但是矿山违法开采具有时断时续的不确定性，开采图斑的变化性，偷采的“游击”性和反复性，导致遥感动态监测工作还存在以下问题：(1)遥感监测成果发放不及时：由于监测区范围较大，遥感影像处理及图斑解译工作量较大，遥感监测成果采用传统的打印地图方式发放给市、县核查，导致了不能及时发现、核查疑似违法图斑；(2)数据核查质量不高：按照现行矿政管理体制，疑似违法开采图斑由当地矿政管理部门进行核查与查处，在工作开展过程中基层人员核查质量不高等问题，上级部门无法有效核实市、县上报数据的真实性和准确性，导致不能有效监督当地国土资源部门。
                                    </Col>
                                </Row>
                                <Row className="current-data">
                                    <Col>
                                        数字矿山
                                    </Col>
                                </Row>
                                <Row className="numk">
                                    <Col>
                                        针对遥感监测数量量大、数据发布不及时问题，本
                                        遥感监测数据服务注册到统一的资源目录，该目录采用CSW规范(Catalogue Service for the Web，网络目录服务)，支持GetCapabilities、 DescribeRecord、GetRecords、GetRecordById等操作。基于统
                                        遥感监测数据服务注册到统一的资源目录，该目录采用CSW规范(Catalogue Service for the Web，网络目录服务)，支持GetCapabilities、 DescribeRecord、GetRecords、GetRecordById等操作。基于统一的资源目录，各级用户根据用户权限与行政区域获取相应监测数据服务。一的资源目录，各级用户根据用户权限与行政区域获取相应监测数据服务。文提供了一种基于天地图的监测数据快速发布方法，该方法遵循统一规范，充分利用天地图在线服务体系，将监测影像和图斑数据按照规范进行发布，不涉及软件开发，工作效率高，形成一套完整的“服务发布、服务注册、用户发现、服务共享”机制，有效提高了遥感监测成果发放速度，确保监测数据的时效性。
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    )
                )}
            </div>
        </div>
      );
  }
}

export default Insar;
