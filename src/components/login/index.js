import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from "antd";


import './index.less';
import "../../style/ztt/css/fastspeed.css";
import "../../style/ztt/css/style.css";
import "../../style/ztt/css/normalize.css"
const FormItem = Form.Item;
class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Login">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div className="m-fastspeed-banner"></div>
          <div className="logincont">
            <div className="login-form">
              <div className="login-logo">
                <span>Login</span>
              </div>
              <Form
                onSubmit={this.handleSubmit}
                style={{ maxWidth: "280px", margin: "0 auto" }}>
                <FormItem>
                  {getFieldDecorator("account", {
                    rules: [{ required: true, message: "请输入用户名!" }]
                  })(
                    <Input
                      placeholder="请输入用户名"
                      prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
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
                  })(<Checkbox>记住我</Checkbox>)}
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
          </div>
      </div>
    );
  }
}

export default Form.create()(Login);
