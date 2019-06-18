import React, { Component } from 'react';
import Etable from "../common/Etable"
import BaseForm from "../common/BaseForm";
import {Button,message,Modal} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import {Link} from "react-router-dom";
import ThresholdModel from "./ThresholdModel.js"
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
        this.setState({[key]:val})
    };
    requestList=()=>{
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: '/api/monitorNet',
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
    isstart = (code) =>{
        console.log("code",code);
        if(code){
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
                            baseURL:window.g.easyURL,
                            method: 'put',
                            url: '/threshold_net',
                            data: code
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
                                // this.setState({
                                //     list:res.data,
                                //     pagination:Utils.pagination(res,(current)=>{
                                //         this.params.pageindex=current;
                                //         this.requestList();
                                //     })
                                // })
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
                            baseURL:window.g.easyURL,
                            method: 'put',
                            url: '/threshold_net',
                            data: code
                        }).then((res)=>{
                            if(res.success){
                                message.success('设置成功！');
                                // this.setState({
                                //     list:res.data,
                                //     pagination:Utils.pagination(res,(current)=>{
                                //         this.params.pageindex=current;
                                //         this.requestList();
                                //     })
                                // })
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
            title: '名称',
            dataIndex: 'netname',
        },{
            title: '设备类型',
            dataIndex: 'projectid',
        },{
            title: '生成时间',
            dataIndex: 'createon',
        },{
            title: '低阈值',
            dataIndex: 'minimum',
        },{
            title: '高阈值',
            dataIndex: 'maximum',
        },{
            title: '备注',
            dataIndex: 'memo',
        },{
            title: '状态',
            dataIndex: 'status',
            render:(text, record,index) =>{
                return(
                    <div>
                        {
                            text === 0?<span className="redcolor">未生效</span>:<span className="greencolor">已生效</span>
                        }
                    </div>
                )
            }
        },{
            title: '操作',
            key:'option',
            dataIndex: 'status',
            render: (text,record) =>{
                return(
                    <div className="tableoption">
                        {
                            text?
                                <span className="redcolor" onClick={()=>this.isstart(0)}>禁用</span>:
                                <span className="greencolor" onClick={()=>this.isstart(1)}>启用</span>
                        }
                        <Link className="detmain" to={'/main/thresholddot?id='+record.code+'&cid='+record.cid}>
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
                  <Button type="primary" onClick={()=>this.changeState('newShow',true)}>新增</Button>
              </div>
          </div>
          <Etable
              ref="pageChange"
              bordered
              columns={columns}
              dataSource={this.state.list}
              // pagination={this.state.pagination}
          />
          <ThresholdModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
      </div>
    );
  }
}

export default Threshold;
