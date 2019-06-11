import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import ItemModel from "./itemModel"



class CheckAccept extends Component {
    state  ={
        newShow:false
    };
    params={
        pageindex:1,
        itemtype:12,
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
            baseURL:window.g.cuiURL,
            method: 'get',
            url: '/api/getItemByItemtype',
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
        params.itemtype=12;
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
            dataIndex: 'projectid',
        },{
            title: '上传人',
            dataIndex: 'uploader',
        },{
            title: '上传时间',
            dataIndex: 'createon',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'register',
            render: (text,record) =>{
                return(<div className="tableoption">
                    <a className="greencolor" onClick={()=>this.preview(record.filepath)}>预览</a>
                    <form method='GET' action='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx'>
                        <a type='submit' className="bluecolor">
                            下载</a>
                    </form>
                </div>)
            }
        }];
        return (
            <div className="CheckAccept">
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
                <ItemModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}
export default CheckAccept;
