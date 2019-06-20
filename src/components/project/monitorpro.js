import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import MonitModel from "./MonitModel"
import MonitEdit from "./MonitEdit"


class monitorpro extends Component {
    state  ={
        newShow:false,
        EditShow:false
    };
    params={
        pageindex:1,
        itemtype:11,
        createonbegin:'',
        createonend:''
    };

    componentDidMount(){
        this.requestList()
    }

    requestList=()=>{
        axios.ajax({
            baseURL:window.g.wangURL,
            method: 'get',
            url: '/api/getItemfileList',
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
    preview=(filepath)=>{ //预览文件
        window.open('http://192.168.10.20:8004/sys/UploadFile/OfficeFile/1136541326366367744.docx')
    };
    uploadOk=(params,id)=>{ //上传提交
        const _this=this;
        params.itemtype=11;
        
        if(id && !this.state.idstates){
            this.setState({newShow:false});
            params.oldcode=id;
            axios.ajax({
            baseURL:window.g.wangURL,
            method: 'put',
            url: '/api/itemfile',
            data: params
        }).then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
        }else{
            this.setState({newShow:false});
            this.setState({EditShow:false});
            if(id)params.oldcode=id;
            axios.ajax({
                baseURL:window.g.wangURL,
                method: 'post',
                url: '/api/itemfile',
                data: params
            }).then((res)=>{
                    if(res.success){
                        _this.requestList();
                    }else{message.warn(res.msg)}
                });

        }
        
    };
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    changeguih=(code,states)=>{ //变更
        this.setState({id:code,EditShow:true,idstates:states})

    }
    changestatus=(code)=>{
        const _this=this;
        axios.ajax({
            baseURL:window.g.wangURL,
            method: 'put',
            url: '/api/itemfile',
            data: {
                states:'1',
                code:code,
            }
        }).then((res)=>{
            if(res.success){
                _this.requestList();
            }else{message.warn(res.msg)}
        });
    }
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '名称',
            dataIndex: 'itemtitle',
        },{
            title: '所属项目',
            dataIndex: 'projectname',
        },{
            title: '上传人',
            dataIndex: 'uploader',
        },{
            title: '上传时间',
            dataIndex: 'createon',
        },{
            title: '状态',
            dataIndex: 'states',
            render: (text) =>{
              if(text==0) return(<div className='graycolor'>编制中</div>)
              else if(text==1) return(<div className='bluecolor'>执行中</div>)
              else return(<div className='greencolor'>已完成</div>)
            }
        },{
            title: '备注',
            dataIndex: 'memo',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'states',
            render: (text,record) =>{
                if(text==0) return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record.code,record.states)}>修改</span>
                        <span className='bluecolor'>预览</span>
                        <span className='bluecolor'>文档下载</span>
                        <span className='bluecolor'>CAD下载</span>
                        <span className='greencolor'  onClick={()=>this.changestatus(record.code)}>执行</span>
                    </div>)
                else if(text==1) return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record.code,record.states)}>变更</span>
                        <span className='bluecolor'>预览</span>
                        <span className='bluecolor'>文档下载</span>
                        <span className='bluecolor'>CAD下载</span>
                        <a className='greencolor' href={'#/main/monitorprolook?id='+record.code}>查看</a>
                    </div>)
              else return(
                <div className='tableoption'>
                    <span className='bluecolor'>预览</span>
                    <span className='bluecolor'>文档下载</span>
                    <span className='bluecolor'>CAD下载</span>
                    <a className='greencolor' href={'#/main/monitorprolook?id='+record.code}>查看</a>
                </div>)
            }
        }];
        return (
            <div className="monitorpro">
                <div className="selectForm">
                    <div className="leftForm">
                    </div>
                    <div className="rightOpt">
                        <Button type="primary" onClick={()=>this.changeState('newShow',true)}>新增</Button>
                    </div>
                </div>
                <Etable
                    ref="pageChange"
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                />
                <MonitModel newShow={this.state.newShow} filterSubmit={(params)=>this.uploadOk(params)} uploadreset={()=>this.changeState('newShow',false)} />
                <MonitEdit newShow={this.state.EditShow} changeSubmit={(params)=>this.uploadOk(params,this.state.id)} uploadreset={()=>this.changeState('EditShow',false)} />
            </div>
        );
    }
}
export default monitorpro;
