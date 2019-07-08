import React, { Component } from 'react';
import Etable from "../common/Etable"
import {Button,message,Modal} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import {Link} from "react-router-dom";
import ThresholdModel from "./ThresholdModel.js"
import ThresholdEditModelModel from "./ThresholdEditModel.js"
const confirm = Modal.confirm;
class Threshold extends Component {
  constructor(props){
      super(props);
      this.state={
          newShow:false
      };
  }
  componentDidMount() {
      this.requestList();
  }
    params={
      // companycode:'1'
        pageindex:1
    };
    uploadOk=(params)=>{ //新增提交
        this.setState({newShow:false});
        const _this=this;
        axios.ajax({
          baseURL:window.g.deviceURL,
          method: 'put',
          url: '/api/updateMonitorDeviceThreshold',
          data: params
      }).then((res)=>{
          if(res.success){
              message.success('操作成功！');
              _this.requestList();
          }
      },()=>{});


    };
    EditOk=(params)=>{ //新增提交
        this.setState({newEditShow:false});
        const _this=this;
        axios.ajax({
          baseURL:window.g.deviceURL,
          method: 'put',
          url: '/api/monitorDeviceType',
          data: params
      }).then((res)=>{
          if(res.success){
              message.success('操作成功！');
              _this.requestList();

          }
      },()=>{});


    };
    changeState=(key,val)=>{
        this.setState({
            [key]:val,
            type:0,
            newEditShow:false,
        });
    };
    showModelEdit = (key,val,code) =>{//编辑
        this.setState({
            [key]:val,
            code:code,
            type:1,
            newShow:false
        })
    };
    requestList=()=>{
        const _this=this;
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: '/api/monitorDeviceType',
            data: _this.params
        }).then((res)=>{
                if(res.success){
                    _this.setState({
                        list:res.data,
                        pagination:Utils.pagination(res,(current)=>{
                            _this.params.pageindex=current;
                            _this.requestList();
                        })
                    })
                }
            });
    };
    isstart = (states,code,netid,devicetype) =>{
        var that = this;
        if(states === 0){
            confirm({
                title: "确认启用吗？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    axios.ajax({
                        baseURL:window.g.deviceURL,
                        method: 'put',
                        url: '/api/updateMonitorDeviceTypeStatus',
                        data: {
                            states:states,
                            code:code,
                            netid:netid,
                            devicetype:devicetype
                        }
                    }).then((res)=>{
                        if(res.success){
                            message.success('启用成功！');
                            that.requestList();
                        }
                    });
                }
            });
        }else{
            confirm({
                title: "确认禁用吗？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    axios.ajax({
                        baseURL:window.g.deviceURL,
                        method: 'put',
                        url: '/api/updateMonitorDeviceTypeStatus',
                        data: {
                            states:states,
                            code:code,
                            netid:netid,
                            devicetype:devicetype
                        }
                    }).then((res)=>{
                        if(res.success){
                            message.success('禁用成功！');
                            that.requestList();
                        }
                    });
                }
            });
        }
    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '监测网',
            dataIndex: 'netname',
        },{
            title: '设备类型',
            dataIndex: 'dname',
        },{
            title: '生成时间',
            dataIndex: 'createon',
        },{
            title: '低阈值',
            dataIndex: 'minumum',
        },{
            title: '高阈值',
            dataIndex: 'maximum',
        },{
            title: '备注',
            dataIndex: 'memo',
        },{
            title: '状态',
            dataIndex: 'states',
            render:(text, record,index) =>{
                return(
                    <div>
                        {

                            text === '0'?<span className="state-bg-normal greencolor">已生效</span>:<span className="redcolor state-bg-not">未生效</span>
                        }
                    </div>
                )
            }
        },{
            title: '操作',
            key:'option',
            dataIndex: 'states',
            render: (text,record) =>{
                return(
                    <div className="tableoption">
                        <span className="greencolor" onClick={()=>this.showModelEdit('newEditShow',true,record.code)} ><Button type="primary">编辑</Button></span>
                        {
                            text === '0'?
                                <span className="redcolor" onClick={()=>this.isstart(1,record.code,record.netid,record.devicetype)}><Button type="danger" className="btn-abandoning">禁用</Button></span>:
                                <span className="greencolor" onClick={()=>this.isstart(0,record.code,record.netid,record.devicetype)}><Button type="primary">应用</Button></span>
                        }
                        <Link className="detmain" to={'/main/thresholddot?id='+record.netid}>
                            <span><Button type="primary">查看点位阈值</Button></span>
                        </Link>
                    </div>
                )
            }
        }];
    return (
      <div className="Threshold">
          <div className="selectForm">
              <div className="leftForm">
                  {/*<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>*/}
              </div>
              <div className="rightOpt">
                  <Button type="primary" onClick={()=>this.changeState('newShow',true)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
              </div>
          </div>
          <Etable
              ref="pageChange"
              bordered
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
          />
          <ThresholdModel type={this.state.type} code={this.state.code} newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
          <ThresholdEditModelModel type={this.state.type} code={this.state.code} newShow={this.state.newEditShow} filterSubmit={this.EditOk} uploadreset={()=>this.changeState('newShow',false)}/>
      </div>
    );
  }
}

export default Threshold;
