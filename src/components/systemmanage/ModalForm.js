import React, { Component } from 'react';
import {Form, Input, Select} from 'antd';
import axios from "../../axios";
import "../../style/yal/css/userinfo.less";
const Option = Select.Option;
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
            form:false,
            UserRole:[], //用户角色列表
            SelectUserRole:'', //选择的用户角色
        };
    }
    componentDidMount() {
        //加载用户角色
        // axios.ajax({
        //     baseURL:window.g.fileURL,
        //     method: 'get',
        //     url: '/api/companyRoles',
        //     // data: data
        // }).then((res)=>{
        //     if(res.success){
        //         console.log("res",res);
        //         if(res.success){
        //             var UserRole=[];
        //             res.data.map(item=>UserRole.push({code:item.code,name:item.rolename}) );
        //             this.setState({UserRole:UserRole,SelectUserRole:UserRole.length?UserRole[0].code:''})
        //         }
        //     }
        // },(res)=>{});
        //编辑  数据回填
        this.setState({
            code:this.props.code,
        },()=>{
            this.requestdata()
        });
    }
    componentWillMount(){

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
                baseURL:window.g.fileURL,
                method: 'get',
                url: '/api/companyUserById',
                data: data
            }).then((res)=>{
                if(res.success){
                    console.log("res",res);
                    this.props.form.setFieldsValue({
                        linktel:res.data.linktel,//电话
                        realanme:res.data.realanme,//姓名
                        account:res.data.account,//用户名
                        power:res.data.power,//用户角色
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
        const userRole = localStorage.getItem("userRole");
        return(
            <div className="tc-label">
                <Form {...formItemLayout}  layout="vertical">
                    <FormItem label="用户名：">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入不超过12位的字母或数字!',
                                pattern: new RegExp(/^[^\u4e00-\u9fa5]+$/, "g")
                            }],
                        })(
                            <Input maxLength={12} className="ModelFormInput" disabled={_this.state.code?true:false}  />
                        )}
                    </FormItem>
                    <FormItem label="姓名：">
                        {getFieldDecorator('realanme', {
                            rules: [{
                                required: true, message: '请输入姓名!',
                            }],
                        })(
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
                    <FormItem label='用户角色：' key='power'>
                        {
                            getFieldDecorator('power', {
                                rules:[{
                                    required: true,
                                    message: '请选择用户角色',
                                }],
                                initialValue: '2'
                            })(
                                <Select
                                    disabled={userRole === '2'?true:false}
                                >
                                    {/*{this.state.UserRole.map(city => (*/}
                                        {/*<Option key={city.code} value={city.code}>{city.name}</Option>*/}
                                    {/*))}*/}
                                    <Option key="1" value="1">管理员</Option>
                                    <Option key="2" value="2">普通用户</Option>
                                </Select>
                            )
                        }
                    </FormItem>



                    {/*<FormItem label="职位：">*/}
                        {/*{getFieldDecorator('position')(*/}
                            {/*<Input className="ModelFormInput" />*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem label="座机：">*/}
                        {/*{getFieldDecorator('phone')(*/}
                            {/*<Input className="ModelFormInput" />*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    {/*<FormItem label="邮箱：">*/}
                        {/*{getFieldDecorator('email')(*/}
                            {/*<Input className="ModelFormInput" />*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                </Form>
            </div>
        )


    }



}

export default ModalForm = Form.create({})(ModalForm);