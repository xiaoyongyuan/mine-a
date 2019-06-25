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
            method: 'get',
            url: '/bizservice/api/getItemfileList',
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
            method: 'put',
            url: '/bizservice/api/itemfile',
            data: params
        }).then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
        }else{
            this.setState({newShow:false});
            this.setState({EditShow:false});
            if(id){
                const toparams=this.state.toparams;
                params.oldcode=id;
                params.itemtitle=toparams.itemtitle;
                params.projectid=toparams.projectid;
                params.projectname=toparams.projectname;
            }
            axios.ajax({
                method: 'post',
                url: '/bizservice/api/itemfile',
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
    changeguih=(record)=>{ //变更
        this.setState({id:record.code,EditShow:true,idstates:record.states,toparams:record})

    }
    changestatus=(code)=>{
        const _this=this;

      confirm({
          title: '添加',
          content: '确认添加至我的预案？',
          onOk() {
            axios.ajax({
                method: 'put',
                url: '/bizservice/api/itemfile',
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
              if(text===0) return(<div className='state-bg-not'>编制中</div>)
              else if(text===1) return(<div className='state-bg-implement'>执行中</div>)
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
                if(text===0) return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record)}><Button type="primary">修改</Button></span>
                        <a className='bluecolor' target="_blank"  rel="noopener noreferrer"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}><Button type="primary">预览</Button></a>
                        <a className='bluecolor'  href={window.g.filelook+record.filepath} download><Button type="primary">文档下载</Button></a>
                        <a className='bluecolor' href={window.g.filelook+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
                        <span className='greencolor'  onClick={()=>this.changestatus(record.code)}><Button type="primary">执行</Button></span>
                    </div>)
                else if(text===1) return(
                    <div className='tableoption'>
                        <span className='yellowcolor' onClick={()=>this.changeguih(record)}><Button type="primary">变更</Button></span>
                        <a className='bluecolor' target="_blank" rel="noopener noreferrer"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}><Button type="primary">预览</Button></a>
                        <a className='bluecolor'  href={window.g.filelook+record.filepath} download><Button type="primary">文档下载</Button></a>
                        <a className='bluecolor' href={window.g.filelook+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
                        <a className='greencolor' href={'#/main/monitorprolook?id='+record.code}><Button type="primary">查看</Button></a>
                    </div>)
              else return(
                <div className='tableoption'>
                    <a className='bluecolor' target="_blank" rel="noopener noreferrer"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}><Button type="primary">预览</Button></a>
                    <a className='bluecolor'  href={window.g.filelook+record.filepath}><Button type="primary">文档下载</Button></a>
                    <a className='bluecolor'href={window.g.filelook+record.filepathcad} download><Button type="primary">CAD下载</Button></a>
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
                <MonitEdit newShow={this.state.EditShow} changeSubmit={(params)=>this.uploadOk(params,this.state.id)} uploadreset={()=>this.changeState('EditShow',false)} />
            </div>
        );
    }
}
export default monitorpro;
