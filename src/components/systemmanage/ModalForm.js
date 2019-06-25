import React, { Component } from 'react';
import {Form,Input} from 'antd';
import axios from "../../axios";
import "../../style/yal/css/userinfo.less";
const FormItem = Form.Item;
let vis=false;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
        lg:{span:5},
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
        lg:{span:19},
    },
};
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
        },()=>{
            this.requestdata()
        });
    }
    componentWillReceiveProps(nextProps){
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
            };
            axios.ajax({
                method: 'get',
                url: '/sys/api/companyUserById',
                data: data
            }).then((res)=>{
                if(res.success){
                    this.props.form.setFieldsValue({
                        linktel:res.data.linktel,//电话
                        realanme:res.data.realanme,//姓名
                        account:res.data.account,//用户名
                    });
                }
            },(res)=>{});
        }
    };
    formref = () => { //将form传给父组件由父组件控制表单提交
        return this.props.form;
    };
    render(){
        const { getFieldDecorator } = this.props.form;   
        const _this=this;   
        return(
            <div className="tc-label">
                <Form {...formItemLayout}  layout="vertical">
                    <FormItem label="用户名：">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入用户名!',
                            }],
                        })(
                            <Input className="ModelFormInput" disabled={_this.state.code?true:false}  />
                        )}
                    </FormItem>
                    <FormItem label="姓名：">
                        {getFieldDecorator('realanme')(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="电话：">
                        {getFieldDecorator('linktel', {
                            rules: [{
                                required: true, message: '请输入手机号!',
                                pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g")
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="职位：">
                        {getFieldDecorator('position')(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="座机：">
                        {getFieldDecorator('phone')(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="邮箱：">
                        {getFieldDecorator('email')(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                </Form>
            </div>
        )


    }



}

export default ModalForm = Form.create({})(ModalForm);