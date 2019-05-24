import React, { Component } from 'react';
import {Tabs,Button} from 'antd'
import axios from '../../axios'
import Etable from "../common/Etable"
import Utils from "../../utils/utils"
import BaseForm from "../common/BaseForm"
const TabPane = Tabs.TabPane;

const Url={
  simple:'/sensing',
  total:'/sensing'
}
class Aquifermanage extends Component {
  state  ={}
  totalform=[
        {
          type: 'monitoring', //监测点列表
          own:'1', //是否显示全部
        },
        {
          type: 'equipment', //监测点列表
          own:'1', //是否显示全部
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
  simpleform = [
        {
          type: 'monitoring', //监测点列表
          own:'1', //是否显示全部
        },
        {
          type: 'equipment', //监测点列表
          own:'1', //是否显示全部
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
      this.requestList('simple');
      this.requestList('total');
    }
    handleFilterSubmit=(type,params)=>{
      params.page=1;
      if(params.doubledata){
        params.bdate=this.params.doubledata[0]
        params.edate=this.params.doubledata[1]
      }
      this[type+'params']=params
      this.requestList(type);
    }
    requestList=(type)=>{
      axios.ajax({
        method: 'get',
        url: Url[type],
        data: this[type+'params']
      }).then((res)=>{
        if(res.success){
          this.setState({
              [type]:res.data,
              [type+'pag']:Utils.pagination(res,(current)=>{
                  this[type+'params'].page=current;
                  this.requestList(type);
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
        dataIndex: 'vals',
        render: (text,record) =>{
          return text.map(el=>{
            return el.name+','
          })
        }
      },{
        title: '结果',
        dataIndex: 'result',
        render: (text,record) =>{
          return text?'正常':<span className="redcolor">异常</span>
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
          return(<div className="tableoption"><span className="greencolor">预览</span><span className="bluecolor">下载</span></div>)
        }
      }]
    return (
      <div className="Aquifermanage">
        <Tabs type="card">
          <TabPane tab="水质简分析" key="simple">
            <div className="simple">
              <div className="selectForm">
                  <div className="leftForm">
                      <BaseForm formList={this.simpleform} filterSubmit={(params)=>this.handleFilterSubmit('simple',params)}/>
                  </div>
                  <div className="rightOpt">
                      <Button type="primary">新增</Button>
                  </div>
              </div>

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
              <div className="selectForm">
                <div className="leftForm">
                  <BaseForm formList={this.totalform} filterSubmit={(params)=>this.handleFilterSubmit('total',params)}/>
                </div>
                <div className="rightOpt">
                  <Button type="primary">新增</Button>
                </div>
              </div>
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
