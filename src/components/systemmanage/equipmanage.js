import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button} from "antd";
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ofteraxios from "../../axios/ofter";

class Equipmanage extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            page: 1,
            equiptypeArr:[
                // {code: "0", name: "全部"},
                // {code: "1", name: "GNSS"},
            ]
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
                    type: 'SELECT',
                    label: '设备类型',
                    field: 'equiptype',
                    placeholder: '全部',
                    initialValue: '',
                    list:this.state.equiptypeArr,
                    width:"195px"
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
    componentWillMount(){
        this.requestListEquiptype();
    }
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

    requestListEquiptype = () =>{
        ofteraxios.equiptypelistquery().then(res=>{ //设备类型
            if(res.success){
                // var equiptypeArr=[];
                res.data.map(
                    item=>this.state.equiptypeArr.push(
                        {
                            code:item.dvalue,
                            name:item.dname
                        }
                    )
                );
                this.state.equiptypeArr.unshift({
                    code:'',
                    name:'全部'
                })
                // this.setState(
                //     {
                //         equiptypeArr,
                //         selectmontinet:equiptypeArr.length?equiptypeArr[0].code:''
                //     },()=>{
                //         console.log("equiptypeArr",equiptypeArr);
                //     }
                // )
            }
        });
    };

    requestList = ()=>{
        console.log("this.params",this.params);
        const quparams = {
            pagesize: 10,
            pageindex: this.params.pageindex,
            devicename:this.state.devicename,
            sccj:this.state.sccj,
            devicecode:this.state.devicecode,
            devicetype:this.state.devicetype
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
            devicetype:params.equiptype,
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
                        <img src={text} alt="" style={{width:'100px',height:'50px' }} />
                    </div>
                )
            }
        },{
            title: '设备名称',
            dataIndex: 'devicename',
        },{
            title: '设备编码',
            dataIndex: 'devicecode',
        },{
            title: '设备类型',
            dataIndex: 'dname',
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
                            <Button type="primary"><span className="actionfont action-daoru"/>&nbsp;&nbsp;导入</Button>
                            <Button type="primary" style={{ marginLeft:'20px', }}><span className="actionfont action-daochu1"/>&nbsp;&nbsp;导出</Button>
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
