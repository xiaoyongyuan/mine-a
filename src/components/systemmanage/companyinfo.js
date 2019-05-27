import React, { Component } from 'react';
import {Button,Modal,Row,Col,Typography,Input } from "antd";
import "../../style/yal/css/compantinfo.css";
import axios from "../../axios";
import Utils from "../../utils/utils";

const { TextArea } = Input;
const { Paragraph } = Typography;
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
        axios.ajax({
            method: 'get',
            url: '/company',
            data: this.params
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                this.setState({
                    cname:res.data.cname,
                    addrs:res.data.addrs,
                    username:res.data.username,
                    tel:res.data.tel,
                    email:res.data.email,
                    zcaddrs:res.data.addrs,
                    khdate:res.data.khdate,
                    projectcname:res.data.cname,
                    intro:res.data.intro,
                    projectusername:res.data.username,
                    prijecttel:res.data.tel,
                    projectemail:res.data.email,
                    projectaddrs:res.data.addrs
                })
            }
        });
    };

    onChange = str => {
        console.log('Content change:', str);
        this.setState({ str });
    };
    //编辑
    handleEditClick = () => {
      this.setState({
          oldcname:this.state.cname,
          oldaddrs:this.state.addrs,
          oldusername:this.state.username,
          isEdite:false,
          oldtel:this.state.tel,
          oldemail:this.state.email,
          oldkhdate:this.state.khdate,
          oldprojectcname:this.state.projectcname,
          oldintro:this.state.intro,
          oldprojectusername:this.state.projectusername,
          oldprijecttel:this.state.prijecttel,
          oldprojectemail:this.state.projectemail,
          oldprojectaddrs:this.state.projectaddrs,
          oldzcaddrs:this.state.zcaddrs,
      })
    };
    //提交
    handleSubmitClick = (e) =>{
        e.preventDefault();
        this.setState({
            cname:this.state.cname,
            addrs:this.state.addrs,
            username:this.state.username,
            isEdite:true,
            tel:this.state.tel,
            email:this.state.email,
            khdate:this.state.khdate,
            projectcname:this.state.projectcname,
            intro:this.state.intro,
            projectusername:this.state.projectusername,
            prijecttel:this.state.prijecttel,
            projectemail:this.state.projectemail,
            projectaddrs:this.state.projectaddrs,
            zcaddrs:this.state.zcaddrs,
        });
        const data={
            cname:this.state.cname,
            addrs:this.state.addrs,
        };
        axios.ajax({
            method: 'get',
            url: '/company',
            data: data
        }).then((res)=>{
            console.log("data",data);
            if(res.success){
                console.log("编辑成功！")
            }
        });
    };
    //取消
    handleCancleClick = () =>{
        this.setState({
            cname:this.state.oldcname,
            addrs:this.state.oldaddrs,
            username:this.state.oldusername,
            isEdite:true,
            tel:this.state.oldtel,
            email:this.state.oldemail,
            khdate:this.state.oldkhdate,
            projectcname:this.state.oldprojectcname,
            intro:this.state.oldintro,
            projectusername:this.state.oldprojectusername,
            prijecttel:this.state.oldprijecttel,
            projectemail:this.state.oldprojectemail,
            projectaddrs:this.state.oldprojectaddrs,
            zcaddrs:this.state.oldzcaddrs,
        })
    };
    //输入企业名称
    InputonChange = (e) =>{
        console.log(e.target.value);
        this.setState({
            cname:e.target.value
        });
    };
    //输入企业地址
  InputassressonChange = (e) =>{
    this.setState({
        addrs:e.target.value
    });
  };
  //法人
    InputusernameOnChange = (e) =>{
        this.setState({
            username:e.target.value
        });
    };
    //联系电话
    InputTelOnChange = (e) =>{
        this.setState({
            tel:e.target.value
        });
    };
    //企业邮箱
    InputEmailOnchange = (e) =>{
      this.setState({
          email:e.target.value
      })
    };
    //企业注册地址
  InputzcaddrsOnchange = (e) =>{
    this.setState({
        zcaddrs:e.target.value
    })
  };
  //开户时间
  InputkhdateOnchange = (e) =>{
      this.setState({
          khdate:e.target.value
      })
  };
  //项目名称
  InputProjectNameOnchange = (e) =>{
    this.setState({
        projectcname:e.target.value
    })
  };
  //项目简介
  InputProjectintroOnchange = (e) =>{
      this.setState({
          intro:e.target.value
      })
  };
    //项目联系人
    InputProjectusernameOnChange = (e) =>{
        this.setState({
            projectusername:e.target.value
        });
    };
    //联系电话
    InputProjectTelOnChange = (e) =>{
        this.setState({
            prijecttel:e.target.value
        });
    };
    //电子邮箱
    InputProjectEmailOnchange = (e) =>{
        this.setState({
            projectemail:e.target.value
        })
    };
    //项目地址
    InputProjectzcaddrsOnchange = (e) =>{
        this.setState({
            projectaddrs:e.target.value
        })
    };

    render() {
    return (
      <div className="Companyinfo">
          <div className="box-padding">
            <Row>
                <Col span={12}>
                    <p>企业信息</p>
                </Col>
                <Col span={12} className="canclebtn-col">
                    {!this.state.isEdite?(""):(<Button className="canclebtn" onClick={this.handleEditClick}>编辑</Button>)}
                </Col>
            </Row>

              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      企业名称：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                            this.state.cname
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputonChange.bind(this)} value={this.state.cname} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      企业logo：
                  </Col>
                  <Col span={21} className="t_l">
                      beigo
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      企业地址：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.addrs
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputassressonChange.bind(this)} value={this.state.addrs} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      法人：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.username
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputusernameOnChange.bind(this)} value={this.state.username} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      联系电话：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.tel
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputTelOnChange.bind(this)} value={this.state.tel} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      企业邮箱：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.email
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputEmailOnchange.bind(this)} value={this.state.email} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      企业注册地址：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.zcaddrs
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputzcaddrsOnchange.bind(this)} value={this.state.zcaddrs} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      开户时间：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.khdate
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputkhdateOnchange.bind(this)} value={this.state.khdate} />
                          )
                      }
                  </Col>
              </Row>
              <p>项目信息</p>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      项目名称：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.projectcname
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputProjectNameOnchange.bind(this)} value={this.state.projectcname} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      项目简介：
                  </Col>
                  <Col span={21} className="t_l">

                      {this.state.isEdite ?
                          (
                              this.state.intro
                          ) :
                          (
                              <TextArea   onChange={this.InputProjectintroOnchange.bind(this)} value={this.state.intro} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      项目联系人：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.projectusername
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputProjectusernameOnChange.bind(this)} value={this.state.projectusername} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      联系电话：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.prijecttel
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputProjectTelOnChange.bind(this)} value={this.state.prijecttel} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      电子邮箱：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.projectemail
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputProjectEmailOnchange.bind(this)} value={this.state.projectemail} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col span={3} className="t_r">
                      项目地址：
                  </Col>
                  <Col span={21} className="t_l">
                      {this.state.isEdite ?
                          (
                              this.state.projectaddrs
                          ) :
                          (
                              <Input placeholder="Basic usage"  onChange={this.InputProjectzcaddrsOnchange.bind(this)} value={this.state.projectaddrs} />
                          )
                      }
                  </Col>
              </Row>
              <Row className="equ_row">
                  <Col className="t_r_button" span={12} push={2}>

                      {!this.state.isEdite ?
                          (
                              <div>
                                  <Button type="primary" onClick={this.handleSubmitClick}>提交</Button>
                                  <Button className="canclebtn" onClick={this.handleCancleClick}>取消</Button>
                              </div>
                          ) :
                          (
                              ""
                          )
                      }
                  </Col>
              </Row>
          </div>
      </div>
    );
  }
}

export default Companyinfo;
