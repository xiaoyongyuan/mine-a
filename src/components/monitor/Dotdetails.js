import React, { Component } from "react";
import { Tabs } from "antd";
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import CurveChart from "./CurveChart";
import AlarmInfo from "./AlarmInfo";
import CheckReport from "./CheckReport.js";
import Utils from "../../utils/utils";
import PageBreadcrumb from "../common/PageBreadcrumb";
import "../../style/jhy/css/dotdetails.less";




const { TabPane } = Tabs;
class Dotdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      begintime: "",
      endtime: "",
      netid: "",
      cid: "",
      deviceId: "",
      deviceType: "",
      // 表格数据
      realdatalist:[],
      // 当前页
      pageindex: 1,
      // 每页显示条数
      pagesize: 10,
      routes:[
        {path: '', breadcrumbName: '监测数据'},
        {path: '/main/dotequip', breadcrumbName: '点位设备'},
        {path: '', breadcrumbName: '预点位设备详情'},
      ]
    };
    this.params = {
      pageindex: 1,
      pagesize: 10
    };
  }

  formList = {
    type: "inline",
    item: [
      {
        type: "RANGPICKER",
        label: "筛选日期",
        field: "doubledata",
        placeholder: "请选择日期",
        showTime: true,
        format: "YYYY-MM-DD HH:mm:ss"
      },
      {
        type: "button",
        button: [
          {
            label: "查询",
            type: "primary",
            click: "handleFilterSubmit"
          }
        ]
      }
    ]
  };
  componentDidMount() {
    // echarts
    this.getEcharts();
    this.setState({
      deviceType: this.props.query.deviceType,
      deviceId: this.props.query.deviceId
    });
    this.getList();
  }
  getList = (beginDate="",endDate="") => {
    let newdata={
      pointid: this.props.query.deviceId,
      pageindex: this.state.pageindex,
      pagesize: this.state.pagesize,
      // pointid: "1161106183215452160"
    }
    if(beginDate!="",endDate!=""){
      newdata.beginDate=beginDate
      newdata.endDate=endDate
    }
    axios.ajax({
        method: "get",
        baseURL:window.g.sysURL,
        url: "/monitor/api/checkDataCurrency",
        data: newdata
      })
      .then(res => {
        if (res.success) {
          console.log(res);
          this.setState(
            {
              realdatalist: res.data,
              pagination: Utils.pagination(res, current => {
                this.state.pageindex = current;
                this.getList();
              }),
              xdata: res.data.createon,
              pageindex: res.page,
              pagesize: res.pagesize,
            },
            () => {
              var xdata = [];
              var levelvalue = [];
              var vertical = [];
              res.data.map(item => xdata.push(item.createon.substring(0, 10)));
              res.data.map(item => levelvalue.push(item.datainfo_x));
              res.data.map(item => vertical.push(item.datainfo_y));
              this.setState({
                xdata: xdata,
                levelvalue: levelvalue,
                vertical
              });

            }
          );
        }
      });
  };
  getEcharts(){
    const type = this.props.query.deviceType;
    console.log("typeid",type);
    axios.ajax({
      method: "get",
      baseURL:window.g.sysURL,
      url: "/monitor/api/findLineChartData",
      data: {
        pointid: this.props.query.deviceId,
      }
    }).then(res=>{
      console.log(res);
      if(res.success&&res.data.length>0){
        let createon=res.data[0].CREATEON.split(",");
        let datainfo=res.data[0].DATAINFO.split(",");
        let units=res.data[0].UNITS;

        this.setState({
          createon,
          datainfo,
          units
        });
      }
        

    })
  };

 

  getColumns = () => {
    const type = this.props.query.deviceType;

    var columns;
    switch (type) {
        case "rain01":
        {
          return columns = [
            {
              title: "编号",
              dataIndex: "code",
              align: "center"
            },
            {
              title: "数据时间",
              dataIndex: "createon",
              align: "center"
            },
            {
              title: "雨量值",
              dataIndex: "datainfo",
              align: "center"
            },
            {
              title: "雨量差值",
              dataIndex: "lastdata",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center",
              render: () => {
                return 1;
              }
            }
          ];
        }


        case "env01":
        {
          return columns = [
            {
              title: "编号",
              dataIndex: "code",
              align: "center"
            },
            {
              title: "数据时间",
              dataIndex: "createon",
              align: "center"
            },
            {
              title: "温度值",
              dataIndex: "datainfo",
              align: "center"
            },
            {
              title: "温度差值",
              dataIndex: "lastdata",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center",
              render: () => {
                return 1;
              }
            }
          ];
        }

        case "rope01":
        {
          return columns = [
            {
              title: "编号",
              dataIndex: "code",
              align: "center"
            },
            {
              title: "数据时间",
              dataIndex: "createon",
              align: "center"
            },
            {
              title: "裂缝值",
              dataIndex: "datainfo",
              align: "center"
            },
            {
              title: "裂缝差值",
              dataIndex: "lastdata",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center",
              render: () => {
                return 1;
              }
            }
          ];
        }

        case "ph01":
        {
          return columns = [
            {
              title: "编号",
              dataIndex: "code",
              align: "center"
            },
            {
              title: "数据时间",
              dataIndex: "createon",
              align: "center"
            },
            {
              title: "PH值",
              dataIndex: "datainfo",
              align: "center"
            },
            {
              title: "PH差值",
              dataIndex: "lastdata",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center",
              render: () => {
                return 1;
              }
            }
          ];
        }

      default:
        break;
//         sunctrl01 太阳能控制板
// ph01 PH值检测仪
// rope01 裂缝计
// rain01 雨量计
// env01 温湿度测量仪
    }
    return columns;
  };
  handleFilterSubmit = data => {
    
    console.log("数据列表查询",data);
    let createonbegin="";
    let createonend="";
    if(data.doubledata!=null && data.doubledata.length!=0){
        createonbegin=data.doubledata[0].format('YYYY-MM-DD HH:mm:ss');
        createonend=data.doubledata[1].format('YYYY-MM-DD HH:mm:ss');
    }

    this.setState(
      {
        begintime:createonbegin,
        endtime: createonend
      },
      () => {
        this.getList(this.state.begintime,this.state.endtime);
      }
    );
  };
  render() {
    return (
      <div className="dotdetails">
      <PageBreadcrumb routes={this.state.routes} />
        <Tabs type="card">
          <TabPane tab="数据列表" key="1">
            <BaseForm
              formList={this.formList}
              filterSubmit={this.handleFilterSubmit}
            />
            <Table
              columns={this.getColumns()}
              dataSource={this.state.realdatalist}
              pagination={this.state.pagination}
            />
          </TabPane>
          <TabPane tab="曲线图" key="2">
            <CurveChart
              typeid={this.props.query.deviceId}
              deviceType={this.props.query.deviceType}
              createon={this.state.createon}
              datainfo={this.state.datainfo}
              units={this.state.units}
            />
          </TabPane>
          <TabPane tab="报警信息" key="3">
            <AlarmInfo netid={this.state.netid} cid={this.state.cid} />
          </TabPane>
          {this.props.query.ifreport!=0?
          <TabPane tab="检测报告" key="4">
            <CheckReport devicecode={this.props.query.deviceId}/>
          </TabPane>
          :
          ""
          }
        </Tabs>
      </div>
    );
  }
}

export default Dotdetails;
