import React, { Component } from 'react';
import {Radio,Button} from 'antd'
import axios from '../../axios'
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
          label: '监测点',
          field: 'dot',
          placeholder: '请输入',
          initialValue: '',
        },
        {
          type: 'SELECT',
          label: '结果',
          field: 'order_status',
          placeholder: '全部',
          initialValue: '',
          list: [{code: '', name: '全部'}, {code: '1', name: '正常'}, {code: '2', name: '异常'}]
        },
    ]
  }
  componentDidMount(){
    this.requestList();
  }
  changePage=(page,pageSize)=>{
    this.setState({
      page
    })
  }
  requestList = ()=>{
    axios.ajax({
      method: 'get',
      url: '/sensing',
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
  handleFilterSubmit=(params)=>{ //查询
    this.params = params;
    this.params.page=1;
    this.requestList();
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
      <div className="Monitor">
        <Radio.Group value={this.state.equipment} buttonStyle="solid"  size="large" onChange={this.selectEquiptype}>
          <Radio.Button key='water' value='1'>水体数据</Radio.Button>
          <Radio.Button key='soild' value='2'>土壤数据</Radio.Button>
        </Radio.Group>
        <div className="equiplist">
          <div className="selectForm">
            <div className="leftForm"> 
              <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
            </div>
            <div className="rightOpt">
              <Button type="primary">新增</Button>
            </div>
          </div>
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
