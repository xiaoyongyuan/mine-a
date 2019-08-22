import React, { Component,Fragment } from 'react';
import {Button, message, Modal} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import UploadModel from "../common/UploadModel"

const confirm = Modal.confirm;
class Scheme extends Component {
    state  ={
      newShow:false
    };
    params={
      pageindex:1,
    };
    formList={
      type:'inline',
      item:[   
        {
          type: 'INPUT',
          label: '项目名称',
          field:'projectname',
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
    };
    
    componentDidMount(){
      this.requestList()
    }
    handleFilterSubmit=(params)=>{ //查询
        console.log('hhhhhh',params);
      this.params=params;
      this.params.pageindex=1;
      this.requestList();
    };
    requestList=()=>{
      axios.ajax({
        baseURL:window.g.bizserviceURL,
        method: 'get',
        url: '/api/getProjectList',
        data: this.params
      })
      .then((res)=>{
        if(res.success){
          this.setState({
              list:res.data,
              pagination:Utils.pagination(res,(current)=>{
                  this.params.pageindex=current;
                  this.requestList();
              })
          })
        }
      },(res)=>{});
    };
    uploadOk=(params)=>{ //上传提交
      const _this=this;
      if(_this.state.type===0){
          axios.ajax({
              baseURL:window.g.bizserviceURL,
              method: 'post',
              url: '/api/project',
              data: params
          }).then((res)=>{
              if(res.success){
                  _this.params.projectname='';
                  _this.params.pageindex=1;
                  message.success('新增成功！');
                  _this.requestList()
              }
          });
      }else {

          params.code=this.state.codetype;
          console.log("hhhh", params.code);
          axios.ajax({
              baseURL:window.g.bizserviceURL,
              method: 'put',
              url: '/api/project',
              data: params
          }).then((res)=>{
              if(res.success){
                  _this.params.projectname='';
                  _this.params.pageindex=1;
                  message.success('编辑成功！');
                  _this.requestList()
              }
          });
      }

        // this.changeState('newShow',false,'','type',1);
    };
    changeState=(key,val,record,type,typecode)=>{
      this.setState(
          {
              [key]:val,
              codetype:record.code,
              [type]:typecode,
          }
      )
    };
    isstart = (record,states) =>{
        var that = this;
        const code = record.code;
        if(states === 1){
            confirm({
                title: "确认启动该项目吗？",
                okText: "确认",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    axios.ajax({
                        baseURL:window.g.bizserviceURL,
                        method: 'put',
                        url: '/api/project',
                        data: {
                            states:states,
                            code:code,
                        }
                    }).then((res)=>{
                        if(res.success){
                            message.success('项目启动成功！');
                            that.requestList();
                        }
                    });
                }
            });
        }
    };
    download = (record) =>{
        /*if(record.filepath.lastIndexOf(".pdf") === -1){
            window.location.href = window.g.filesURL+record.filepath;
        }else{

        }*/
        window.location.href = window.g.fileURL+"/api/pdf/download?fileName=" + record.filepath + "&delete=" + false + "&access_token=" +localStorage.getItem("token") + "&oldFileName=" +record.oldfilename;
    };
    showModaldelete = (record,index) =>{ //删除弹层
        this.setState({
            deleteshow: true,
            index:index,
            code:record.code
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
        console.log(this.state.code);
        const list=this.state.list;
        console.log(this.state.list);
        list.splice(this.state.index,1);
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: 'delete',
            url: '/api/project',
            data: data
        }).then((res)=>{
            if(res.success){
                message.success('删除成功！');
                this.setState({
                    list:list,
                    deleteshow: false,
                })
            }
        },(res)=>{});
    };
    render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '项目名称',
        dataIndex: 'projectname',
      },{
        title: '适用年限',
        dataIndex: 'begindate',
        render: (text,record) =>{
          return(<div>{text+' ~~ '+record.enddate}</div>)
        }
      },{
        title: '状态',
        dataIndex: 'states',
        render: (text) =>{
          if(text==='0') return(<div className='state-bg-not'>编制中</div>);
          else if(text==='1') return(<div className='state-bg-implement'>执行中</div>);
          else return(<div className='state-bg-normal'>已完成</div>)
        }
      },{
        title: '上传人',
        dataIndex: 'updateby',
      },{
        title: '上传时间',
        dataIndex: 'updateon',
      },{
        title: '备注',
        dataIndex: 'memo',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record,index) =>{
          return(
          <div className="tableoption">
            <Button type="primary" onClick={()=>this.download(record)}>下载</Button>
            {
                  record.states == '0'?
                    <Fragment>
                      <Button type="primary" onClick={()=>this.isstart(record,1)}>启动</Button>
                      <Button type="primary" onClick={()=>this.changeState('newShow',true,record,'type',1)}>编辑</Button>
                      <Button type="primary" onClick={()=>this.showModaldelete(record,index)}>删除</Button>
                    </Fragment>
                    :
                    ''
              }
            {
                  record.filepath&&record.filepath.lastIndexOf(".pdf") === -1?
                      <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>:
                      <a className="greencolor" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>

              }
          </div>)
        }
      }];
    return (
      <div className="Scheme">
        <div className="selectForm">
          <div className="leftForm"> 
            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
          </div>
          <div className="rightOpt">
            <Button type="primary" onClick={()=>this.changeState('newShow',true,'','type',0)}><span className="actionfont action-xinzeng"/>&nbsp;&nbsp;新增</Button>
          </div>
        </div>
        <Etable
              ref="pageChange"
              bordered
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
          />
        <UploadModel code={this.state.codetype} newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false,'','type',1)} />
          <Modal title="提示信息" visible={this.state.deleteshow} onOk={this.deleteOk}
                 width={370}
                 onCancel={this.deleteCancel} okText="确认" cancelText="取消"
          >
              <p>确认删除吗？</p>
          </Modal>
      </div>
    );
  }
}
export default Scheme;
