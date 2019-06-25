import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button,Modal,message} from "antd";
import ModalForm from './ModalForm.js';
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";

class Userinfo extends Component {
  constructor(props){
    super(props);
    this.state={
        visible:false,
        page: 1,
    };
      this.formList={
          type:'inline',
          item:[
              {
                  type: 'INPUT',
                  label: '工号',
                  field:'account',
                  placeholder:'',
              },{
                  type:'button',
                  button:[
                      {
                          label:'查询',
                          type:"primary",
                          click:'handleFilterSubmit',
                      },
                      {
                          label:'重置',
                          click:'reset',
                      },
                  ]
              }
          ]
      }
  };
    params={
        pageindex:1
    };
    showModal = (e) => { //新增弹窗
        e.preventDefault();
        this.setState({
            modeltitle:'新增',
            visible: true,
            type:0,
            codetype:'',
        });
    };
    showModelEdit = (code,record,index) =>{//编辑用户
        this.setState({
            modeltitle:'编辑',
            visible: true,
            codetype:code,
            indexi:index
        });
    };
    handleCreate = (e) => {//modal提交
        e.preventDefault();
        const forms=this.formRef.formref();
        forms.validateFields((err, values) => {
            if (!err) {
                const data={
                    account:values.account,
                    linktel:values.linktel,
                    realanme:values.realanme,
                };
                if(this.state.type === 0){
                    //新增');
                    console.log("新增");
                    axios.ajax({
                        method: 'post',
                        url: '/api/companyUser',
                        data: data
                    }).then((res)=>{
                        const list=this.state.list;
                        list.unshift(data);
                        if(res.success){
                            message.success('新增成功！', 3);
                            this.requestList();
                            this.setState({
                               list:list
                            });
                        }
                    });
                }else{
                    //编辑接口');
                    console.log("编辑");
                    data.code=this.state.codetype;
                    console.log("data",data);
                    axios.ajax({
                        method: 'put',
                        url: '/api/companyUser',
                        data: data
                    }).then((res)=>{
                        if(res.success){
                            message.success('编辑成功！', 3);
                            this.requestList();
                        }
                    });
                }
                this.setState({
                    visible: false
                });
                forms.resetFields() //清空
            }
        });
    };

    handleCancel = (e) => { //modal取消
        const forms=this.formRef.formref();
        e.preventDefault();
        this.setState({
            visible: false,
        });
        forms.resetFields();
    };
    componentDidMount(){
        this.requestList();
    };
    changePage = (page) => { //分页  页码改变的回调，参数是改变后的页码及每页条数
        console.log("page",page);
        this.setState({
            page: page,
        }, () => {
            this.requestList();
        })
    };
    requestList = ()=>{
        const quparams = {
            pagesize: 10,
            pageindex: this.params.pageindex,
            account:this.state.account,
        };
        axios.ajax({
            method: 'get',
            url: '/api/companyUser',
            data: quparams
        }).then((res)=>{
            if(res.success){
                this.setState({
                    list:res.data,
                    total: res.totalcount,
                    pagination:Utils.pagination(res,(current)=>{
                        console.log("current",current);
                        this.params.pageindex=current;
                        this.requestList();
                    })
                })
            }
        });
    };
    handleFilterSubmit=(params)=>{ //查询
        console.log("params",params);
        this.setState({
            account:params.account,
            pageindex:1
        }, () => {
            this.requestList();
        });
        // console.log("account",this.state.account);
        // this.params = params;
        // this.requestList();
    };
    showModaldelete = (code,index) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            index:index,
            code:code
        });
    };
    showModalreset = (code,index) => {//重置密码
        console.log("code",code);
        this.setState({
            resetshow: true,
            index:index,
            code:code
        });
    };
    resetCancel = () => {//重置取消
        this.setState({
            resetshow:false,
        });
    };
    resetOk = () => {//确认密码重置
        const data={
            code:this.state.code,
        };
        console.log("data",data);
        axios.ajax({
            method: 'post',
            url: '/api/resetPassword',
            data: data
        }).then((res)=>{
            if(res.success){
                this.setState({
                    resetshow:false,
                });
                message.success('密码重置成功！', 3);
            }
        });
    };
    deleteCancel = () =>{ //删除取消
        this.setState({
            deleteshow: false,
        });
    };
    deleteOk = () =>{//确认删除
        const data={
            ids:this.state.code,
        };
        const list=this.state.list;
        list.splice(this.state.index,1);
        console.log("data",data);
        axios.ajax({
            method: 'delete',
            url: '/api/companyUser',
            data: data
        }).then((res)=>{
            if(res.success){
                message.success('删除成功！', 3);
                this.setState({
                    list:list,
                    deleteshow: false,
                })
            }
        });
    };


    render() {
        const _this=this;
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '姓名',
            dataIndex: 'realanme',
        },{
            title: '电话',
            dataIndex: 'linktel',
        },{
            title: '工号',
            dataIndex: 'account',
        },{
            title: '职位',
            dataIndex: 'psition',
        },{
            title: '座机',
            dataIndex: 'phone',
        },{
            title: '邮箱',
            dataIndex: 'email',
        },{
            title: '操作',
            key:'option',
            dataIndex: 'code',
            columnWidth:'100px',
            render: (text,record,index) =>{
                return(<div className="tableoption"><span className="greencolor" onClick={() => _this.showModelEdit(text,record,index)}><Button type="primary">编辑</Button></span><span className="redcolor" onClick={()=>_this.showModaldelete(text,index)}><Button type="primary">删除</Button></span><span className="redcolor" onClick={()=>_this.showModalreset(text,index)}><Button type="primary">密码重置</Button></span></div>)
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
                      <Button type="primary" onClick={this.showModal}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
                  </div>
              </div>

              <Etable
                  ref="pageChange"
                  bordered
                  columns={columns}
                  dataSource={this.state.list}
                  pagination={this.state.pagination}
              />
              <Modal title={ this.state.modeltitle }
                     okText="确认"
                     cancelText="取消"
                     visible={this.state.visible}
                     onOk={this.handleCreate}
                     onCancel={this.handleCancel}
              >
                  <ModalForm visible={this.state.visible}
                             code={this.state.codetype}
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
              <Modal title="提示信息" visible={this.state.resetshow} onOk={this.resetOk}
                     width={370}
                     onCancel={this.resetCancel} okText="确认" cancelText="取消"
              >
                  <p>确认重置密码吗？</p>
              </Modal>
          </div>
      </div>
    );
  }
}

export default Userinfo;
