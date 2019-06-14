import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import UploadModel from "../common/UploadModel"



class Scheme extends Component {
    state  ={
      newShow:false
    };
    params={
      pageindex:1
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
    handleFilterSubmit=(params)=>{ //查询
      params.pageindex=1;
      console.log(params,'params');
      if(params.doubledata){
        this.params.bdate=params.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
        this.params.edate=params.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
      }
      this.requestList();
    };
    requestList=()=>{
      axios.ajax({
        baseURL:window.g.cuiURL,
        method: 'get',
        // url:'/getproject',
        url: '/api/getProjectList',
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
      window.open(window.g.baseURL+filepath);
    }
    uploadOk=(params)=>{ //上传提交
      console.log('paramsparams',params)
      const _this=this;
      this.changeState('newShow',false);
      axios.ajax({
        baseURL:window.g.cuiURL,
        method: 'post',
        url: '/api/project',
        data: params
      }).then((res)=>{
        if(res.success){
          message.success('操作成功！')
          _this.requestList()
        }
      });
      //新增提交
      console.log(params)
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
        title: '文件名',
        dataIndex: 'title',
      },{
        title: '适用年限',
        dataIndex: 'begindate',
        render: (text,record) =>{
          return(<div>{text+'--'+record.enddate}</div>)
        }
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
      <div className="Scheme">
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
        <UploadModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
      </div>
    );
  }
}
export default Scheme;
