import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import UploadModel from "../common/UploadModel"



class Scheme extends Component {
    state  ={
      newShow:false
    };
    params={
      pageindex:1,
      pagesize:3
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
      this.params.projectname=params.projectname;
      this.params.pageindex=1;
      this.requestList();
    };
    requestList=()=>{
      axios.ajax({
        baseURL:window.g.wangURL,
        method: 'get',
        url: '/api/getProjectAll',
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
      },(res)=>{
        //返回错误处理
        console.log(res,'返回错误处理')
      });
    };
   /* preview=(filepath)=>{ //预览文件
      window.open(window.g.baseURL+filepath);
    }*/
    uploadOk=(params)=>{ //上传提交
      const _this=this;

      this.changeState('newShow',false);
      axios.ajax({
        baseURL:window.g.wangURL,
        method: 'post',
        url: '/api/project',
        data: params
      }).then((res)=>{
        if(res.success){
          _this.params.projectname='';
          _this.params.pageindex=1;
          message.success('操作成功！');
          _this.requestList()
        }
      });
      //新增提交
    };
    changeState=(key,val)=>{
      this.setState({[key]:val})
    };
    render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        // title: '文件名',
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
          if(text==0) return(<div className='state-bg-not'>编制中</div>)
          else if(text==1) return(<div className='state-bg-implement'>执行中</div>)
          else return(<div className='state-bg-normal'>已完成</div>)
        }
      },{
        title: '上传人',
        dataIndex: 'uploader',
      },{
        title: '上传时间',
        dataIndex: 'createon',
      },{
        title: '备注',
        dataIndex: 'memo',
      },{
        title: '操作',
        key:'option',
        dataIndex: 'register',
        render: (text,record) =>{
          return(<div className="tableoption">
              <a className="greencolor" target="_blank"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}  onClick={()=>this.preview(record.filepath)}><Button type="primary">预览</Button></a>
              <form method='GET' action='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx'>
                  <a type='submit' href={window.g.filelook+record.filepath} className="bluecolor"><Button type="primary">下载</Button></a>
              </form>
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
        <UploadModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
      </div>
    );
  }
}
export default Scheme;
