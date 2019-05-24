import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button,Modal} from "antd";
import ModalForm from './ModalForm.js';
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";

class Userinfo extends Component {
  constructor(props){
    super(props);
    this.state={
        visible:false,
    };
      this.formList = [
          {
              type: 'INPUT',
              label: '姓名',
              field: 'brand',
              placeholder: '请输入名称',
              initialValue: '',
          },
      ]
  };
    showModal = (e) => { //新增弹窗
        e.preventDefault();
        this.setState({
            modeltitle:'新增',
            visible: true,
            type:0,
        });
    };
    showModelEdit = (e) =>{
        this.setState({
            modeltitle:'编辑',
            visible: true,
            type:0,
        });
    };
    handleCancel = (e) => { //modal取消
        // const forms=this.formRef.formref();
        e.preventDefault();
        this.setState({
            visible: false,
        });
        // forms.resetFields();
    };
    componentDidMount(){
        this.requestList();
    };
    requestList = ()=>{
        axios.ajax({
            method: 'get',
            url: '/user',
            data: this.params
        }).then((res)=>{
            console.log("res",res);
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


    };
    showModaldelete = (code,index) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            index:index,
            code:code
        });
    };
    deleteCancel = () =>{ //删除取消
        this.setState({
            deleteshow: false,
        });
    };
    handleFilterSubmit=(params)=>{ //查询
        this.params = params;
        this.params.page=1;

        this.requestList();
    };

    render() {
        const _this=this;
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '姓名',
            dataIndex: 'username',
        },{
            title: '电话',
            dataIndex: 'phone',
        },{
            title: '工号',
            dataIndex: 'uploader',
        },{
            title: '职位',
            dataIndex: 'createon',
        },{
            title: '座机',
            dataIndex: 'createon',
        },{
            title: '邮箱',
            dataIndex: 'createon',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'register',
            columnWidth:'100px',
            render: (text,record,index) =>{
                return(<div className="tableoption"><span className="greencolor" onClick={this.showModelEdit}>编辑</span><span className="redcolor" onClick={()=>_this.showModaldelete(text,index)}>删除</span><span className="redcolor">密码重置</span></div>)
            }
        }];
    return (
      <div className="Userinfo">
          <div className="simple">
              <div className="selectForm">
                  <div className="leftForm">
                      <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                  </div>
                  <div className="rightOpt">
                      <Button type="primary" onClick={this.showModal}>新增</Button>
                  </div>
              </div>

              <Etable
                  ref="pageChange"
                  bordered
                  columns={columns}
                  dataSource={this.state.list}
                  // pagination={this.state.simplepag}
              />
              <Modal title={ this.state.modeltitle }
                     okText="确认"
                     cancelText="取消"
                     visible={this.state.visible}
                     onOk={this.handleCreate}
                     onCancel={this.handleCancel}
              >
                  <ModalForm visible={this.state.visible}
                             code={this.state.type}
                             index={this.state.index}
                             wrappedComponentRef={(form) => this.formRef = form}
                  />
              </Modal>
              <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                     width={370}
                     onCancel={this.deleteCancel} okText="确认" cancelText="取消"
              >
                  <p>确认删除吗？</p>
              </Modal>
          </div>
      </div>
    );
  }
}

export default Userinfo;
