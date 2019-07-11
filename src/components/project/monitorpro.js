import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import Etable from "../common/Etable"
import MonitModel from "./MonitModel"
import MonitEdit from "./MonitEdit"

const confirm = Modal.confirm;
class monitorpro extends Component {
    state  ={
        newShow:false,
        EditShow:false,
        toparams:{}
    };
    params={
        pageindex:1,
        itemtype:11,
    };

    componentDidMount(){
        this.requestList()
    }

    requestList=()=>{
        axios.ajax({
            baseURL:window.g.bizserviceURL,
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
            },()=>{});
    };
    uploadOk=(params,id,itemtitle,projectid)=>{ //保存数据
        const _this=this;
        params.itemtype=11;
        if(id && this.state.idstates === '1'){//变更
            this.setState({newShow:false});
            params.oldcode=id;
            params.itemtitle=itemtitle;
            params.projectid=projectid;
                axios.ajax({
                    baseURL:window.g.bizserviceURL,
                    method: 'post',
                    url: '/api/itemfile',
                    data: params
                }).then((res)=>{
                    if(res.success){
                        message.success("变更成功");
                        _this.requestList();
                    }else{message.warn(res.msg)}
                },()=>{});
        }else{
            this.setState({newShow:false,EditShow:false});
            if(id){
                params.code=id;
                axios.ajax({//修改
                    baseURL:window.g.bizserviceURL,
                    method: 'put',
                    url: '/api/itemfile',
                    data: params
                }).then((res)=>{
                    if(res.success){
                        message.success("修改成功");
                        _this.requestList();
                    }else{message.warn(res.msg)}
                },()=>{});
            }
            if(id === undefined){
                axios.ajax({//新增
                    baseURL:window.g.bizserviceURL,
                    method: 'post',
                    url: '/api/itemfile',
                    data: params
                }).then((res)=>{
                    if(res.success){
                        message.success("新增成功");
                        _this.requestList();
                    }else{message.warn(res.msg)}
                },()=>{});
            }
        }
    };
    changeState=(key,val)=>{
        this.setState(
            {
                [key]:val,
            }
        )
    };
    changeguih=(record)=>{ //变更
        this.setState({
            id:record.code,
            EditShow:true,
            idstates:record.states,
            toparams:record,
            itemtitle:record.itemtitle,
            projectid:record.projectid
        })
    };
    changestatus=(code)=>{
        const _this=this;
      confirm({
          title: '添加',
          content: '确认操作',
          onOk() {
            axios.ajax({
                baseURL:window.g.bizserviceURL,
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
            },()=>{});
          }
      });
    };
    download = (record) =>{
        if(record.filepath.lastIndexOf(".pdf") === -1){
            window.location.href = window.g.filesURL+record.filepath;
        }else{
            var strs=record.filepath.split("/");
            window.location.href = window.g.fileURL+"/api/pdf/download?fileName=" + strs[3] + "&delete=" + false + "&access_token=" +localStorage.getItem("token");
        }
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
            dataIndex: 'createby',
        },{
            title: '上传时间',
            dataIndex: 'createon',
        },{
            title: '状态',
            dataIndex: 'states',
            render: (text) =>{
              if(text==='0') return(<div className='state-bg-not'>规划中</div>);
              else if(text==='1') return(<div className='state-bg-implement'>执行中</div>);
              else return(<div className='state-bg-normal'>已完成</div>)
            }
        },{
            title: '备注',
            dataIndex: 'memo',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'states',
            render: (text,record) =>{
                if(text==='0') return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record)}><Button type="primary">修改</Button></span>
                        {
                            record.filepath.lastIndexOf(".pdf") === -1?
                                <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>:
                                <a className="greencolor" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>
                        }
                        <Button type="primary" onClick={()=>this.download(record)}>文档下载</Button>
                        <a className='bluecolor' href={window.g.filesURL+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
                        <span className='greencolor'  onClick={()=>this.changestatus(record.code)}><Button type="primary">执行</Button></span>
                    </div>);
                else if(text==='1') return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record)}><Button type="primary">变更</Button></span>
                        {
                            record.filepath.lastIndexOf(".pdf") === -1?
                                <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>:
                                <a className="greencolor" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>
                        }
                        <Button type="primary" onClick={()=>this.download(record)}>文档下载</Button>
                        <a className='bluecolor' href={window.g.filesURL+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
                        <a className='greencolor' href={'#/main/monitorprolook?id='+record.code}><Button type="primary">查看</Button></a>
                    </div>);
              else return(
                <div className='tableoption'>
                    {
                        record.filepath.lastIndexOf(".pdf") === -1?
                            <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>:
                            <a className="greencolor" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>
                    }
                    <Button type="primary" onClick={()=>this.download(record)}>文档下载</Button>
                    <a className='bluecolor'href={window.g.filesURL+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
                    <a className='greencolor' href={'#/main/monitorprolook?id='+record.code}><Button type="primary">查看</Button></a>
                </div>)
            }
        }];
        return (
            <div className="monitorpro">
                <div className="selectForm">
                    <div className="leftForm">
                    </div>
                    <div className="rightOpt">
                        <a  href="http://www.beidouenv.com/uploadFile/dwdr.xlsx" className="bluecolor"><Button style={{ marginRight:'20px' }} type="primary"><span className="actionfont action-daoru"/> 下载导入模板(点位)</Button></a>
                        <Button type="primary" onClick={()=>this.changeState('newShow',true)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
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
                <MonitEdit newShow={this.state.EditShow} changeSubmit={(params)=>this.uploadOk(params,this.state.id,this.state.itemtitle,this.state.projectid)} uploadreset={()=>this.changeState('EditShow',false)} />
            </div>
        );
    }
}
export default monitorpro;
