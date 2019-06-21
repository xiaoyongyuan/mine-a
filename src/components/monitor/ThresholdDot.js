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
        if(ids) this.setState({netid:ids},()=>this.requestList());
    }
    requestList=()=>{
        var that = this;
        axios.ajax({
            baseURL:window.g.hongURL,
            method: 'get',
            url: '/api/findMonitordeviceThresholdList',
            data: {netid:that.state.netid}
        })
            .then((res)=>{
                if(res.success){
                    that.setState({
                        list:res.data,
                        pagination:Utils.pagination(res,(current)=>{
                            that.params.pageindex=current;
                            that.requestList();
                        })
                    })
                }
            });
    };
    changeState=(key,val,code,maximum,minumum,memo)=>{
        this.setState(
            {
                [key]:val,
                maximum:maximum,
                minumum:minumum,
                memo:memo,
                code
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
        var that = this;
        if(ifsys){
            this.setState({
                title:"确认禁用吗？"
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
                                message.success('禁用成功！');
                                that.requestList();
                            }
                        });
                    }
                });
            })
        }else{
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
                                message.success('应用成功！');
                                that.requestList();
                            }
                        });
                    }
                });
            })
        }

    };
    onChange = (checked) =>{

    };

    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
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
            dataIndex: 'memo',
        },{
            title: '操作',
            dataIndex: 'ifsys',
            render:(text, record,index) =>{
                return(
                    <div className="tableoption">
                        {
                            text === '0'?
                                <span className="greencolor" onClick={()=>this.changeState('newShow',true,record.code,record.maximum,record.minumum,record.memo)} >编辑</span>:
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
                <ItemModel memo={this.state.memo} minumum={this.state.minumum} maximum={this.state.maximum} netid={this.state.code} code={this.state.code} newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}

export default Threshold;
