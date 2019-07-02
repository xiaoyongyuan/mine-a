import React, { Component } from 'react';
import {Button,Row,Col} from "antd";
import "../../style/yal/css/compantinfo.less";
import axios from "../../axios";

class Companyinfo extends Component {
  constructor(props){
    super(props);
    this.state={
      str:'北斗环境',
        isEdite:true
    };
  }
    componentDidMount(){
        this.requestList();
    };
    requestList = ()=>{
        const quparams = {
            code: 1,
        };
        axios.ajax({
            baseURL:window.g.fileURL,
            method:'get',
            url:'/api/companyById',
            data:quparams,
        }).then((res)=>{
            if(res.success){
                this.setState({
                    cname:res.data.cname,//企业名称
                    addrs:res.data.location,//企业地址
                    username:res.data.legalperson,//法人
                    logo:res.data.logo,//企业logo
                    tel:res.data.linktel,//联系电话
                    email:res.data.emailaddress,
                    zcaddrs:res.data.address,//企业注册地址
                    khdate:res.data.khdate,
                    projectcname:res.data.cname,
                    intro:res.data.currentinfo,
                    projectusername:res.data.linkmen,//项目联系人
                    prijecttel:res.data.linktel,
                    projectemail:res.data.emailaddress,
                    projectaddrs:res.data.addrs
                })
            }
        },(res)=>{});
    };
    onChange = str => {
        this.setState({ str });
    };
    render() {
    return (
      <div className="companyinfo">
          <div className="companyinfoHeader">
              <div className="com-header">
                  <span className="iconLittle"/><span className="comSystem">系统设置&nbsp;&nbsp;<i style={{color:"#2463A1"}}>&gt;</i>&nbsp;&nbsp;企业信息</span>
              </div>
              <a href="#/main/companyinfoEdit"><Button className="canclebtn" type="primary"><span className="actionfont action-bianji"/>&nbsp;&nbsp;
                   编辑</Button></a>
          </div>
          <div className="CompanyinfoTop">
              <Row className="con-row">
                  <Col span={12}>
                      <Row>
                          <Col span={6} className="com-enterprise">企业LOGO</Col>
                          <Col span={18} className="enterprise-context">
                              <img className="img-logo" alt="logo" src={window.g.filesURL+this.state.logo}/>
                          </Col>
                      </Row>
                  </Col>
                  <Col span={12}>
                      <Row className="con-row">
                          <Col span={6} className="comName">法人</Col>
                          <Col span={18} className="comContent">{this.state.username}</Col>
                      </Row>
                      <Row>
                          <Col span={6} className="comName">企业地址</Col>
                          <Col span={18} className="comContent">{this.state.addrs}</Col>
                      </Row>
                  </Col>
              </Row>
              <Row  className="con-row">
                  <Col span={3} className="comName">企业名称</Col>
                  <Col span={9} className="comContent">{this.state.cname}</Col>
                  <Col span={3} className="comName">企业注册地址</Col>
                  <Col span={9} className="comContent">{this.state.zcaddrs}</Col>
              </Row>
              <Row  className="con-row">
                  <Col span={3} className="comName">企业邮箱</Col>
                  <Col span={9} className="comContent">{this.state.email}</Col>
                  <Col span={3} className="comName">联系电话</Col>
                  <Col span={9} className="comContent">{this.state.tel}</Col>
              </Row>
              <Row  className="con-row">
                  <Col span={3} className="comName">开户时间</Col>
                  <Col span={21} className="comContent">{this.state.khdate}</Col>
              </Row>
          </div>
          <div className="CompanyinfoBottom">
              <p className="project-title"><span className="iconLittle"/><span className="comSystem">项目信息</span></p>
              <Row  className="con-row">
                  <Col span={3} className="comName">项目名称</Col>
                  <Col span={9} className="comContent">{this.state.projectcname}</Col>
                  <Col span={3} className="comName">项目联系人</Col>
                  <Col span={9} className="comContent">{this.state.projectusername}</Col>
              </Row>
              <Row className="con-row">
                  <Col span={3} className="comName">联系电话</Col>
                  <Col span={9} className="comContent">{this.state.prijecttel}</Col>
                  <Col span={3} className="comName">电子邮箱</Col>
                  <Col span={9} className="comContent">{this.state.projectemail}</Col>
              </Row>
              <Row className="con-row">
                  <Col span={3} className="comName">项目地址</Col>
                  <Col span={21} className="comContent">{this.state.projectaddrs}</Col>
              </Row>
              <Row className="con-row brief-row">
                  <Col span={3} className="com-brief">项目简介</Col>
                  <Col span={21} className="brief-context">{this.state.intro}</Col>
              </Row>
          </div>
      </div>
    );
  }
}

export default Companyinfo;
