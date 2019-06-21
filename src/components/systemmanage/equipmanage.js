import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button,message} from "antd";
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";

class Equipmanage extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            page: 1,
        };
        this.formList={
            type:'inline',
            item:[
                {
                    type: 'INPUT',
                    label: '设备编码',
                    field:'cid',
                    placeholder:'',
                },
                {
                    type: 'INPUT',
                    label: '设备名称',
                    field:'name',
                    placeholder:'',
                },
                {
                    type: 'INPUT',
                    label: '厂家',
                    field:'manufacturers',
                    placeholder:'',
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
        }
    };
    params={
        pageindex:1
    };
    componentDidMount(){
        this.requestList();
    };
    changePage = (page) => { //分页  页码改变的回调，参数是改变后的页码及每页条数
        console.log("page",page);
        this.setState({
            page: page,
        }, () => {
            this.requestList();
        })
    };
    requestList = ()=>{
        console.log("this.params",this.params);
        const quparams = {
            pagesize: 10,
            pageindex: this.params.pageindex,
            devicename:this.state.devicename,
            sccj:this.state.sccj,
            devicecode:this.state.devicecode,
        };
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: '/api/equipment',
            data: quparams
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                this.setState({
                    list:res.data,
                    total: res.totalcount,
                    pagination:Utils.pagination(res,(current)=>{
                        console.log("current",current);
                        this.params.pageindex=current;
                        this.requestList();
                    })
                })
            }
        });
    };
    handleFilterSubmit=(params)=>{ //查询
        console.log("params",params);
        this.setState({
            devicename:params.name,
            sccj:params.manufacturers,
            devicecode:params.cid,
            pageindex:1
        }, () => {
            this.requestList();
        });
    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '设备图片',
            dataIndex: 'picpath',
            render: (text,record,index) =>{
                return(
                    <div>
                        <img src={text} style={{width:'100px',height:'50px' }} />
                    </div>
                )
            }
        },{
            title: '设备名称',
            dataIndex: 'devicename',
        },{
            title: '设备类型',
            dataIndex: 'devicetype',
        },{
            title: '设备编码',
            dataIndex: 'devicecode',
        },{
            title: '入库时间',
            dataIndex: 'createon',
        },{
            title: '生产厂家',
            dataIndex: 'sccj',
        },{
            title: '单位',
            dataIndex: 'units',
        },{
            title: '状态',
            dataIndex: 'ware',
            render: (text,record,index) =>{
                return(
                    <div className="state-bg-normal">入库</div>
                )
            }
        },];
        return (
            <div className="Equipmanage">
                <div className="simple">
                    <div className="selectForm">
                        <div className="leftForm">
                            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                        </div>
                        <div className="rightOpt">
                            <Button type="primary"><span className="actionfont action-daoru"/>&nbsp;&nbsp;导入</Button>
                        </div>
                    </div>

                    <Etable
                        ref="pageChange"
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        );
    }
}

export default Equipmanage;
