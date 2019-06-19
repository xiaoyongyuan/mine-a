import React, { Component } from 'react';
import BaseForm from "../common/BaseForm"
import {Button, message, Modal} from "antd";
import Etable from "../common/Etable";
import Utils from "../../utils/utils";
import axios from "../../axios";
import "../../style/ztt/css/warning.less";
import WarningModel from "./WarningModel";
class Warning extends Component {
    state  ={
        newShow:false
    };
    params={
        pageindex:1,
    };
    formList={
        type:'inline',
        item:[
            {
                type: 'INPUT',
                label: '预警名称',
                field:'name',
                placeholder:''
            },{
                type: 'SELECT',
                label: '预警级别',
                field: 'rank',
                placeholder: '全部',
                initialValue: '0',
                list: [
                    {code: '0', name: '全部'},
                    {code: '1', name: '蓝色'},
                    {code: '2', name: '黄色'},
                    {code: '3', name: '橙色'},
                    {code: '4', name: '红色'}],
                width:"77px"
            },{
                type: 'SELECT',
                label: '状态',
                field: 'status',
                placeholder: '全部',
                initialValue: '3',
                list: [
                    {code: '3', name: '全部'},
                    {code: '0', name: '解除'},
                    {code: '1', name: '失效'}],
                width:"77px"
            },{
                type:'button',
                button:[
                    {
                        label:'查询',
                        type:"primary",
                        click:'handleFilterSubmit',
                    },
                    {
                        label:'重置',
                        click:'reset',
                    },
                ]
            }
        ]
    };
    constructor(props){
        super(props);
        this.state={
            list:[],
            visible:false
        };
        this.codeArr=[];
    }
    componentDidMount() {
        this.requestList();
    }
    handleFilterSubmit=(params)=>{ //查询
        this.params.rank =params.rank;
        this.params.status=params.status;
        this.params.name=params.name;
        this.requestList();
    };
    requestList=()=>{
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'get',
            url: '/warnlist',
            data: this.params
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
        this.setState({[key]:val})
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    };
    //单选
    handleSelect=(record, selected)=>{
        if(selected){
             this.codeArr.push(record.code);
        }else{
            this.codeArr.splice(this.codeArr.indexOf(record.code),1);
        }
    };
    hanleApplication=()=>{
        if(this.codeArr.length===0){
            message.warning("请选择数据!");
        }else{
            this.setState({
                visible:true
            });
        }
    };
    handleOkApplication=()=>{
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'put',
            url: '/warnlist',
            data:{
                code:this.codeArr.toString()
            }
        }).then((res)=>{
            if(res.success){
                this.setState({
                    visible:false
                });
                message.success("应用成功！")
            }
        });
    };
    handleCancelApplication=()=>{
        this.setState({
            visible:false
        });
    };
    uploadOkInsert=(params,receive)=>{ //上传提交
        console.log(params,"预警")
        if(receive.length>=1){
            this.setState({newShow:false});
            /*axios.ajax({
            baseURL:window.g.cuiURL,
            method: 'post',
            url: 'warnlist',
            data: {
                project:params.project,
                name:params.name,
                rank:params.rank,
                judge:params.judge,
                memo:params.memo,
                conditions:receive
            }
        }).then((res)=>{
            if(res.success){
                console.log(res.data)
            }
        });*/
        }else{
            message.warning("请添加报警条件!");
        }
    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '名称',
            dataIndex: 'name',
        },{
            title: '预警级别',
            dataIndex: 'rank',
        },{
            title: '预警状态',
            dataIndex: 'status',
            render: (record) =>{
                if(record.status===0){
                    return ("未使用")
                }else{
                    return ("生效")
                }
            },
        },{
            title: '条件',
            dataIndex: 'relation',
            render:(record)=>{
                if(record.relation===0){
                    return ("相或")
                }else{
                    return ("相与")
                }
            }
        },{
            title: '生成时间',
            dataIndex: 'createtime',
        },{
            title: '权限',
            dataIndex: 'time',
        },{
            title: '类型',
            dataIndex: 'type',
        },{
            title: '报警条件',
            dataIndex: 'ifType',
        }];
        const {selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect:this.handleSelect,
        };
        return (
           <div className="Warning">
               <div className="selectForm">
                   <div className="leftForm">
                       <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                   </div>
                   <div className="rightOpt">
                       <Button type="primary" onClick={()=>this.changeState('newShow',true)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
                       <Button type="primary" onClick={this.hanleApplication}>应用</Button>
                   </div>
               </div>
               <Etable
                   ref="pageChange"
                   bordered
                   columns={columns}
                   dataSource={this.state.list}
                   pagination={this.state.pagination}
                   rowSelection={rowSelection}
               />
               <WarningModel newShow={this.state.newShow} filterSubmitModel={this.uploadOkInsert} uploadreset={()=>this.changeState('newShow',false)}/>
               <Modal
                   title="提示"
                   visible={this.state.visible}
                   onOk={this.handleOkApplication}
                   onCancel={this.handleCancelApplication}
                   width={350}
               >
                   确定是否应用?
               </Modal>
           </div>
        );
    }
}
export default Warning;