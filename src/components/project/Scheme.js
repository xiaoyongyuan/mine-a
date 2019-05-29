import React, { Component } from 'react';
import {Button} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import UploadModel from "../common/UploadModel"



class Scheme extends Component {
    state  ={
      newShow:false
    }
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
    }
  
    componentDidMount(){
      this.requestList()
    }
    handleFilterSubmit=(params)=>{ //查询
      params.page=1;
      console.log(params,'params')
      if(params.doubledata){
        this.params.bdate=params.doubledata[0]
        this.params.edate=params.doubledata[1]
      }
      this.params=params
      this.requestList();
    }
    requestList=()=>{
      axios.ajax({
        method: 'get',
        url: '/api/sensing',
        data: this.params
      })
      .then((res)=>{
        if(res.success){
          this.setState({
              list:res.data,
              pagination:Utils.pagination(res,(current)=>{
                  this.params.page=current;
                  this.requestList();
              })
          })
        }
      });
    }
    uploadOk=(params)=>{ //上传提交
      const _this=this;
      this.changeState('newShow',false)
      axios.ajax({
        method: 'get',
        url: 'sensing',
        data: params
      }).then((res)=>{
        if(res.success){
          _this.requestList()
        }
      })

      //新增提交
      console.log(params)
    }
    changeState=(key,val)=>{
      this.setState({[key]:val})
    }

    render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '文件名',
        dataIndex: 'filepath',
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
          return(<div className="tableoption"><span className="greencolor">预览</span><a download='椒图数据字典20190417' href="https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx" className="bluecolor">下载</a></div>)
        }
      }]
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
