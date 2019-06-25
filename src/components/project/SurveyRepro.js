import React, { Component } from 'react';
import {Button,message} from 'antd'
import axios from '../../axios'
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable"
import ItemModel from "./itemModel"
import ofteraxios from '../../axios/ofter'
class SurveyRepro extends Component {
    state  ={
      newShow:false,
      okupdate:1,
    };
    formList={
      type:'inline',
        item:[   
          {
            type: 'SELECT',
            label: '所属项目',
            field: 'projectid',
            placeholder: '全部',
            initialValue: '',
            list: [{code:'',name:'所有项目'}],
            width:'250px'
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
    params={
      pageindex:1,
      itemtype:5,
    };
    
    componentWillMount(){
      ofteraxios.projectlist().then(res=>{ //项目列表
        if(res.success){
          var project=[{code:'',name:'所有项目'}]
          res.data.map(item=>project.push({code:item.code,name:item.projectname}) )
          this.formList.item[0].list=project;
        }
      })
    }

    componentDidMount(){
      this.requestList()
    }
    
    requestList=()=>{
      axios.ajax({
        method: 'get',
        url: '/bizservice/api/getItemfileList',
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
      });
    };
    /*preview=(filepath)=>{ //预览文件
      window.open('http://192.168.10.20:8004/sys/UploadFile/OfficeFile/1136541326366367744.docx')
    };*/
    handleFilterSubmit=(params)=>{ //查询
      this.params.projectid=params.projectid;
      this.requestList();
    };
    uploadOk=(params)=>{ //上传提交
      this.setState({newShow:false});
      params.itemtype=5;
      const _this=this;
      axios.ajax({
        method: 'post',
        url: '/bizservice/api/itemfile',
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
    render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        render: (text, record,index) => (index+1),
      },{
        title: '名称',
        dataIndex: 'itemtitle',
      },{
        title: '所属项目',
        dataIndex: 'projectname',
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
              <a className="greencolor" target="_blank"  href={"https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx"} onClick={()=>this.preview(record.filepath)}><Button type="primary">预览</Button></a>
          <form method='GET' action='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx'>
              <a type='submit' href={window.g.filelook+record.filepath} className="bluecolor"><Button type="primary">下载</Button></a>
          </form>
          </div>)
        }
      }];
    return (
      <div className="SurveyRepro">
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
        <ItemModel  newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
      </div>
    );
  }
}
export default SurveyRepro;
