import React, { Component,Fragment } from 'react';
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
        method: 'get',
        url: '/bizservice/api/getItemfileList',
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
   /* preview=(filepath)=>{ //预览文件
      window.open('http://192.168.10.20:8004/sys/UploadFile/OfficeFile/1136541326366367744.docx')
    };*/

    uploadOk=(params)=>{ //上传提交
      this.setState({newShow:false});
      params.itemtype=10;
      const _this=this;
      axios.ajax({
        method: 'post',
        url: '/bizservice/api/itemfile',
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
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          return(
            <div className='tableoption'>
              {
                record.filepath?<Fragment><a className='greencolor' target="_blank"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}>预览</a>
                <a className='bluecolor' href={window.g.filelook+record.filepath}>文档下载</a></Fragment>
                :null
              }
              {
                record.filepathcad?<a className='bluecolor' href={window.g.filelook+record.filepathcad}>CAD下载</a>
                :null
              }                
            </div>
          )
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
