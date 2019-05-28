import React, { Component } from 'react';
import {Form,Input} from 'antd';
import axios from "../../axios";
import Utils from "../../utils/utils";
import "../../style/yal/css/userinfo.less";
const FormItem = Form.Item;
let vis=false;

class ModalForm extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:props.visible || false,
            form:false
        };
    }
    componentDidMount() {
        //编辑  数据回填
        this.setState({
            code:this.props.code,
            account:this.props.account,
        },()=>{
            this.requestdata()
        });
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
        if( nextProps.visible !== vis){
            vis=nextProps.visible;
            if(nextProps.visible){
                this.setState({
                    code:nextProps.code
                }, () => {
                    this.requestdata();
                });
            }
        }
    }
    requestdata=() => {//取数据
        if(this.state.code){
            const data={
                code:this.state.code,
                account:this.state.account,
                user:'admin'
            }
            axios.ajax({
                method: 'get',
                url: '/company',
                data: this.params
            }).then((res)=>{
                console.log("res",res);
                if(res.success){
                    this.props.form.setFieldsValue({
                        // usergender:res.data.usergender,//性别
                        name: res.data.cname,//姓名
                        tel: res.data.tel,//账号
                        email: res.data.email,//邮箱
                        // job_number: res.data.job_number,//工号
                        // memo: res.data.memo,//备注
                        // userpower:res.data.userpower,//类型
                    });
                }
            });
        }
    }
    formref = () => { //将form传给父组件由父组件控制表单提交
        return this.props.form;
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        return(
            <div className="tc-label">
                <Form {...formItemLayout}  layout="vertical">
                    <FormItem label="姓名：">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入姓名!',
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="电话：">
                        {getFieldDecorator('tel', {
                            rules: [{
                                required: true, message: '请输入手机号!',
                                pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g")
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="工号：">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入工号!',
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="职位：">
                        {getFieldDecorator('position', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="座机：">
                        {getFieldDecorator('phone', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="邮箱：">
                        {getFieldDecorator('email', {
                            rules: [{
                                required: false,
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                </Form>
            </div>
        )


    }



}

export default ModalForm = Form.create({})(ModalForm);