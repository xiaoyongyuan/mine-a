import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button,message} from "antd";
import Etable from "../common/Etable";
import axios from "../../axios";

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
            pageindex: this.state.page,
            account:this.state.account,
        };
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'get',
            url: '/equipmentsys',
            data: quparams
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                this.setState({
                    list:res.data,
                    total: res.totalcount,
                })
            }
        });
    };
    handleFilterSubmit=(params)=>{ //查询
        console.log("params",params);
        this.setState({
            cid:params.cid,
            name:params.name,
            manufacturers:params.manufacturers,
            page:1
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
            dataIndex: 'img',
            render: (text,record,index) =>{
                return(
                    <div>
                        <img src={text} style={{width:'100px',height:'50px' }} />
                    </div>
                )
            }
        },{
            title: '设备名称',
            dataIndex: 'name',
        },{
            title: '设备类型',
            dataIndex: 'type',
        },{
            title: '设备IMEI',
            dataIndex: 'cid',
        },{
            title: '入库时间',
            dataIndex: 'createon',
        },{
            title: '生产厂家',
            dataIndex: 'manufacturers',
        },{
            title: '单位',
            dataIndex: 'unit',
        },{
            title: '状态',
            dataIndex: 'ware',
            render: (text,record,index) =>{
                return(
                    <div>
                        {
                            text?
                                '出库':
                                '入库'
                        }
                    </div>
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
                            <Button type="primary">导入</Button>
                        </div>
                    </div>

                    <Etable
                        ref="pageChange"
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={{
                            defaultPageSize: 10,
                            current: this.state.page,
                            total: this.state.total,
                            onChange: this.changePage,
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Equipmanage;
