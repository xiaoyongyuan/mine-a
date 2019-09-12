import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Row, Col, Select, Pagination, Button, Empty} from "antd";
import axios from '../../axios';
import PageBreadcrumb from "../common/PageBreadcrumb";

import icon from "../../style/ztt/imgs/icon.png";
import Utils from "../../utils/utils";
import './index.less';

const Option = Select.Option;
class MyPlan extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      pageindex:1,
      pagination:{},
      code:[], //类别
      selecttype:'', //选择的类别
      routes:[
        {path: '', breadcrumbName: '项目管理'},
        {path: '', breadcrumbName: '系统预案'},
        {path: '/main/myplan', breadcrumbName: '我的预案'},
      ]
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
    this.setState({selecttype,page:1},()=>this.getPlanByPlantype())
  };
  requersPlantType = () =>{
      axios.ajax({
          baseURL:window.g.fileURL,
          method: 'get',
          url: '/api/dictionary',
          data: {
              dtype:'PLANTYPE',
          }
      }).then((res)=>{
          if(res.success){
              this.setState({
                  code:res.data
              })
          }
      });
  };
  getPlanByPlantype=()=>{
      this.params.code=this.state.selecttype || 0;
      
      axios.ajax({
          baseURL:window.g.bizserviceURL,
          method: 'get',
          url: 'api/plan',
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
      },()=>{});
  };
  render() {
      const isempty = this.state.isempty;
    return (
      <div className="MyPlan">
            <PageBreadcrumb routes={this.state.routes} />
          <Row>
              <Col span={24} className="query-col">
                    <p style={{marginBottom:"0",paddingTop:"5px"}}>分类：</p>
                  <Select defaultValue={this.state.selecttype} style={{ width: 120 }} onChange={this.selectopt}>
                      <Option value='' key='ss'>所有</Option>
                      {
                        this.state.code.map((el)=>(
                          <Option value={el.dvalue} key={el.dvalue}>{el.dname}</Option>
                        ))
                      }
                  </Select>
                  <Link className="detmain" to={'/main/edit'}>
                      <Button type="primary" className="addplan"><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
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
                                v.states==='1'?
                                <Link className="detmain" to={'/main/mylookplan?id='+v.code}>
                                <div className="dettitle">
                                  <div className="detlogo">
                                    <img src={icon} alt='logo' />
                                  </div>
                                  <div className="detname">
                                      <div className="plan-title">{v.plantitle}</div>
                                      <div><span className="greencolor">企业名称</span> {moment(v.createon).format('YYYY-MM-DD')}</div>
                                      <div className="intro">{v.summary}</div>
                                      <div className="planMore">更多&gt;&gt;&gt;</div>
                                  </div>
                                </div>
                                <div className="editbtn">
                                  <span style={{color:'#fff'}}>已发布</span>
                                </div>
                                </Link>
                                :
                              <Link className="detmain" to={'/main/edit?id='+v.code}>
                                <div className="dettitle">
                                  <div className="detlogo">
                                      <img src={icon} alt='logo' />
                                  </div>
                                  <div className="detname">
                                      <div className="plan-title">{v.plantitle}</div>
                                    {/*<div><span className="greencolor">{v.cname}</span> {v.khdate}</div>*/}
                                      <div><span className="greencolor">企业名称</span> <span className="time-plan">{moment(v.createon).format('YYYY-MM-DD')}</span></div>
                                      <div className="intro">{v.summary}</div>
                                      <div className="planMore">更多&gt;&gt;&gt;</div>
                                  </div>
                                </div>
                                <div className="editbtn">
                                  <span style={{color:'#fff'}}>草稿</span>
                                </div>
                                </Link>
                                }
                              </Col>
                      )):
                        <Empty />
                }
          </Row>
          </div>
          <Pagination className="PaginationRight" hideOnSinglePage {...this.state.pagination}/>
      </div>
    );
  }
}
export default MyPlan;
