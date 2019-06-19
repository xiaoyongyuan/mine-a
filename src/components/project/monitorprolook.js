import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import ItemModel from "./itemModel"
import ofteraxios from '../../axios/ofter'


class Monitorprolook extends Component {
    state  ={
      newShow:false,
      okupdate:1,
      oldcode:this.props.query.id
    };

    params={
      pageindex:1,
      itemtype:10,
    };

    componentDidMount(){
      this.requestList()
    }
    
    requestList=()=>{
      const _this=this;
      axios.ajax({
        baseURL:window.g.wangURL,
        method: 'get',
        url: '/api/getItemfileList',
        data: {oldcode:_this.state.oldcode}
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

    uploadOk=(params)=>{ //上传提交
      this.setState({newShow:false});
      params.itemtype=5;
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
        title: '备注',
        dataIndex: 'memo',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          return(<div className="tableoption">
              <a className="greencolor" onClick={()=>this.preview(record.filepath)}><Button type="primary">预览</Button></a>
          <form method='GET' action='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx'>
              <a type='submit' className="bluecolor"><Button type="primary">下载</Button></a>
          </form>
          </div>)
        }
      }];
    return (
      <div className="Monitorprolook">
        <Etable
              ref="pageChange"
              bordered
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
          />
        <ItemModel  newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
      </div>
    );
  }
}
export default Monitorprolook;
