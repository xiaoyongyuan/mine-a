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
            options:[]
        };
    }
    reset = ()=>{ //取消表单
        this.props.form.resetFields();
        this.props.earlyreset()
    };
    componentDidMount() {
        this.network();
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.form.resetFields();
            }
        });
    };
    onChange = (value) => {
      if(this.props.selectp && value){
          axios.ajax({
              baseURL:window.g.easyURL,
              method: 'get',
              url: '/monitordot',
              data:{
                  projected:this.props.selectp,
                  netid:value
              }
          }).then((res)=>{
              if(res.success){
                  console.log(res.data,"888");
                  res.data.map((v)=>{
                      this.state.options.push({
                          children:[{
                              value: v.code,
                              label: v.name,
                          }]});
                  });

              }
          });
      }
    };
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

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
                                <Cascader options={this.state.options} loadData={this.loadData} onChange={this.onChange} placeholder="请选择监测点" />
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