import React, { Component } from "react";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";
import {Button, message} from "antd";
import ItemModel from "./checkReportModel"
class CheckReport extends Component {
    state = {
        newShow:false
    };
    params={
        pageindex:1,
        createonbegin:'',
        createonend:''
    };
    formList={
        type:'inline',
        item:[
            {
                type: 'RANGPICKER',
                label: '时间',
                field:'doubledata',
                placeholder:'请选择时间',
                showTime:true,
                format:'YYYY-MM-DD HH:mm:ss'
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
    requestList=()=>{
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'get',
            url: '/alarmlist',
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
    componentDidMount(){
        this.requestList()
    }
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    /*preview=(filepath)=>{ //预览文件
       window.open('http://192.168.10.20:8004/sys/UploadFile/OfficeFile/1136541326366367744.docx')
    };*/
    handleFilterSubmit=(params)=>{ //查询
        if(params.doubledata){
            this.params.createonbegin=params.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
            this.params.createonend=params.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
        }else {
            this.params.createonbegin = '';
            this.params.createonend = ''
        }
        this.requestList();
    };
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        params.itemtype=7;
        const _this=this;
        axios.ajax({
            method: 'post',
            url: '/bizservice/api/itemfile',
            data: params
        }).then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{
                    message.warn(res.msg)
                }
            });
    };
  render() {
      const columns=[{
          title: '序号',
          dataIndex: 'index',
          render: (text, record,index) => (index+1),
      },{
          title: '报告名称',
          dataIndex: 'itemtitle',
      },{
          title: '时间',
          dataIndex: 'data',
      },{
          title: '操作',
          key:'option',
          dataIndex: 'register',
          render: (text,record) =>{
              return(<div className="tableoption">
                  <a className="greencolor" target="_blank" rel="noopener noreferrer"  href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filelook+record.filepath}  onClick={()=>this.preview(record.filepath)}><Button type="primary">预览</Button></a>
                  <form method='GET' action='https://view.officeapps.live.com/op/view.aspx?src=api.aokecloud.cn/upload/椒图数据字典20190417.docx'>
                      <a type='submit' href={window.g.filelook+record.filepath} className="bluecolor"><Button type="primary">下载</Button></a>
                  </form>
              </div>)
          }
      }];
    return(
        <div className="CheckReport">
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
            <ItemModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
        </div>
    );
  }
}
export default CheckReport;
