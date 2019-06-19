import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button} from "antd";
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";

class Basicdata extends Component {
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
                    label: '设备id',
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
            account:this.state.account,
        };
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'get',
            url: '/firstdata',
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
            cid:params.cid,
            name:params.name,
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
            title: '地点',
            dataIndex: 'img',
            render: (text,record,index) =>{
                return(
                    <div className="tableoption">
                        {record.x+','+record.y+','+record.z}
                    </div>
                )
            }
        },{
            title: '设备名称',
            dataIndex: 'name',
        },{
            title: '数据',
            dataIndex: 'type',
        },{
            title: '设备IMEI',
            dataIndex: 'cid',
        },{
            title: '数据时间',
            dataIndex: 'createon',
        },{
            title: '生产厂家',
            dataIndex: 'manufacturers',
        },{
            title: '单位',
            dataIndex: 'unit',
        },];
        return (
            <div className="Basicdata">
                <div className="simple">
                    <div className="selectForm">
                        <div className="leftForm">
                            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                        </div>
                        <div className="rightOpt">
                            <Button type="primary"><span className="actionfont action-daochu1"/>&nbsp;&nbsp;导出</Button>
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

export default Basicdata;
