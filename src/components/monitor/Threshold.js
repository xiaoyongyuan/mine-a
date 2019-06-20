import React, { Component } from 'react';
import Etable from "../common/Etable"
import BaseForm from "../common/BaseForm";
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
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        const _this=this;
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'post',
            url: '/threshold_net',
            data: params
        })
            .then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
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
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: '/api/monitorDeviceType',
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
    isstart = (states,code,netid,devicetype) =>{
        var that = this;
        console.log("states",states);
        if(states === 0){
            this.setState({
                title:"确认启用吗？"
            },()=>{
                confirm({
                    title: this.state.title,
                    okText: "确认",
                    okType: "danger",
                    cancelText: "取消",
                    onOk() {
                        axios.ajax({
                            baseURL:window.g.syshongURL,
                            method: 'put',
                            url: 'api/updateMonitorDeviceTypeStatus',
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
            })
        }else{
            this.setState({
                title:"确认禁用吗？"
            },()=>{
                confirm({
                    title: this.state.title,
                    okText: "确认",
                    okType: "danger",
                    cancelText: "取消",
                    onOk() {
                        axios.ajax({
                            baseURL:window.g.syshongURL,
                            method: 'put',
                            url: 'api/updateMonitorDeviceTypeStatus',
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
            })
        }
    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '监测网id',
            dataIndex: 'netid',
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
                        <span className="greencolor" onClick={()=>this.showModelEdit('newEditShow',true,record.code)} >编辑</span>
                        {
                            text === '0'?
                                <span className="redcolor" onClick={()=>this.isstart(1,record.code,record.netid,record.devicetype)}>禁用</span>:
                                <span className="greencolor" onClick={()=>this.isstart(0,record.code,record.netid,record.devicetype)}>应用</span>
                        }
                        <Link className="detmain" to={'/main/thresholddot?id='+record.netid}>
                            <span>查看点位阈值</span>
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
          <ThresholdEditModelModel type={this.state.type} code={this.state.code} newShow={this.state.newEditShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)}/>
      </div>
    );
  }
}

export default Threshold;
