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
      this.formList={
          type:'inline',
          item:[
              {
                  type: 'INPUT',
                  label: '姓名',
                  field:'name',
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
        console.log("父code",code);
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
                if(!this.state.type){
                    const data={
                        name:values.name,
                        tel:values.tel,
                        account:values.account,
                    }
                    console.log("datahhh",data);
                    axios.ajax({
                        method: 'post',
                        url: '/api/companyUser',
                        data: this.params
                    }).then((res)=>{
                        console.log("res",res);
                        if(res.success){
                            // message.success('新增成功')
                            // this.setState({
                            //     list:res.data,
                            //     pagination:Utils.pagination(res,(current)=>{
                            //         this.params.page=current;
                            //         this.requestList();
                            //     })
                            // })
                        }
                    });
                    // post({url:"/api/companyuser/add",data:data}, (res)=>{
                    //     if(res.success){
                    //         message.success('新增成功')
                    //         data.code=res.code;
                    //         const list=this.state.list;
                    //         list.unshift(data);
                    //         this.setState({
                    //             list:list,
                    //             visible: false,
                    //         })
                    //         forms.resetFields();
                    //         this.setState({
                    //             page:1,
                    //         },()=>{
                    //             this.requestdata();
                    //             this.props.form.setFieldsValue({
                    //                 "account":'',
                    //                 "realname":''
                    //             })
                    //         })
                    //     }
                    // })
                }else{
                    forms.resetFields()
                }

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
    requestList = ()=>{
        axios.ajax({
            method: 'get',
            url: '/api/companyUser',
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
    showModalreset = (code,index) => {//重置密码
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
    };
    deleteCancel = () =>{ //删除取消
        this.setState({
            deleteshow: false,
        });
    };
    deleteOk = (code,index) =>{//确认删除
        const data={
            code:this.state.code,
        };
        const list=this.state.list;
        list.splice(this.state.index,1);
        console.log("data",data);
        // post({url:"/api/userworker/update",data:data}, (res)=>{
        //     if(res.success){
        //         this.setState({
        //             list:list,
        //             deleteshow: false,
        //         })
        //     }
        // })
    };
    handleFilterSubmit=(params)=>{ //查询
        params.page=1;
        console.log("params",params);
        this.params = params;
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
            dataIndex: 'code',
            render: (text, record,index) => (text),
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
                return(<div className="tableoption"><span className="greencolor" onClick={() => _this.showModelEdit(text,record,index)}>编辑</span><span className="redcolor" onClick={()=>_this.showModaldelete(text,index)}>删除</span><span className="redcolor" onClick={()=>_this.showModalreset(text,index)}>密码重置</span></div>)
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
