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

    isstart = (code) =>{
        console.log("code",code);
        if(code){
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
                            baseURL:window.g.easyURL,
                            method: 'put',
                            url: '/threshold_net',
                            data: code
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
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
                            baseURL:window.g.easyURL,
                            method: 'put',
                            url: '/threshold_net',
                            data: code
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
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
            dataIndex: 'minimum',
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
                        record.states === 0?<span className="state-bg-not">未生效</span>:<span className="state-bg-normal">已生效</span>
                    }
                    </div>
                )
            }
        },{
            title: '备注',
            dataIndex: 'remark',
        },{
            title: '操作',
            dataIndex: 'status',
            render:(text, record,index) =>{
                return(
                    <div className="tableoption">
                        {/*<a className="greencolor" onClick={()=>this.preview(record.filepath)}>预览</a>*/}
                        {
                            text?
                                <span className="redcolor" onClick={()=>this.isstart(0)}>解除</span>:
                                <span className="greencolor" onClick={()=>this.isstart(1)}>应用</span>
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
                        <Button type="primary" onClick={()=>this.changeState('newShow',true)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
                    </div>
                </div>
                <Etable
                    ref="pageChange"
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    // pagination={this.state.pagination}
                />
                <ItemModel netid={this.state.code} code={this.state.code} newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}

export default Threshold;
