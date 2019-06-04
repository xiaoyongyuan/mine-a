import React, { Component } from 'react';
import {Button, message, Modal, Radio,Tag } from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"



class Funds extends Component {
    state  ={
      newShow:false
    };
    params={
    	pageindex:1,
    	pagesize:10
    };
    formList={
        item:[
        {
          type: 'Radiobut',
          label: '类型',
          field:'fundtype',
          initialValue:'1',
          list:[{id:'0',text:'转入'},{id:'1',text:'转出'}]
        },{
          type: 'InputNumber',
          label: '金额',
          field:'money',
          rules: [{
               required: true, message: '请输入金额!',
          }],
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
          field: 'memo',
          placeholder: '',
          // initialValue: 'sss',
        },{
          type:'button',
          button:[
            {
              label:'确定',
              type:"primary",
              click:'layerSubmit',
            },
            {
              label:'取消',
              click:'reset',
              fafuns:'uploadreset',
            },
          ]
        }
      ]
    };
    componentDidMount(){
      this.requestList()
    }
    layerSubmit=(params)=>{ //提交
        console.log("params",params);
        this.changeState('newShow',false);
        axios.ajax({
            method: 'post',
            url: '/api/itemFund',
            data: params
        }).then((res)=>{
            const list=this.state.list;
            list.unshift(params);
            if(res.success){
                message.success('新增成功！', 3);
                this.setState({
                    list:list
                });
                this.requestList();
            }
        });
    };
    requestList=()=>{
      axios.ajax({
      	baseURL:'http://192.168.10.3:8003',
        method: 'get',
        url: '/api/itemFund',
        data: this.params
      }).then((res)=>{
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
    uploadOk=(params)=>{ //上传提交
      const _this=this;
      this.changeState('newShow',false);
      axios.ajax({
        method: 'get',
        url: 'funds',
        data: params
      }).then((res)=>{
        if(res.success){
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
        title: '余额',
        dataIndex: 'balance',
      },{
        title: '变动',
        dataIndex: 'fundtype',
        render: (text, record,index) => {
            return (
                text === "0" ?<span className="redcolor">+{record.money}</span >:<span className="greencolor">{-record.money}</span>
            )
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
        dataIndex: 'memo',
      }];
    return (
      <div className="Funds">
        <div className="selectForm">
          <div className="leftForm" />
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
          onCancel={()=>this.changeState('newShow',false)}
          footer={null}
        >
            <BaseForm formList={this.formList} filterSubmit={this.layerSubmit} uploadreset={()=>this.changeState('newShow',false)} />
        </Modal>
      </div>
    );
  }
}
export default Funds;