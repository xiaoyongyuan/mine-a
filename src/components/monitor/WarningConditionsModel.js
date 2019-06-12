import React, { Component } from 'react';
import {Form} from "antd";
import {Modal, Input, Select, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class WarningConditionsModel extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    reset = ()=>{ //取消表单
        this.props.form.resetFields();
        this.props.earlyreset()
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return(
            <Modal
                title="添加预警条件"
                visible={this.props.early}
                onCancel={this.reset}
                footer={null}
            >
                <Form className='baseform' {...formItemLayout} >
                    <FormItem label='监测点' key='name'>
                        {
                            getFieldDecorator('name',{
                                rules:[{
                                    required: false,
                                    message: '请输入标题',
                                }],
                            })(
                                <Input key='montInput' />
                            )
                        }
                    </FormItem>
                    <FormItem label='时间' key='time'>
                        {
                            getFieldDecorator('time',{
                                rules:[{
                                    required: false,
                                    message: '请输入标题',
                                }],
                                initialValue:"0"
                            })(
                                <Select>
                                    <Option value="0">全部</Option>
                                    <Option value="1">小时</Option>
                                    <Option value="1">分钟</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='数据' key='datas'>
                        {
                            getFieldDecorator('datas',{
                                rules:[{
                                    required: false,
                                    message: '请输入标题',
                                }],
                                initialValue:"0"
                            })(
                                <Select>
                                    <Option value="0">全部</Option>
                                    <Option value="1">水平</Option>
                                    <Option value="2">垂直</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='条件' key='judge'>
                        {
                            getFieldDecorator('judge',{
                                rules:[{
                                    required: false,
                                    message: '请输入标题',
                                }],
                                initialValue:"0"
                            })(
                                <Select>
                                    <Option value="0">全部</Option>
                                    <Option value="1">大于</Option>
                                    <Option value="2">大于等于</Option>
                                    <Option value="3">小于</Option>
                                    <Option value="3">小于等于</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
export default WarningConditionsModel=Form.create({})(WarningConditionsModel);