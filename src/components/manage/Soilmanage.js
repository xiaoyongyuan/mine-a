import React, { Component } from 'react';
import {Radio,Button} from 'antd'
import axios from '../../axios'
import Etable from "../common/Etable"
import Utils from "../../utils/utils"
import BaseForm from "../common/BaseForm"
import "./index.less"

class Soilmanage extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
    };
    this.params = {
        page:1,   
    }
    this.equiptype = [];
    this.formList = [   
        {
          type: 'RANGPICKER',
          label: '日期',
          field:'doubledata',
          placeholder:'请选择日期',
          initialValue:'',
          showTime:false,
          format:'YYYY-MM'
        }
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

  render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '损毁面积',
        dataIndex: 'vals',
        render: (text,record) =>{
          return text.map(el=>{
            return el.name+','
          })
        }
      },{
        title: '复垦面积',
        dataIndex: 'result',
        render: (text,record) =>{
          return text?'正常':<span className="redcolor">异常</span>
        }
      },{
        title: '采集时间',
        dataIndex: 'createon',
      },{
        title: '上传人',
        dataIndex: 'uploader',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          return(<div className="tableoption"><span className="greencolor">预览</span><span className="bluecolor">下载</span></div>)
        }
      }]
    return (
      <div className="Soilmanage">
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

export default Soilmanage;
