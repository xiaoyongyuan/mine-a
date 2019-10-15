import React, { Component } from 'react';
import PageBreadcrumb from "../common/PageBreadcrumb";
import homeSystemMonitoring from '../../axios/homeSystemMonitoring'
// import { Result } from 'antd';
import { Result,Steps,Form, Input, Button, message,Progress, } from 'antd';
const { Step } = Steps;

class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state={
      password:"",
      complete:0,
      routes:[
          {path: '', breadcrumbName: '系统管理'},
          {path: '/main/userinfo', breadcrumbName: '用户管理'},
          {path: '', breadcrumbName: '修改密码'},
      ]
    };
  }

  componentDidMount(){
      
      var code = localStorage.getItem("code");
      this.setState({
        code:code
      })
  }
  // 提交修改密码
  handleSubmit = e => {
    const _this=this;
    this.props.form.validateFields((err, values) => {
        if (!err) {
          if(values.newPassword!=values.repeatPassword){
            message.error("两次新密码输入不一致！请重新输入！")
            return;
          }
          if(values.oldPassword==values.newPassword){
            message.error("旧密码与新密码一致！请重新输入！")
            return;
          }
          homeSystemMonitoring.changepwd({code:this.state.code,oldPassword:values.oldPassword,newPassword:values.newPassword})
          .then((res)=>{
            console.log(res);
            if(res.success){
              this.setState({
                complete:1
              })
            }
          })
        }
    });
  }

  // 验证原密码
  VerificatPassword(){
    const _this=this;
    this.props.form.validateFields((err, values) => {
      if(!err&&values.oldPassword!=""){
        homeSystemMonitoring.change({code:this.state.code,oldPassword:values.oldPassword})
        .then((res)=>{
          if(res.success){
          }else{
            _this.props.form.setFieldsValue({
              oldPassword:""
            });
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ChangePassword">
        <PageBreadcrumb routes={this.state.routes} />
        <div style={{display: "flex",justifyContent:"center",padding:"30px 0"}}>
          <div className="changePasswordNav" style={{width:"60%"}}>
              <Steps current={this.state.complete}>
                <Step title="输入密码" description="" />
                <Step title="完成" description="" />
              </Steps>
          </div>
        </div>
        {this.state.complete==0?
        <div style={{display: "flex",justifyContent:"center",paddingTop:"50px"}}>
          <div style={{width:"40%",textAlign:"center"}}>
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入旧密码！' }],
              })(
                <Input
                  type="password"
                  placeholder="旧密码"
                  size="large"
                  // value={this.state.password}
                  onBlur={this.VerificatPassword.bind(this)}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入新密码！' }],
              })(
                <Input
                  type="password"
                  placeholder="新密码"
                  size="large"
                />,
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('repeatPassword', {
                rules: [{ required: true, message: '请再次输入新密码！' }],
              })(
                <Input
                  type="password"
                  placeholder="重复新密码"
                  size="large"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button  type="primary" onClick={this.handleSubmit.bind(this)} block size="large">
                提交
              </Button>
            </Form.Item>
          </Form>

          </div>
        </div>
        :
        <div style={{display: "flex",justifyContent:"center",paddingTop:"50px"}}>
          <div style={{width:"40%",textAlign:"center"}}>
            {/* <Progress type="circle" percent={100} width={120} />
            <h2>修改成功</h2>
            <p>恭喜你，密码修改成功！</p> */}
            <Result
              status="success"
              title="修改成功!"
              subTitle="恭喜你，密码修改成功！"
              extra={[
                <a href="#/login">
                    <Button type="primary" key="console" size="large">去重新登录</Button>
                </a>,
                <a href="#/main/userinfo">
                  <Button key="buy" size="large">返回</Button>
                </a>,
              ]}
            />


          </div>
        </div>
        }




      </div>
    );
  }
}
// export default ChangePassword;
export default ChangePassword=Form.create({})(ChangePassword);