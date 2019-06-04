import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col,Select,Pagination, Typography,Modal } from "antd";
import axios from '../../axios'
import Utils from "../../utils/utils";
import './index.less'
const { Title,Paragraph } = Typography;
const confirm = Modal.confirm;
const Option = Select.Option;
class Recommend extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      page:1,
      pagination:{}
    };
    this.params = {
        page:1,   
    }
  }
  componentDidMount(){
    this.requestList()
  }
  requestList=()=>{
      axios.ajax({
          baseURL:'https://www.easy-mock.com/mock/5ce208b85fa13b1e54d26e06/mainapi',
        method: 'get',
        url: 'plan',
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
  add(code) {
    const _this=this;
        confirm({
            title: '添加',
            content: '确认添加至我的预案？',
            onOk() {
                axios.ajax({
                  method: 'get',
                  url: 'plan',
                  data: {ids:code}
                }).then((res)=>{
                  if(res.success){
                    _this.requestList()
                  }
                });
            },
        });
    }

    render() {
      return (
        <div className="MyPlan">
            <div className="planlist">
              <Row gutter={16}>{
                this.state.list.map((v,i)=>(
                        <Col className="gridcol" key={v.code} md={24} xl={12} xxl={8}>
                          <div className="detmain">
                          <Link className="" to={'/main/lookplan?id='+v.code}  style={{color:'rgba(0, 0, 0, 0.65)'}}>
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
                          </Link>
                          {
                            v.draft?<div className="editbtn addmy">
                            <span onClick={(v)=>this.add(v.code)}  style={{color:'#fff'}}>添加</span>
                            </div>
                            :null
                          }
                          <Link className="intro" to={'/main/lookplan?id='+v.code}  style={{color:'rgba(0, 0, 0, 0.65)'}}>{v.intro}</Link>
                          </div>
                        </Col>
                    
                ))
            }</Row>
            </div>
            <Pagination className="PaginationRight" {...this.state.pagination}/>
        </div>
      );
  }
}

export default Recommend;
