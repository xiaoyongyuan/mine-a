import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button, message} from "antd";
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ofteraxios from "../../axios/ofter";


class Basicdata extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            page: 1,
            equiptypeArr:[],
        };
        this.formList={
            type:'inline',
            item:[
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
                    type: 'RANGPICKER',
                    label: '数据时间',
                    field:'rankname',
                    placeholder:'',
                    format:'YYYY-MM-DD HH:mm:ss'
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
    componentWillMount(){
        this.requestListEquiptype();
    }
    componentDidMount(){
        this.requestList();
    };
    requestListEquiptype = () =>{//设备类型
        ofteraxios.equiptypelistquery().then(res=>{ 
            if(res.success){
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
            }
        },(res)=>{});
    };
    changePage = (page) => {
        this.params.pageindex=page;
        this.requestList();
    };
    export = () =>{
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: 'get',
            url: 'api/exportCheckDataOriginal',
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                window.location.href = window.g.fileURL+"/api/download?fileName=" + res.msg + "&delete=" + true + "&access_token=" +localStorage.getItem("token");
                message.success('导出成功！', 3);
                this.requestList();
            }
        },(res)=>{});
    };
    requestList = ()=>{
        const _this=this;
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: 'get',
            url: '/api/checkDataOriginal',
            data: _this.params,

        }).then((res)=>{
            if(res.success){
                _this.setState({
                    list:res.data,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.pageindex=current;
                        _this.requestList();
                    })
                })
            }
        },(res)=>{});
    };
    handleFilterSubmit=(params)=>{ //查询
        console.log("params",params);
        this.params.pageindex=1;
        this.params.devicetype=params.equiptype;
        if(params.rankname){
            this.params.createonbegin=params.rankname[0].format('YYYY-MM-DD HH:mm:ss');
            this.params.createonend=params.rankname[1].format('YYYY-MM-DD HH:mm:ss');
        }else {
            this.params.createonbegin = '';
            this.params.createonend = ''
        }
        this.requestList();

    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '地点',
            dataIndex: 'img',
            // render: (text,record,index) =>{
            //     return(
            //         <div className="tableoption">
            //             {record.x+','+record.y+','+record.z}
            //         </div>
            //     )
            // }
        },{
            title: '设备名称',
            dataIndex: 'name',
        },{
            title: '设备类型',
            dataIndex: 'dname',
        },{
            title: '数据',
            dataIndex: 'datainfo',
        },{
            title: '设备编码',
            dataIndex: 'devicecode',
        },{
            title: '数据时间',
            dataIndex: 'createon',
        },{
            title: '生产厂家',
            dataIndex: 'manufacturers',
        },{
            title: '单位',
            dataIndex: 'units',
        },];
        return (
            <div className="Basicdata">
                <div className="simple">
                    <div className="selectForm">
                        <div className="leftForm">
                            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                        </div>
                        <div className="rightOpt">
                            <Button type="primary" onClick={this.export}><span className="actionfont action-daochu1"/>&nbsp;&nbsp;导出</Button>
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
