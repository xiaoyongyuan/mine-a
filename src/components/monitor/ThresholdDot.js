import React, { Component } from 'react';
import Etable from "../common/Etable"
import {Button, message, Modal} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ItemModel from "./ThresholdDotModel";
const confirm = Modal.confirm;
class Threshold extends Component {
    constructor(props){
        super(props);
        this.state={
            newShow:false
        };
    }
    params={
        pageindex:1
    };

    componentDidMount() {
        const ids=this.props.query.id;
        const cid=this.props.query.cid;
        console.log("cid",cid);
        if(ids) this.setState({code:ids},()=>this.requestList());
    }
    requestList=()=>{
        axios.ajax({
            baseURL:window.g.hongURL,
            method: 'get',
            url: '/api/findMonitordeviceThresholdList',
            data: {netid:this.state.code}
        })
            .then((res)=>{
                if(res.success){
                    this.setState({
                        list:res.data,
                        pagination:Utils.pagination(res,(current)=>{
                            this.params.pageindex=current;
                            this.requestList();
                        })
                    })
                }
            });
    };
    changeState=(key,val)=>{
        this.setState(
            {
                [key]:val
            }
            )
    };
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        const _this=this;
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'post',
            url: '/threshold_dot',
            data: params
        })
            .then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
    };

    isstart = (ifsys,code) =>{
        console.log("code",code);
        var that = this;
        if(ifsys){
            this.setState({
                title:"确认应用吗？"
            },()=>{
                confirm({
                    title: this.state.title,
                    okText: "确认",
                    okType: "danger",
                    cancelText: "取消",
                    onOk() {
                        axios.ajax({
                            baseURL:window.g.hongURL,
                            method: 'put',
                            url: '/api/setUpMonitorDeviceIfsys',
                            data: {
                                code:code,
                                ifsys:ifsys
                            }
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
                                that.requestList();
                            }
                        });
                    }
                });
            })
        }else{
            this.setState({
                title:"确认解除吗？"
            },()=>{
                confirm({
                    title: this.state.title,
                    okText: "确认",
                    okType: "danger",
                    cancelText: "取消",
                    onOk() {
                        axios.ajax({
                            baseURL:window.g.hongURL,
                            method: 'put',
                            url: '/api/setUpMonitorDeviceIfsys',
                            data: {
                                code:code,
                                ifsys:ifsys
                            }
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
                                that.requestList();
                            }
                        });
                    }
                });
            })
        }

    };
    onChange = (checked) =>{
        console.log(`switch to ${checked}`);
    };

    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '监测点code',
            dataIndex: 'code',
        },{
            title: '监测点名称',
            dataIndex: 'pointname',
        },{
            title: '生成时间',
            dataIndex: 'createon',
        },{
            title: '低阈值',
            dataIndex: 'minumum',
        },{
            title: '高阈值',
            dataIndex: 'maximum',
        },{
            title: '状态',
            // dataIndex: 'status',
            render:(text, record,index) =>{
                return(
                    <div>
                    {
                        record.ifsys === '0'?<span className="state-bg-normal greencolor">已生效</span>:<span className="redcolor state-bg-not">未生效</span>
                    }
                    </div>
                )
            }
        },{
            title: '备注',
            dataIndex: 'remark',
        },{
            title: '操作',
            dataIndex: 'ifsys',
            render:(text, record,index) =>{
                return(
                    <div className="tableoption">
                        {
                            text === '0'?
                                <span className="greencolor" onClick={()=>this.changeState('newShow',true,record.code)} >编辑</span>:
                                ''
                        }
                        {
                            text === '0'?
                                <span className="redcolor" onClick={()=>this.isstart(1,record.code,)}>禁用</span>:
                                <span className="greencolor" onClick={()=>this.isstart(0,record.code,)}>应用</span>
                        }
                    </div>
                )
            }
        },];
        return (
            <div className="Threshold">
                <div className="selectForm">
                    <div className="leftForm">
                        {/*<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>*/}
                    </div>
                    <div className="rightOpt">
                        {/*<Button type="primary" onClick={()=>this.changeState('newShow',true)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>*/}
                    </div>
                </div>
                <Etable
                    ref="pageChange"
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                />
                <ItemModel netid={this.state.code} code={this.state.code} newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}

export default Threshold;
