import React, { Component } from 'react';
import {Form} from "antd";
import {Modal, Cascader, Select, Button} from 'antd';
import axios from "../../axios";
const FormItem = Form.Item;
const Option = Select.Option;
let vis=false;
class WarningConditionsModel extends Component{
    constructor(props){
        super(props);
        this.state={
            options:[],
            target:[]
        };
    }
    reset = ()=>{ //取消表单
        this.props.form.resetFields();
        this.props.earlyreset()
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.early){
            this.network();
        }
    }
    //网
    network=()=>{
        if(this.props.selectp){
            axios.ajax({
                baseURL:window.g.easyURL,
                method: 'get',
                url: '/montinet',
                data:{
                    code:this.props.selectp
                }
            }).then((res)=>{
                if(res.success){
                    var arrs=[];
                    res.data.map((v)=>{
                        arrs.push({
                            value: v.code,
                            label: v.name,
                            isLeaf: false,
                        });
                    });
                    this.setState({
                        options:arrs
                    })
                }
            });
        }
    };
    handleFilterSubmit=()=>{
        const _this=this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var filter=[];
                var arr=[];
                arr.monitoring=this.state.monitoring;
                arr.values=[values];
                filter.push(arr);
                _this.props.filterSubmit(arr);
                this.props.form.resetFields();
            }
        });
    };
    onChange = (value,selectedOptions) => {
        this.setState({monitoring:selectedOptions});
        //console.log(value,selectedOptions)
    };
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        targetOption.loading = false;
            axios.ajax({
                baseURL:window.g.easyURL,
                method: 'get',
                url: '/monitordot',
                data:{
                    projected:this.props.selectp,
                    netid:selectedOptions[0].value
                }
            }).then((res)=>{
                if(res.success){
                    var target=[];
                    res.data.map((v)=>{
                        target.push({
                            label:v.name,
                            value: v.code,
                        })
                    });
                    targetOption.children = target;
                    this.setState({
                        options: [...this.state.options],
                    });
                }
            });

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
                                    required: true,
                                    message: '请输入标题',
                                }],
                            })(
                                <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} placeholder="请选择监测点" />
                            )
                        }
                    </FormItem>
                    <FormItem label='时间' key='time'>
                        {
                            getFieldDecorator('time',{
                                rules:[{
                                    required: true,
                                    message: '请输入标题',
                                }],
                                initialValue:"1"
                            })(
                                <Select>
                                    <Option value="1">小时</Option>
                                    <Option value="2">日</Option>
                                    <Option value="3">快速</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label='数据' key='datas'>
                        {
                            getFieldDecorator('datas',{
                                rules:[{
                                    required: true,
                                    message: '请输入标题',
                                }],
                                initialValue:"1"
                            })(
                                <Select>
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
                                    required: true,
                                    message: '请输入标题',
                                }],
                                initialValue:"1"
                            })(
                                <Select>
                                    <Option value="1">大于</Option>
                                    <Option value="2">大于等于</Option>
                                    <Option value="3">小于</Option>
                                    <Option value="4">小于等于</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem key="buts">
                        <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                        <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
export default WarningConditionsModel=Form.create({})(WarningConditionsModel);