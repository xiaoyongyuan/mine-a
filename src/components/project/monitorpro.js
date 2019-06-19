import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import MonitModel from "./MonitModel"


class monitorpro extends Component {
    state  ={
        newShow:false
    };
    params={
        pageindex:1,
        itemtype:11,
        createonbegin:'',
        createonend:''
    };
    formList={
        type:'inline',
        item:[
            {
                type: 'RANGPICKER',
                label: '时间',
                field:'doubledata',
                placeholder:'请选择时间',
                showTime:true,
                format:'YYYY-MM-DD HH:mm:ss'
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
    handleFilterSubmit=(params)=>{ //查询
        if(params.doubledata){
            this.params.createonbegin=params.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
            this.params.createonend=params.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
        }else {
            this.params.createonbegin = '';
            this.params.createonend = ''
        }
        this.requestList();
    };
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        params.itemtype=11;
        const _this=this;
        axios.ajax({
            baseURL:window.g.cuiURL,
            method: 'post',
            url: '/api/itemfile',
            data: params
        })
            .then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
    };
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
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
                        <span className='yellowcolor'>修改</span>
                        <a className='bluecolor' target="_blank"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}>预览</a>
                        <span className='bluecolor'>文档下载</span>
                        <span className='bluecolor'>CAD下载</span>
                        <span className='greencolor'>执行</span>
                    </div>)
                else if(text==1) return(
                    <div className='tableoption'>
                        <span className='yellowcolor'>变更</span>
                        <a className='bluecolor' target="_blank"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}>预览</a>
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
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
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
                <MonitModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}
export default monitorpro;
