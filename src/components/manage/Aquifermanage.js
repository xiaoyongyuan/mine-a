import React, { Component } from 'react';
import {Tabs} from 'antd'
import axios from '../../axios'
import Etable from "../common/Etable"
import Utils from "../../utils/utils"
import BaseForm from "../common/BaseForm"
const TabPane = Tabs.TabPane;


class Aquifermanage extends Component {
  state  ={}
  formList = [
        {
          type: 'monitoring', //监测点列表
          own:'1',
        },
        {
          type: 'RANGPICKER',
          label: '时间',
          field:'doubledata',
          placeholder:'请选择时间',
          // initialValue:['2019-03-09 12:09:09','2019-03-09 12:09:09'],
          showTime:true,
          format:'YYYY-MM-DD HH:mm:ss'
        }

    ]
    componentDidMount(){
      this.requestList();
    }
    handleFilterSubmit=(params)=>{
      console.log('params',params)
      this.params = params;
      this.params.page=1;
      if(this.params.doubledata){
        this.params.bdate=this.params.doubledata[0]
        this.params.edate=this.params.doubledata[1]
      }
      this.requestList();
    }
    requestList=()=>{
      axios.ajax({
        method: 'get',
        url: '/sensing',
        data: this.params
      }).then((res)=>{
        if(res.success){
          this.setState({
              simple:res.data,
              simplepag:Utils.pagination(res,(current)=>{
                  this.params.page=current;
                  this.requestList();
              })
          })
        }
      });
    }

    render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '监测点',
        dataIndex: 'name',
      },{
        title: '上传人',
        dataIndex: 'time',
      },{
        title: '上传时间',
        dataIndex: 'status',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          return(<div className="tableoption"><span className="greencolor" onClick={(record)=>this.edit(record.code)}>操作</span><span className="bluecolor" onClick={(record)=>this.edit(record.code)}>下载</span></div>)
        }
      }]
    return (
      <div className="Aquifermanage">
        <Tabs type="card">
          <TabPane tab="水质简分析" key="simple">
            <div className="simple">
              <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
              <Etable
                  ref="pageChange"
                  bordered
                  columns={columns}
                  dataSource={this.state.simple}
                  pagination={this.state.simplepag}
              />
            </div>
          </TabPane>
          <TabPane tab="水质全分析" key="total">
            <div className="total">
              <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
              <Etable
                  ref="pageChange"
                  bordered
                  columns={columns}
                  dataSource={this.state.total}
                  pagination={this.state.totalpag}
              />
            </div>
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default Aquifermanage;
