import React, { Component } from 'react';
import {Radio} from 'antd'
import Etable from "../common/Etable"
import Utils from "../../utils/utils"
import BaseForm from "../common/BaseForm"
import "./index.less"

class Monitor extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      equipment:'1'
    };
    this.params = {
        page:1,   
    }
    this.equiptype = [];
    this.formList = [
        {
          type: 'INPUT',
          label: '设备名称',
          field: 'uname',
          placeholder: '请输入名称',
          initialValue: '',
        },
        {
          type: 'monitoring', //监测点列表
        },
        {
          type: 'SELECT',
          label: '状态',
          field: 'order_status',
          placeholder: '全部',
          initialValue: '0',
          list: [{code: '0', name: '全部'}, {code: '1', name: '在线'}, {code: '3', name: '离线'}]
        },
        {
          type: 'INPUT',
          label: '品牌',
          field: 'brand',
          placeholder: '请输入名称',
          initialValue: '',
        },
    ]
    

  }
  componentDidMount(){
    this.equiptype=[{
      code:'1',
      name:'裂缝计'
    },{
      code:2,
      name:'水质监测计'
    },{
      code:'3',
      name:'CNSS'
    }] 
    this.requestList();
  }
  changePage=(page,pageSize)=>{
    this.setState({
      page
    })
  }
  requestList = ()=>{
    const data={
      success:1,
      data:[{
        code:1,
        name:'设备1',
        dot:'监测点一',
        location:'不知道在哪',
        lasttime:'2019-03-09 12:09:09',
        time:'2019-03-09 12:09:09',
        lastdata:'0.023',
        frequency:'1 hours',
        duration:'22',
        status:'1',
        brand:'克拉',
        frequency:'1',
        num:'10',
        register:0

      },{
        code:2,
        name:'设备1',
        dot:'监测点e二',
        location:'不知道在哪',
        lasttime:'2019-03-09 12:09:09',
        lastdata:'0.023',
        time:'2019-03-09 12:09:09',
        frequency:'1 hours',
        duration:'22',
        status:'1',
        brand:'克拉',
        frequency:'1',
        num:'10',
        register:1
      }],
      pageSize:10,
      page:this.params.page,
      total:30,
    }

    this.setState({
        list:data.data,
        pagination:Utils.pagination(data,(current)=>{
            this.params.page=current;
            this.requestList();
        })
    })
  }
  selectEquiptype=(e)=>{ //选择设备
    this.setState({equipment:e.target.value,page:1})
    this.requestList();
  }

  render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '设备编码',
        dataIndex: 'name',
      },{
        title: '所属监测点',
        dataIndex: 'dot',
      },{
        title: '安装位置',
        dataIndex: 'location',
      },{
        title: '安装时间',
        dataIndex: 'time',
      },{
        title: '状态',
        dataIndex: 'status',
        render: (text) =>{
            return text==='1'?'在线':'离线'
        }
      },{
        title: '品牌',
        dataIndex: 'brand',
      },{
        title: '采样频率',
        dataIndex: 'frequency',
      },{
        title: '通讯次数',
        dataIndex: 'num',
      },{
        title: '是否注册',
        dataIndex: 'register',
      },{
        title: '最后一次通讯时间',
        dataIndex: 'lasttime',
      },{
        title: '最后一次数据',
        dataIndex: 'lastdata',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          if(text){
            return(<div className="tableoption"><span className="bluecolor" onClick={(record)=>this.edit(record.code)}>编辑</span></div>)
          }else{
            return(<div className="tableoption"><span className="greencolor" onClick={(record)=>this.edit(record.code)}>注册</span><span className="bluecolor" onClick={(record)=>this.edit(record.code)}>编辑</span></div>)
          }
        }
      }]
    return (
      <div className="Monitor">
        <Radio.Group value={this.state.equipment} buttonStyle="solid"  size="large" onChange={this.selectEquiptype}>
          {this.equiptype.map(equip=>(<Radio.Button key={'equip'+equip.code} value={equip.code}>{equip.name}</Radio.Button>))}
        </Radio.Group>
        <div className="equiplist">
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
          <Etable
              ref="pageChange"
              bordered
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}

export default Monitor;
