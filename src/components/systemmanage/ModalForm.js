import React, { Component } from 'react';
import {Form,Input} from 'antd';
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
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="tc-label">
                <Form layout="vertical">
                    <FormItem label="姓名">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入姓名!',
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="电话">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入手机号!',
                                pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g")
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="工号">
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入工号!',
                            }],
                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="职位">
                        {getFieldDecorator('account', {

                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="座机">
                        {getFieldDecorator('account', {

                        })(
                            <Input className="ModelFormInput" />
                        )}
                    </FormItem>
                    <FormItem label="邮箱">
                        {getFieldDecorator('account', {

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