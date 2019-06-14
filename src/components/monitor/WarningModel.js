import React, { Component } from 'react';
import {Modal, Input, Form, Select, Button, Icon} from 'antd';
import WarningConditionsModel from "./WarningConditionsModel";
import axios from "../../axios";
import ofteraxios from "../../axios/ofter";
const FormItem = Form.Item;
const Option = Select.Option;
class WarningModel extends Component{
    constructor(props){
        super(props);
        this.state={
            early:false,
            project:[],
            inputContext:[],
            context:[]
        };
    }
    componentWillMount(){
        ofteraxios.projectlist().then(res=>{ //项目列表
            if(res.success){
                var project=[]
                res.data.map(item=>project.push({code:item.code,name:item.title}) );
                this.setState({
                    project,
                    selectp:project.length?project[0].code:'',
                })
            }
        })

    }
    reset = ()=>{ //取消表单
        this.props.form.resetFields();
        this.props.uploadreset()
    };
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    hanlewarningC=()=>{
        this.setState({early:true})
    };
    handleFilterSubmit=()=>{
        const _this=this;
        const allparam={};
        this.props.form.validateFields((err, values) => {
            if (!err) {
                allparam.values=values;
                allparam.inputContext=this.state.inputContext;
                _this.props.filterSubmitModel(allparam,this.state.inputContext);
                this.props.form.resetFields();
            }
        });
    };
    uploadOk=(params)=>{ //上传提交
        console.log(params)
        this.setState({early:false});
        this.setState({
            inputContext:params.values
        });
        params.monitoring.map((v)=>{
           //this.state.context.push(v.label);
           this.setState({
               context:v.label
           })
        });
        params.map((v)=>{
       /* axios.ajax({
            baseURL:window.g.cuiURL,
            method: 'post',
            url: 'warnlist',
            data: {
                dot:v.dot,
                time:v.time,
                datas:v.datas,
                judge:v.judge
            }
        }).then((res)=>{
            if(res.success){
                console.log(res.data)
            }
        });*/
        })
    };
    hanleDelete=(i)=>{
        this.state.inputContext.splice(i,1);
    };
    hanleContext=(name,time,datas,judge)=>{
        return this.hanleTime(time)+ this.hanlejudge(judge)+ this.hanleData(datas)+this.state.context;
    };
    hanleData=(datas)=>{
        if(datas==="1"){
            return "水平";
        }else if(datas==="2"){
            return "垂直";
        }
    };
    hanleTime=(time)=>{
        if(time==="1"){
            return "每小时";
        }else if(time==="2"){
            return "日";
        }else if(time==="3"){
            return "快速";
        }
    };
    hanlejudge=(judge)=>{
        if(judge==="1"){
            return "大于";
        }else if(judge==="2"){
            return "大于等于";
        }else if(judge==="3"){
            return "小于";
        }else if(judge==="4"){
            return "小于等于";
        }
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
           return (
            <div className="ItemModel">
                <Modal
                    title="新增预警"
                    visible={this.props.newShow}
                    onCancel={this.reset}
                    footer={null}
                >
                    <Form className='baseform' {...formItemLayout} >
                        <FormItem label='项目' key='project'>
                            {
                                getFieldDecorator('project',{
                                    rules:[{
                                        required: true,
                                        message: '请输入项目',
                                    }],
                                    initialValue: this.state.selectp
                                })(
                                    <Select>
                                        {this.state.project.map(city => (
                                            <Option key={city.code} value={city.code}>{city.name}</Option>
                                        ))}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='名称' key='name'>
                            {
                                getFieldDecorator('name',{
                                    rules:[{
                                        required: true,
                                        message: '请输入标题',
                                    }],
                                })(
                                    <Input key='montInput' />
                                )
                            }
                        </FormItem>
                        <FormItem label='级别' key='rank'>
                            {
                                getFieldDecorator('rank',{
                                    rules:[{
                                        required: true,
                                        message: '请输入标题',
                                    }],
                                    initialValue:"1"
                                })(
                                    <Select>
                                        <Option value="1">蓝色</Option>
                                        <Option value="2">橙色</Option>
                                        <Option value="3">黄色</Option>
                                        <Option value="4">红色</Option>
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
                                    initialValue:"0"
                                })(
                                    <Select>
                                        <Option value="0">相或</Option>
                                        <Option value="1">相与</Option>
                                </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='备注' key='memo'>
                            {
                                getFieldDecorator('memo',{
                                    rules:[{
                                        required: true,
                                        message: '请输入备注',
                                    }],
                                })(
                                    <Input key='montInput' />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.hanlewarningC}>添加预警条件</Button>
                            <WarningConditionsModel early={this.state.early} selectp={this.state.selectp} filterSubmit={this.uploadOk} earlyreset={()=>this.changeState('early',false)} />
                        </FormItem>
                        <div style={{display:this.state.inputContext?"block":"none"}}>
                            {
                                this.state.inputContext.map((v,i)=>(
                                    <p key={i}><Input style={{width:"90%"}} key='montInput' value={this.hanleContext(v.name,v.time,v.datas,v.judge)} /><Icon type="close-circle" onClick={()=>this.hanleDelete(i)} /></p>
                                ))
                            }
                        </div>
                        <FormItem key="buts">
                        <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                        <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
                    </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default WarningModel=Form.create({})(WarningModel);