import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import axios from '../../axios';
import './index.less';
import logo from '../../style/imgs/logonew.png'

const FormItem = Form.Item;
class Login extends Component {
  
  constructor(props){
      super(props);
      this.state={
        userlogin:true,
        authcodelogin:false,
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
          }
        }).then((res)=>{
          console.log('成功返回',res);
          if(res.access_token){
            localStorage.setItem("token", res.access_token);
            this.props.history.push("/pandect/mapshow");
          }else{
            message.warn('用户名或密码错误！')
          }
        },(res)=>{console.log('错误返回',res)})        
      }
    });
  };
    useronChage = () =>{
      this.setState({
          userlogin:true,
          authcodelogin:false,
      },()=>{
        console.log("userlogin",this.state.userlogin,this.state.authcodelogin)
      })
    };
    authcodeonChage = () =>{
        this.setState({
            userlogin:false,
            authcodelogin:true,
        },()=>{
            console.log("authcodelogin",this.state.userlogin,this.state.authcodelogin)
        })
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
            {/*<div className="login-form">*/}
              {/*<Form*/}
                {/*onSubmit={this.handleSubmit}*/}
                {/*style={{ maxWidth: "280px", margin: "0 auto" }}>*/}
                {/*<FormItem>*/}
                  {/*{getFieldDecorator("userName", {*/}
                    {/*rules: [{ required: true, message: "请输入用户名!" }]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*placeholder="请输入用户名"*/}
                      {/*prefix={<Icon type="user" style={{ fontSize: 13 }} />}*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem>*/}
                  {/*{getFieldDecorator("passWord", {*/}
                    {/*rules: [{ required: true, message: "请输入密码!" }]*/}
                  {/*})(*/}
                    {/*<Input*/}
                      {/*placeholder="请输入密码"*/}
                      {/*prefix={<Icon type="lock" style={{ fontSize: 13 }} />}*/}
                      {/*type="password"*/}
                    {/*/>*/}
                  {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem>*/}
                  {/*{getFieldDecorator("remember", {*/}
                    {/*valuePropName: "checked",*/}
                    {/*initialValue: true*/}
                  {/*})(<Checkbox className="test">记住我</Checkbox>)}*/}
                  {/*/!*<span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>*!/*/}
                  {/*<Button*/}
                    {/*type="primary"*/}
                    {/*htmlType="submit"*/}
                    {/*className="login-form-button"*/}
                    {/*style={{ width: "100%" }}*/}
                  {/*>*/}
                    {/*登录*/}
                  {/*</Button>*/}
                {/*</FormItem>*/}
              {/*</Form>*/}
            {/*</div>*/}




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
                                                      })(<Checkbox className="rember-user">记住用户</Checkbox>)}
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
                                          ''
                                  }
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default Form.create()(Login);
