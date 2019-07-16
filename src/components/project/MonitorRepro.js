import React, { Component } from 'react';
import {Button, message, Modal} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import MonitModel from "./MonitModel"
import ItemModel from "./itemModel"
import ofteraxios from "../../axios/ofter";
class Monitorpro extends Component {
    state  ={
        newShow:false,
        okupdate:1,
    };
    formList={
        type:'inline',
        item:[
            {
                type: 'SELECT',
                label: '所属项目',
                field: 'projectid',
                placeholder: '全部',
                initialValue: '',
                list: [{code:'',name:'所有项目'}],
                width:'250px'
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
    params={
        pageindex:1,
        itemtype:18,
    };

    componentWillMount(){
        ofteraxios.projectlist().then(res=>{ //项目列表
            if(res.success){
                var project=[{code:'',name:'所有项目'}];
                res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
                this.formList.item[0].list=project;
            }
        },()=>{})
    }

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

    handleFilterSubmit=(params)=>{ //查询
        this.params.projectid=params.projectid;
        this.params.pageindex=1;
        this.requestList();
    };
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        params.itemtype=18;
        const _this=this;
        if(_this.state.type===0) {
            axios.ajax({
                baseURL: window.g.bizserviceURL,
                method: 'post',
                url: '/api/itemfile',
                data: params
            }).then((res) => {
                if (res.success) {
                    _this.requestList();
                } else {
                    message.warn(res.msg)
                }
            }, () => {
            });
        }else {
            params.code=this.state.codetype;
            axios.ajax({//编辑
                baseURL:window.g.bizserviceURL,
                method: 'put',
                url: '/api/itemfile',
                data: params
            }).then((res)=>{
                if(res.success){
                    _this.params.itemtype=18;
                    _this.params.pageindex=1;
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
        }
    };
    changeState=(key,val,record,type,typecode)=>{
        this.setState(
            {
                [key]:val,
                codetype:record.code,
                [type]:typecode,
            }
        )
    };
    download = (record) =>{
        // if(record.filepath.lastIndexOf(".pdf") === -1){
        //     window.location.href = window.g.filesURL+record.filepath;
        // }else{
        //     var strs=record.filepath.split("/");
        //     window.location.href = window.g.fileURL+"/api/pdf/download?fileName=" + strs[3] + "&delete=" + false + "&access_token=" +localStorage.getItem("token");
        // }
        window.location.href = window.g.fileURL+"/api/pdf/download?fileName=" + record.filepath + "&delete=" + false + "&access_token=" +localStorage.getItem("token") + "&oldFileName=" +record.oldfilename;
    };
    showModaldelete = (record,index) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            index:index,
            code:record.code
        });
    };
    deleteCancel = () =>{ //删除取消
        this.setState({
            deleteshow: false,
        });
    };
    deleteOk = () =>{//确认删除
        const data={
            ids:this.state.code,
        };
        const list=this.state.list;
        list.splice(this.state.index,1);
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: 'delete',
            url: '/api/itemfile',
            data: data
        }).then((res)=>{
            if(res.success){
                message.success('删除成功！');
                this.setState({
                    list:list,
                    deleteshow: false,
                })
            }
        },(res)=>{});
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
            dataIndex: 'updateby',
        },{
            title: '上传时间',
            dataIndex: 'updateon',
        },{
            title: '备注',
            dataIndex: 'memo',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'register',
            render: (text,record,index) =>{
                return(<div className="tableoption">
                    <Button type="primary" onClick={()=>this.changeState('newShow',true,record,'type',1)}>编辑</Button>
                    <Button type="primary" onClick={()=>this.showModaldelete(record,index)}>删除</Button>
                    {
                        record.filepath.lastIndexOf(".pdf") === -1?
                            <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>:
                            <a className="greencolor" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>

                    }
                    <Button type="primary" onClick={()=>this.download(record)}>下载</Button>
                </div>)
            }
        }];
        return (
            <div className="SurveyRepro">
                <div className="selectForm">
                    <div className="leftForm">
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                    </div>
                    <div className="rightOpt">
                        <Button type="primary" onClick={()=>this.changeState('newShow',true,'','type',0)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
                    </div>
                </div>
                <Etable
                    ref="pageChange"
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                />
                <ItemModel code={this.state.codetype}  newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false,'','type',1)} />
                <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                       width={370}
                       onCancel={this.deleteCancel} okText="确认" cancelText="取消"
                >
                    <p>确认删除吗？</p>
                </Modal>
            </div>
        );
    }
}
export default Monitorpro;
