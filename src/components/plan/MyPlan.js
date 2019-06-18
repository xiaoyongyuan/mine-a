import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Select, Pagination, Typography, Button, Empty} from "antd";
import axios from '../../axios'
import ofteraxios from '../../axios/ofter'

import Utils from "../../utils/utils";
import './index.less'

const { Title,Paragraph } = Typography;
const Option = Select.Option;

class MyPlan extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      page:1,
      pagination:{},
      plantype:[], //类别
      selecttype:'' //选择的类别
    };
  }
    params = {
        pageindex:1,
        pagesize:9
    };
  componentDidMount(){
      this.requersPlantType();
      this.getPlanByPlantype();
  }
  selectopt=(selecttype)=>{ //选择类别
      console.log("selecttype",selecttype);
    this.setState({selecttype,page:1},()=>this.getPlanByPlantype())
  };
  requersPlantType = () =>{
      axios.ajax({
          baseURL:'http://192.168.10.29:8001/sys',
          method: 'get',
          url: '/api/findDictionaryByType',
          data: {
              dtype:'PLANTYPE',
          }
      }).then((res)=>{
          if(res.success){
              this.setState({
                  plantype:res.data
              })
          }
      });
  };
  getPlanByPlantype=()=>{
      this.params.plantype=this.state.selecttype || 0;
      // this.params.pageindex = this.state.pageindex;
      axios.ajax({
          baseURL:'http://192.168.10.29:8002/bizservice',
          method: 'get',
          url: '/api/getPlanByPlantype',
          data: this.params
      }).then((res)=>{
          if(res.success){
              this.setState({
                  list:res.data,
                  isempty:res.data.length,
                  pagination:Utils.pagination(res,(current)=>{
                      this.params.pageindex=current;
                      this.getPlanByPlantype();
                  })
              })
          }
      });
  };
  // requestList=()=>{
  //     console.log("dfd",this.state.selecttype === '');
  //     this.params.plantype=this.state.selecttype;
  //     axios.ajax({
  //         baseURL:'http://192.168.10.29:8002/bizservice',
  //       method: 'get',
  //       url: '/api/plan',
  //       data: this.params
  //     }).then((res)=>{
  //       if(res.success){
  //         this.setState({
  //             list:res.data,
  //             pagination:Utils.pagination(res,(current)=>{
  //                 this.params.pageindex=current;
  //                 this.requestList();
  //             })
  //         })
  //       }
  //     });
  // };
  render() {
      const isempty = this.state.isempty;
    return (
      <div className="MyPlan">
          <Row>
              <Col span={24} className="query-col">
                  <Select defaultValue={this.state.selecttype} style={{ width: 120 }} onChange={this.selectopt}>
                      <Option value='' key='ss'>所有</Option>
                      {
                        this.state.plantype.map((el)=>(
                          <Option value={el.dvalue} key={el.dvalue}>{el.dname}</Option>
                        ))
                      }
                  </Select>
                  <Link className="detmain" to={'/main/edit'}>
                      <Button type="primary" className="addplan">新增</Button>
                  </Link>
              </Col>
          </Row>
          <div className="planlist">
            <Row gutter={16}>
                {
                    isempty>0?
                      this.state.list.map((v,i)=>(
                              <Col className="gridcol" key={v.code} md={24} xl={12} xxl={8}>
                              {
                                v.states?
                                <Link className="detmain" to={'/main/lookplan?id='+v.code}>
                                <div className="dettitle">
                                  <div className="detlogo">
                                    {/*<img src={v.Logo} />*/}
                                  </div>
                                  <div className="detname">
                                      <div className="plan-title">{v.title}</div>
                                    {/*<div><span className="greencolor">{v.cname}</span> {v.khdate}</div>*/}
                                      <div><span className="greencolor">测试写死</span> 2019-10-12</div>
                                      <div className="intro">{v.summary}</div>
                                  </div>
                                </div>
                                </Link>
                                :
                              <Link className="detmain" to={'/main/edit?id='+v.code}>
                                <div className="dettitle">
                                  <div className="detlogo">
                                    {/*<img src={v.Logo} />*/}
                                  </div>
                                  <div className="detname">
                                      <div className="plan-title">{v.title}</div>
                                    {/*<div><span className="greencolor">{v.cname}</span> {v.khdate}</div>*/}
                                      <div><span className="greencolor">测试写死</span> <span className="time-plan">2019-10-12</span></div>
                                      <div className="intro">{v.summary}</div>
                                  </div>
                                </div>
                                <div className="editbtn">
                                  <span style={{color:'#fff'}}>编辑</span>
                                </div>
                                </Link>
                                }
                              </Col>
                      )):
                        <Empty />
                }
          </Row>
          </div>
          <Pagination className="PaginationRight" {...this.state.pagination}/>
      </div>
    );
  }
}
export default MyPlan;
