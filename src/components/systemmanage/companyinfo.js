import React, { Component } from 'react';
import {Button,Row,Col} from "antd";
import "../../style/yal/css/compantinfo.less";
import axios from "../../axios";
import PageBreadcrumb from "../common/PageBreadcrumb";

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from '../../actions/postActions';

class Companyinfo extends Component {
  constructor(props){
    super(props);
    this.state={
      str:'北斗环境',
      isEdite:true,
      isToggleOn: true,
      dispaly: 'block',
      routes:[
        {path: '', breadcrumbName: '系统管理'},
        {path: '/main/companyinfo', breadcrumbName: '企业信息'},
      ]

    };
      this.handleClick = this.handleClick.bind(this);
  }

//显隐
  handleClick(){
      this.setState(prevState=>({
          isToggle:!prevState.isToggle,
          display:!prevState.isToggle?'none':'block'
      }))
  }
  
  componentDidMount() {
    // redux知道全局location，菜单展开
    console.log(this);
    let Mylocation=this.props.location.pathname;
    this.props.Location(Mylocation);

    this.requestList();
    this.requestListproject();
  }

    requestList = ()=>{

        axios.ajax({
            baseURL:window.g.fileURL,
            method:'get',
            url:'/api/companyByLoginUser'
        }).then((res)=>{
            console.log(res);
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
                })
            }
        },(res)=>{});
    };
    requestListproject = ()=>{
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method:'get',
            url:'api/getProject'
        }).then((res)=>{
            if(res.success){
                if(res.data !== null){
                    this.setState({
                        projectcname:res.data.projectname,
                        intro:res.data.projectmemo,
                        projectusername:res.data.linkmen,//项目联系人
                        prijecttel:res.data.linktel,
                        projectemail:res.data.emailaddress,
                        projectaddrs:res.data.addrs
                    });
                }else{
                    this.handleClick();
                }
            }
        },(res)=>{});
    };
    onChange = str => {
        this.setState({ str });
    };
    render() {
    return (
      <div className="companyinfo">
        <PageBreadcrumb routes={this.state.routes} />
          <div className="companyinfoHeader">
              <div className="com-header">
                  <span className="iconLittle"/><span className="comSystem">系统设置&nbsp;&nbsp;<i style={{color:"#2463A1"}}>&gt;</i>&nbsp;&nbsp;企业信息</span>
              </div>
              <a href="#/main/companyinfoEdit">
                  <Button className="canclebtn"  type="primary"><span className="actionfont action-bianji"/>&nbsp;&nbsp;编辑</Button>
              </a>
          </div>
          <div className="CompanyinfoTop">
              <Row className="con-row">
                  <Col span={12}>
                      <Row>
                          <Col span={6} className="com-enterprise">企业LOGO</Col>
                          <Col span={18} className="enterprise-context">
                          {this.state.logo!=null?<img className="img-logo" alt="logo" src={window.g.filesURL+this.state.logo}/>:<img className="img-logo" alt="logo" src={window.g.filesURL+"Img/logo.png"}/>}
                              
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
              <Row>
                  <Col span={12}>
                      <p className="project-title"><span className="iconLittle"/><span className="comSystem">项目信息</span></p>
                  </Col>
                  <Col span={12} className="projectinfo">
                      <a href="#/main/projectinfoEdit">
                          <Button  className="canclebtn"  type="primary"
                                   style={{display: this.state.display}}
                          >
                              <span className="actionfont action-bianji"/>&nbsp;&nbsp;编辑</Button>
                      </a>
                  </Col>
              </Row>
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

Companyinfo.propTypes = {
    Location: PropTypes.func.isRequired
  }
  export default connect(null, { Location })(Companyinfo); 