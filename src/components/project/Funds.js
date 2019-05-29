import React, { Component } from 'react';
import {Button,Modal,Radio } from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"



class Funds extends Component {
    state  ={
      newShow:false
    }
    formList={
      item:[   
        {
          type: 'Radiobut',
          label: '类型',
          field:'type',
          initialValue:'1',
          list:[{id:'1',text:'转入'},{id:'0',text:'转出'}]
        },{
          type: 'InputNumber',
          label: '金额',
          field:'money',
        },{
          type: 'datePicker',
          label: '变更时间',
          field:'createin',
          placeholder:'请选择时间',
          showTime:false,
          format:'YYYY-MM-DD'
        },{
          type: 'INPUT',
          label: '说明',
          field: 'uname',
          placeholder: '',
          initialValue: 'sss',
        },{
          type:'button',
          button:[
            {
              label:'确定',
              type:"primary",
              click:'handleFilterSubmit',
            },
            {
              label:'取消',
              click:'reset',
              fafuns:'uploadreset',
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
        url: 'funds',
        data: this.params
      }).then((res)=>{
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
        url: 'funds',
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
        title: '余额',
        dataIndex: 'money',
      },{
        title: '变动',
        dataIndex: 'type',
        render: (text, record,index) => {
          return text?record.money:-record.money
        },
      },{
        title: '变动时间',
        dataIndex: 'createin',
      },{
        title: '记录人',
        dataIndex: 'cname',
      },{
        title: '记录时间',
        dataIndex: 'createon',
      },{
        title: '说明',
        dataIndex: 'intro',
      }]
    return (
      <div className="Funds">
        <div className="selectForm">
          <div className="leftForm"></div>
          <div className="rightOpt" style={{marginBottom:'10px'}}>
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
          <Modal
          title="新增"
          visible={this.state.newShow}
          onCancel={this.reset}
          footer={null}
        >
            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} uploadreset={()=>this.changeState('newShow',false)} />          
        </Modal>
      </div>
    );
  }
}

export default Funds;
