import React, { Component } from 'react';
import axios from '../../axios'
import {Typography,Button,Modal,Row} from "antd";
import "./index.less";
import {Link} from "react-router-dom";
const confirm = Modal.confirm;
const { Title } = Typography;
class Lookplan extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      detail:{}
    };
    this.params = {
        page:1,   
    }
  }
  componentDidMount(){
    const ids=this.props.query.id;
    if(ids) this.setState({code:ids},()=>this.requestList())
  }
  requestList=()=>{
    axios.ajax({
        baseURL:'http://192.168.10.29:8002/bizservice',
      method: 'get',
      url: '/api/getPlanById',
      data: {planId:this.state.code}
    }).then((res)=>{
      if(res.success){
        this.setState({detail:res.data})
        
      }
    });
  };

  add=()=>{
    const _this=this;
        confirm({
            title: '添加',
            content: '确认添加至我的预案？',
            onOk() {
                axios.ajax({
                  method: 'get',
                  url: 'plan',
                  data: {ids:this.state.code}
                }).then((res)=>{
                  if(res.success){
                    _this.requestList()
                  }
                });
            },
        });
    };
    render() {   
      const detail=this.state.detail;
    return (
      <div className="Lookplan">
        <Title className="titlelab" level={2}>{detail.title}</Title>
        <p className="titlelab">分类：<b>{detail.zcaddrs}</b></p>

        <div className="selectForm">
            <div className="leftForm">
                <span className="greencolor">{detail.cname} </span>
                <span> {detail.khdate}</span>
            </div>
            {
              detail.states?<div className="rightOpt">
                <Button type="primary"  onClick={this.add}>添加至我的预案</Button>
            </div>:null
            }
        </div>
        <div className="abstract"><b>摘要： </b><span>{detail.summary}</span></div>
        <div dangerouslySetInnerHTML={{__html:detail.planinfo}}></div>
        <Row className="plantit butstyle">
            {
              detail.states?
                <Button type="primary" className="butstyle"  onClick={this.add}>添加至我的预案</Button>
                :null
            }
            <Link className="detmain" to={'/main/recommend'}>
                <Button className="butstyle" type={!detail.states?"primary":null}>返回</Button>
            </Link>
        </Row>
      </div>
    );
  }
}

export default Lookplan;
