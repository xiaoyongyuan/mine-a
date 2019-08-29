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
import "../../style/jhy/css/dotdetails.less";




const { TabPane } = Tabs;
// const realdatalist = [
//     {
//       code:'1',
//       datatime:'2019-05-15 12:13:11',
//         xwy:11,
//         xcz:2,
//         ywy:-1,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'2',
//         datatime:'2019-05-16 10:22:44',
//         xwy:7,
//         xcz:2,
//         ywy:-16,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'3',
//         datatime:'2019-05-17 13:13:55',
//         xwy:15,
//         xcz:2,
//         ywy:-3,
//         ycz:6,
//         tjsc:1
//     },
//     {
//         code:'4',
//         datatime:'2019-05-18 14:22:11',
//         xwy:13,
//         xcz:2,
//         ywy:-19,
//         ycz:6,
//         tjsc:3
//     },
//     {
//         code:'5',
//         datatime:'2019-05-19 14:22:11',
//         xwy:12,
//         xcz:2,
//         ywy:-13,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'6',
//         datatime:'2019-05-20 12:33:55',
//         xwy:13,
//         xcz:2,
//         ywy:-9,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'7',
//         datatime:'2019-05-21 20:22:11',
//         xwy:10,
//         xcz:2,
//         ywy:-8,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'8',
//         datatime:'2019-05-22 21:12:32',
//         xwy:22,
//         xcz:2,
//         ywy:-16,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'9',
//         datatime:'2019-05-23 21:12:32',
//         xwy:12,
//         xcz:2,
//         ywy:-13,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'10',
//         datatime:'2019-05-24 21:12:32',
//         xwy:12,
//         xcz:2,
//         ywy:-10,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'11',
//         datatime:'2019-05-25 10:24:21',
//         xwy:32,
//         xcz:2,
//         ywy:-12,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'12',
//         datatime:'2019-05-26 10:24:21',
//         xwy:15,
//         xcz:2,
//         ywy:-14,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'13',
//         datatime:'2019-05-27 10:24:21',
//         xwy:12,
//         xcz:2,
//         ywy:-19,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'14',
//         datatime:'2019-05-28 10:24:21',
//         xwy:12,
//         xcz:2,
//         ywy:-12,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'15',
//         datatime:'2019-05-29 12:13:11',
//         xwy:11,
//         xcz:2,
//         ywy:-3,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'16',
//         datatime:'2019-05-30 10:22:44',
//         xwy:7,
//         xcz:2,
//         ywy:-5,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'17',
//         datatime:'2019-05-31 13:13:55',
//         xwy:15,
//         xcz:2,
//         ywy:-19,
//         ycz:6,
//         tjsc:1
//     },
//     {
//         code:'18',
//         datatime:'2019-06-01 14:22:11',
//         xwy:13,
//         xcz:2,
//         ywy:-15,
//         ycz:6,
//         tjsc:3
//     },
//     {
//         code:'19',
//         datatime:'2019-06-02 14:22:11',
//         xwy:12,
//         xcz:2,
//         ywy:-10,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'20',
//         datatime:'2019-06-03 12:33:55',
//         xwy:13,
//         xcz:2,
//         ywy:-19,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'21',
//         datatime:'2019-06-04 20:22:11',
//         xwy:10,
//         xcz:2,
//         ywy:-13,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'22',
//         datatime:'2019-06-05 21:12:32',
//         xwy:22,
//         xcz:2,
//         ywy:-15,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'23',
//         datatime:'2019-06-06 21:12:32',
//         xwy:12,
//         xcz:2,
//         ywy:-11,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'24',
//         datatime:'2019-06-07 10:24:21',
//         xwy:12,
//         xcz:2,
//         ywy:-20,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'25',
//         datatime:'2019-06-08 10:24:21',
//         xwy:32,
//         xcz:2,
//         ywy:-10,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'26',
//         datatime:'2019-06-09 10:24:21',
//         xwy:45,
//         xcz:2,
//         ywy:-18,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'27',
//         datatime:'2019-06-10 10:24:21',
//         xwy:12,
//         xcz:2,
//         ywy:-22,
//         ycz:6,
//         tjsc:2
//     },
//     {
//         code:'28',
//         datatime:'2019-06-11 21:12:32',
//         xwy:21,
//         xcz:2,
//         ywy:-10,
//         ycz:6,
//         tjsc:2
//     },
// ];
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
      pagesize: 10
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
    switch (type) {
      case "1" :
        console.log("typeid",type);
        axios.ajax({
          method: "get",
          baseURL:window.g.sysURL,
          url: "/monitor/api/findLineChartData",
          data: {
            pointid: this.props.query.deviceId,
            // pointid: "1161106204249886720"
          }
        }).then(res=>{
          if(res.success){
            let daydata1=res.data[0].CREATEON.split(",")
            let x_data=res.data[0].DATAINFO_X.split(",")
            let y_data=res.data[0].DATAINFO_Y.split(",")
            this.setState({
              daydata1: daydata1,
              x_data: x_data,
              y_data:y_data
            });
          }
            

        })
      default:
        break;
    }
  };

 

  getColumns = () => {
    const type = this.props.query.deviceType;

    var columns;
    switch (type) {
      case "1" :
        {
         return  columns = [
            {
              title: '序号',
              dataIndex: 'index',
              render: (text, record,index) => (index+1),
            },
            {
              title: "数据时间",
              dataIndex: "updateon",
              align: "center"
            },
            {
              title: "水平位移",
              dataIndex: "datainfo_x",
              align: "center"
            },
            {
              title: "水平差值",
              dataIndex: "lastdata_x",
              align: "center"
            },
            {
              title: "垂直位移",
              dataIndex: "datainfo_y",
              align: "center"
            },
            {
              title: "垂直差值",
              dataIndex: "lastdata_y",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "createon",
              align: "center"
            }
          ];
        }
        
      case "2":
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
              dataIndex: "x",
              align: "center"
            },
            {
              title: "裂缝差值",
              dataIndex: "xdiff",
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
        

      case "3":
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
              title: "沉降值",
              dataIndex: "x",
              align: "center"
            },
            {
              title: "沉降差值",
              dataIndex: "xdiff",
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
        

      case "4":
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
              title: "土地损毁",
              dataIndex: "vals",
              align: "center"
            },
            {
              title: "土地复垦",
              dataIndex: "valsdiff",
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
        

      case "5":
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
              title: "水压值",
              dataIndex: "x",
              align: "center"
            },
            {
              title: "水压差值",
              dataIndex: "xdiff",
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
        

      case "6":
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
              title: "水位差值",
              dataIndex: "ydiff",
              align: "center"
            },
            {
              title: "水位值",
              dataIndex: "x",
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
        

      case "7":
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
              title: "水分率",
              dataIndex: "x",
              align: "center"
            },
            {
              title: "水平差值",
              dataIndex: "xdiff",
              align: "center"
            },

            {
              title: "水分率差值",
              dataIndex: "ydiff",
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
        

      case "8":
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
              dataIndex: "x",
              align: "center"
            },
            {
              title: "雨量差值",
              dataIndex: "ydiff",
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
              xdata={this.state.daydata1}
              levelvalue={this.state.x_data}
              vertical={this.state.y_data}
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
