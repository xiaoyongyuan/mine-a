import React, { Component } from "react";
import BaseForm from "../common/BaseForm"
import Etable from "../common/Etable";
import axios from "../../axios";
import Utils from "../../utils/utils";
import {Button, message} from "antd";
import ItemModel from "./checkReportModel"
// const reportlist=[
//     {
//         code:'1',
//         reportname:'水质检测报告',
//         time:'2019-05-15 13:15:17',
//     },
//     {
//         code:'2',
//         reportname:'水压检测报告',
//         time:'2019-05-16 13:15:17',
//     },
//     {
//         code:'3',
//         reportname:'地裂缝检测报告',
//         time:'2019-05-17 13:15:17',
//     },
//     {
//         code:'4',
//         reportname:'雨量检测报告',
//         time:'2019-05-18 13:15:17',
//     },
//     {
//         code:'5',
//         reportname:'土地检测报告',
//         time:'2019-05-19 13:15:17',
//     },
//     {
//         code:'6',
//         reportname:'压力检测报告',
//         time:'2019-05-20 13:15:17',
//     },
//     {
//         code:'7',
//         reportname:'压力检测报告',
//         time:'2019-05-21 13:15:17',
//     },
//     {
//         code:'8',
//         reportname:'地裂缝检测报告',
//         time:'2019-05-22 13:15:17',
//     },
//     {
//         code:'9',
//         reportname:'地裂缝检测报告',
//         time:'2019-05-23 13:15:17',
//     },
//     {
//         code:'10',
//         reportname:'地裂缝检测报告',
//         time:'2019-05-24 13:15:17',
//     },
//     {
//         code:'11',
//         reportname:'地裂缝检测报告',
//         time:'2019-05-25 13:15:17',
//     },
// ];
class CheckReport extends Component {
    state = {
        newShow:false,
        // 当前页
       pageindex: 1,
       // 每页显示条数
       pagesize: 10
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
    requestList=(beginDate="",endDate="")=>{
        // 点位id
        const devicecode = this.props.devicecode;
        let newdata={
            devicecode: devicecode,
            pageindex: this.state.pageindex,
            pagesize: this.state.pagesize,
        }
        if(beginDate!="",endDate!=""){
            newdata.beginDate=beginDate
            newdata.endDate=endDate
        }
        
        axios.ajax({
            method: "get",
            baseURL:window.g.sysURL,
            url: "/sys/api/deviceFile",
            data: newdata
          }).then(res=>{
            console.log("检测报告",res);
            if(res.success){
                this.setState({
                    list:res.data,
                    pageindex: res.page,
                    pagesize: res.pagesize,
                    pagination:Utils.pagination(res,(current)=>{
                        this.state.pageindex=current;
                        this.requestList();
                    })
                })
            }
          })
    };
    componentDidMount(){
        this.requestList()
    }
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    handleFilterSubmit=(params)=>{ //查询
        console.log("检测报告查询",params);
        let createonbegin="";
        let createonend="";
        if(params.doubledata!=null && params.doubledata.length!=0){
            createonbegin=params.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
            createonend=params.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
        }

        this.setState(
        {
            begintime:createonbegin,
            endtime: createonend
        },
        () => {
            this.requestList(this.state.begintime,this.state.endtime);
        }
        );
        // if(params.doubledata){
        //     this.params.createonbegin=params.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
        //     this.params.createonend=params.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
        // }else {
        //     this.params.createonbegin = '';
        //     this.params.createonend = ''
        // }
        // this.requestList(this.state.begintime,this.state.endtime);
    };
    uploadOk=(params)=>{ //上传提交
        console.log(params);
        this.setState({newShow:false});
        params.devicecode=this.props.devicecode;
        params.filetype=1
        const _this=this;
        axios.ajax({
            baseURL:window.g.sysURL,
            method: 'post',
            url: '/sys/api/deviceFile',
            data: params
        }).then((res)=>{
            if(res.success){
                _this.requestList();
            }else{
                message.warn(res.msg);
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
          dataIndex: 'filename',
      },{
          title: '时间',
          dataIndex: 'createon',
      },{
          title: '操作',
          key:'option',
          dataIndex: 'register',
          render: (text,record) =>{
              return(<div className="tableoption">
                  {/*<a className="greencolor" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+record.filepath}><Button type="primary">预览</Button></a>*/}
                {/*<a  href={window.g.filesURL+record.filepath} className="bluecolor"><Button type="primary">下载</Button></a>*/}
                  <a className="greencolor" target="_blank" rel="noopener noreferrer" href={"http://www.beidouenv.com/UploadFile/Office/1149502537314615296.pdf"}><Button type="primary">预览</Button></a>
                  <a  href={`http://192.168.10.15:8001/sys/api/pdf/download?oldFileName=${record.filename}&fileName=${record.fileurl}&delete=false`} className="bluecolor">
                    <Button type="primary" >下载</Button>
                  </a>
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
