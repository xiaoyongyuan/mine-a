import React, { Component } from 'react';
import {Button, message, Modal} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import MonitModel from "./MonitModel"
import ItemModel from "./itemModel"
class Monitorpro extends Component {
    state  ={
      newShow:false
    };
    params={
      pageindex:1,
      itemtype:18,
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
        baseURL:window.g.bizserviceURL,
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
   /* preview=(filepath)=>{ //预览文件
      window.open('http://192.168.10.20:8004/sys/UploadFile/OfficeFile/1136541326366367744.docx')
    }*/
    handleFilterSubmit=(params)=>{ //查询
      params.pageindex=1;
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
      const _this=this;
        params.itemtype=18;
      axios.ajax({
        baseURL:window.g.bizserviceURL,
        method: 'post',
        url: '/api/itemfile',
        data: params
      })
      .then((res)=>{
        if(res.success){
            _this.params.itemtype=18;
            _this.params.pageindex=1;
          _this.requestList();
        }else{message.warn(res.msg)}
      },()=>{});
    };
    changeState=(key,val)=>{
      this.setState({[key]:val})
    };
    download = (record) =>{
        if(record.filepath.lastIndexOf(".pdf") === -1){
            window.location.href = window.g.filesURL+record.filepath;
        }else{
            var strs=record.filepath.split("/");
            window.location.href = window.g.fileURL+"/api/pdf/download?fileName=" + strs[3] + "&delete=" + false + "&access_token=" +localStorage.getItem("token");
        }
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
        title: '文件名',
        dataIndex: 'itemtitle',
      },{
        title: '适用年限',
        dataIndex: 'begindate',
        // render: (text,record) =>{
        //   return(<div>{text+'--'+record.enddate}</div>)
        // }
      },{
        title: '上传人',
        dataIndex: 'createby',
      },{
        title: '上传时间',
        dataIndex: 'createon',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
          render: (text,record,index) =>{
              return(<div className="tableoption">
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
      <div className="Monitorpro">
        <div className="selectForm">
          <div className="leftForm"> 
            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
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
          <ItemModel  newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
          <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                 width={370}
                 onCancel={this.deleteCancel} okText="确认" cancelText="取消"
          >
              <p>确认删除吗？</p>
          </Modal>
        {/*<MonitModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />*/}
      </div>
    );
  }
}
export default Monitorpro;
