import React, { Component } from 'react';
import axios from '../../axios'
import {Typography,Button,Modal,Row} from "antd";
import "./index.less";
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
      method: 'get',
      url: 'plan',
      data: {code:this.state.code}
    }).then((res)=>{
      if(res.success){
        this.setState({detail:res.data[0]})
        
      }
    });
  }

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
    }




    render() {   
      const detail=this.state.detail;
    return (
      <div className="Lookplan">
        <Title className="titlelab" level={2}>{detail.addrs}</Title>
        <p className="titlelab">分类：<b>{detail.zcaddrs}</b></p>

        <div className="selectForm">
            <div className="leftForm">
                <span className="greencolor">{detail.cname} </span>
                <span> {detail.khdate}</span>

            </div>
            {
              detail.draft?<div className="rightOpt">
                <Button type="primary"  onClick={this.add}>添加至我的预案</Button>
            </div>:null
            }
            

        </div>
        <div className="abstract"><b>摘要： </b><span>{detail.intro}</span></div>
        <div dangerouslySetInnerHTML={{__html:detail.content}}></div>
        <Row className="plantit butstyle">
            {
              detail.draft?
                <Button type="primary" className="butstyle"  onClick={this.add}>添加至我的预案</Button>
                :null
            }
            <Button className="butstyle" type={!detail.draft?"primary":null} onClick={()=>this.getContent(0)}>返回</Button>
        </Row>
      </div>
    );
  }
}

export default Lookplan;
