import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col,Select,Pagination, Typography } from "antd";
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
    this.params = {
        page:1,   
    }
  }
  componentDidMount(){
    const _this=this;

    ofteraxios.plantype().then((res)=>{
      if(res.success){
        _this.setState({plantype:res.data},()=>{
          _this.requestList()
        })
        } 
    })
    
   
  }
  selectopt=(selecttype)=>{ //选择类别
    this.setState({selecttype},()=>this.requestList())
  }

  requestList=()=>{
      this.params.selecttype=this.state.selecttype;
      axios.ajax({
        baseURL:window.g.cuiURL,
        method: 'get',
        url: '/api/plan',
        data: this.params
      }).then((res)=>{
        if(res.success){
          this.setState({
              list:res.data,
              pagination:Utils.pagination(res,(current)=>{
                  this.params.page=current;
                  this.requestList();
              })
          })
        }
      });
  }


  render() {     
    return (
      <div className="MyPlan">
          <Row>
              <Col span={5}>
                  <Select defaultValue={this.state.selecttype} style={{ width: 120 }} onChange={this.selectopt}>
                      <Option value='' key='ss'>所有</Option>
                      {
                        this.state.plantype.map((el)=>(
                          <Option value={el.code} key={el.code}>{el.cname}</Option>
                        ))
                      }
                  </Select>
              </Col>
          </Row>
          <div className="planlist">
            <Row gutter={16}>{
              this.state.list.map((v,i)=>(
                      <Col className="gridcol" key={v.code} md={24} xl={12} xxl={8}>
                      {
                        !v.draft?
                        <Link className="detmain" to={'/main/lookplan?id='+v.code}>
                        <div className="dettitle">
                          <div className="detlogo">
                            <img src={v.Logo} />
                          </div>
                          <div className="detname">
                            <Title level={4}>
                            <Paragraph ellipsis={{ rows: 1}}>
                                {v.addrs}
                            </Paragraph>
                            </Title>
                            <div><span className="greencolor">{v.cname}</span> {v.khdate}</div>
                          </div>
                        </div>
                        <div className="intro">{v.intro}</div>
                        </Link>
                        :
                      <Link className="detmain" to={'/main/edit?id='+v.code}>
                        <div className="dettitle">
                          <div className="detlogo">
                            <img src={v.Logo} />
                          </div>
                          <div className="detname">
                            <Title level={4}>
                            <Paragraph ellipsis={{ rows: 1}}>
                                {v.addrs}
                            </Paragraph>
                            </Title>
                            <div><span className="greencolor">{v.cname}</span> {v.khdate}</div>
                          </div>
                        </div>
                        <div className="editbtn">
                          <span style={{color:'#fff'}}>编辑</span>
                        </div>
                        <div className="intro">{v.intro}</div>
                        </Link>
                        }
                      </Col>
                  
              ))
          }</Row>
          </div>
          <Pagination className="PaginationRight" {...this.state.pagination}/>
      </div>
    );
  }
}

export default MyPlan;
