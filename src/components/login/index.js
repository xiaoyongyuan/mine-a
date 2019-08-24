import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import axios from '../../axios';
import './index.less';
import logo from '../../style/imgs/logonew.png'
import Utils from "../../utils/utils";

const  phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const FormItem = Form.Item;
class Login extends Component {
  
  constructor(props){
      super(props);
      this.state={
        userlogin:true,
        authcodelogin:false,
          btnTxt:'获取验证码',
          isGetCode: false,
          countDown: 60,
      };
  }

  componentDidMount() {

  }

  handleSubmit = e => { //登录提交
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //获取到的表单的值values
        axios.login({
          data: {
            passWord:values.passWord,
            userName:values.userName,
            loginType:"0"
          }
        }).then((res)=>{
          if(res.access_token){
            localStorage.setItem("token", res.access_token);
            this.props.history.push("/pandect/mapshow");
              axios.user({
                  baseURL:window.g.exitURL,
                  method: 'post',
                  url: '/login/userInfo',
              }).then((res)=>{
                  console.log(res);
                  localStorage.setItem("username", res.account);
                  localStorage.setItem("userRole",res.power);
                  localStorage.setItem("companyCode",res.companycode);
              });
          }else{
            message.warn('用户名或密码错误！')
          }
        },(res)=>{console.log('错误返回',res)})
      }
    });
  };
    handleSubmitbyAuthcode = e => {//验证码登录
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.authCode){
                    //获取到的表单的值values
                    axios.loginbyAuthcode({
                        data: {
                            phoneNum:values.phone,
                            code:values.authCode,
                        }
                    }).then((res)=>{
                        if(res.data){
                            localStorage.setItem("token", res.data);
                            this.props.history.push("/pandect/mapshow");
                            axios.user({
                                baseURL:window.g.exitURL,
                                method: 'post',
                                url: '/login/userInfo',
                            }).then((res)=>{
                                localStorage.setItem("username", res.account);
                            });
                        }else{
                            message.warn('验证码不正确，请重新输入正确验证码！')
                        }
                    },(res)=>{console.log('错误返回',res)})
                }else {
                    message.warn('请输入验证码')
                }
            }
        });
    };
    useronChage = () =>{
      this.setState({
          userlogin:true,
          authcodelogin:false,
      })
    };
    authcodeonChage = () =>{
        this.setState({
            userlogin:false,
            authcodelogin:true,
        })
    };
    //获取验证码
    getPhoneCode = () =>{
        this.props.form.validateFields((err, values) => {
            if (!phoneRexp.test(values.phone)) {
                message.error('手机号格式有误');
                return;
            }
            axios.getAuthcode({
                method: 'post',
                phone:values.phone
            }).then((res)=>{
                if(res.success){
                    message.success('验证码获取成功');
                    this.setState({
                        isGetCode:true
                    });
                    this.timer();
                }
            });
        });
    };
    /**
     * 验证码倒计时
     */
    timer = () => {
        let that = this,
            countDown = that.state.countDown;
        let clock = setInterval(() => {
            countDown--;
            if (countDown >= 0) {
                that.setState({
                    countDown: countDown
                });
            } else {
                clearInterval(clock);
                that.setState({
                    countDown: 60,
                    isGetCode: false,
                    btnTxt: '重新获取'
                })
            }
        }, 1000)
    };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Loginx">
          <div className="loginLogo">
              <div className="loginLogo-img">
                <img src={logo} alt="" />
              </div>
          </div>
          <div className="logincont">
              <div className="login-formnew">
                  <div className="loginsj">
                      <div className="logindk">
                          <div className="loginformx">
                              <div className="login-type">
                                  <div className="login-user" style={{ cursor:'pointer' }} onClick={this.useronChage}>
                                      <span>用户名登录</span>
                                  </div>
                                  <div className="login-authcode" style={{ cursor:'pointer' }} onClick={this.authcodeonChage}>
                                      <span>验证码登录</span>
                                  </div>
                              </div>
                              <div>
                                  {
                                    this.state.userlogin?
                                        <div className="line">
                                            <div className="line-select">

                                            </div>
                                            <div className="line-noselect">

                                            </div>
                                        </div>:
                                        <div className="line">
                                            <div className="line-noselect">

                                            </div>
                                            <div className="line-select">

                                            </div>
                                        </div>
                                  }
                              </div>
                              <div>
                                  {
                                      this.state.userlogin?
                                          <div className="form-select">
                                              <Form
                                                  onSubmit={this.handleSubmit}
                                                  style={{ maxWidth: "100%", margin: "0 auto" }}>
                                                  <FormItem>
                                                      {getFieldDecorator("userName", {
                                                          rules: [{ required: true, message: "请输入用户名!" }]
                                                      })(
                                                          <Input
                                                              placeholder="请输入用户名"
                                                              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                                          />
                                                      )}
                                                  </FormItem>
                                                  <FormItem>
                                                      {getFieldDecorator("passWord", {
                                                          rules: [{ required: true, message: "请输入密码!" }]
                                                      })(
                                                          <Input
                                                              placeholder="请输入密码"
                                                              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                              type="password"
                                                          />
                                                      )}
                                                  </FormItem>
                                                  <FormItem>
                                                      {getFieldDecorator("remember", {
                                                          valuePropName: "checked",
                                                          initialValue: true
                                                      })(<Checkbox className="rember-user">记住用户名</Checkbox>)}
                                                      {/*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                                                      <Button
                                                          type="primary"
                                                          htmlType="submit"
                                                          className="login-form-button"
                                                          style={{ width: "100%" }}
                                                      >
                                                          登录
                                                      </Button>
                                                  </FormItem>
                                              </Form>
                                          </div>:
                                         <div className="form-select">
                                             <Form
                                                 onSubmit={this.handleSubmitbyAuthcode}
                                                 style={{ maxWidth: "100%", margin: "0 auto" }}>
                                                 <FormItem>
                                                     {getFieldDecorator("phone", {
                                                         rules: [{
                                                             required: true, message: "请输入正确的手机号码!" ,
                                                             // pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g")
                                                         }]
                                                     })(
                                                         <Input
                                                             placeholder="请输入手机号码"
                                                             prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
                                                         />
                                                     )}
                                                 </FormItem>
                                                 <FormItem
                                                     style={{ width:"100%" }}
                                                 >
                                                     {getFieldDecorator("authCode", {
                                                         // rules: [{ required: true, message: "请输入短信验证码!" }]
                                                     })(
                                                         <Input
                                                             placeholder="请输入短信验证码"
                                                             prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                                             type="password"
                                                         />

                                                     )}
                                                         {
                                                             !this.state.isGetCode?
                                                                 <div className="getAuthCode" style={{ cursor:'pointer' }} onClick={this.getPhoneCode}>{ this.state.btnTxt }</div>:
                                                                 <div className="timeer">{this.state.countDown}s</div>
                                                         }
                                                 </FormItem>
                                                 <FormItem>
                                                     {getFieldDecorator("remember", {
                                                         valuePropName: "checked",
                                                         initialValue: true
                                                     })(<Checkbox className="rember-user">记住用户名</Checkbox>)}
                                                     {/*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*/}
                                                     <Button
                                                         type="primary"
                                                         htmlType="submit"
                                                         className="login-form-button"
                                                         style={{ width: "100%" }}
                                                     >
                                                         登录
                                                     </Button>
                                                 </FormItem>
                                             </Form>
                                         </div>
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <span className="BA-ICP"> 陕ICP备19013652号-1</span>
      </div>
    );
  }
}

export default Form.create()(Login);
