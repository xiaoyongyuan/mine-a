import React, { Component } from 'react';
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm";
import {Button} from "antd";



class Addproject extends Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            pagination:{}
        };
        this.params = {
            page:1,
        };
        this.formList = [
            {
                type: 'INPUT',
                label: '项目名称',
                field: 'brand',
                placeholder: '请输入项目名称',
                initialValue: '',
            },
        ]
    }
    componentDidMount(){
        this.requestList();
    }
    requestList = ()=>{
        axios.ajax({
            method: 'get',
            url: '/getproject',
            data: this.params
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                this.setState({
                    list:res.data,
                    pagination:Utils.pagination(res,(current)=>{
                        this.params.page=current;
                        this.requestList();
                    })
                })
            }
        });


    };

    render() {
        const _this=this;
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '项目名称',
            dataIndex: 'projectname',
        },{
            title: '项目描述',
            dataIndex: 'projectintro',
        },];
        return (
            <div className="Addproject">
                <div className="simple">
                    <div className="selectForm">
                        <div className="leftForm">
                            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                        </div>
                        <div className="rightOpt">
                            <Button type="primary" onClick={this.showModal}>新增</Button>
                        </div>
                    </div>
                    <Etable
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        // pagination={this.state.simplepag}
                    />
                </div>
            </div>
        );
    }
}

export default Addproject;
