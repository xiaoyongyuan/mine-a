import React, { Component } from 'react';
import {Radio,Button,Typography,Modal } from 'antd'
import axios from '../../axios'
import Etable from "../common/Etable"
import UploadModel from "../common/UploadModel"
import Utils from "../../utils/utils"
import BaseForm from "../common/BaseForm"
import "./index.less"
const { Paragraph } = Typography;

class Pollutionmanage extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      memoswitch:false, //查看更多开关
      equipment:'1', //选择类型：水体1，土壤2
      newShow:false,
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
        baseURL:'https://www.easy-mock.com/mock/5ce208b85fa13b1e54d26e06/mainapi',
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
  uploadOk=(params)=>{ //上传提交
    this.changeState('newShow',false)
    console.log(params)
  }

  selectEquiptype=(e)=>{ //选择设备
    this.setState({equipment:e.target.value,page:1})
    this.requestList();
  }
  lookmore=(memo)=>{ //查看更多
    this.setState({
      memo,
      memoswitch:true
    })
  }
  changeState=(key,val)=>{
    this.setState({[key]:val})
  }
  handleNewopt=(params)=>{

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
        title: '说明',
        dataIndex: 'memo',
        width:250,
        render: (text,record) =>{
          if(text.length>50){
            return(
              <div className="textellip" style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                {text.substr(0,50)}...
                <span className="bluecolor" onClick={()=>this.lookmore(text)}>查看更多</span>
              </div>
              ) 
          }else{
            return text
          }
          
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
      <div className="Pollutionmanage">
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
        </div>
        <UploadModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
        <Modal
          title="说明"
          visible={this.state.memoswitch}
          onOk={()=>this.changeState('memoswitch',false)}
          onCancel={()=>this.changeState('memoswitch',false)}

        >
          <p>{this.state.memo}</p>
        </Modal>
      </div>
    );
  }
}

export default Pollutionmanage;
