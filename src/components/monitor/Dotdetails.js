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
const easyURL = window.g.easyURL;
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
      pagination: []
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
    this.setState({
      deviceType: this.props.query.deviceType,
      deviceId: this.props.query.deviceId
    });
    this.getList();
  }
  getList = () => {
    axios
      .ajax({
        method: "get",
        // url: "http://192.168.10.11:8001/bizservice/api/monitorDataTransfer",
        url: easyURL + "/monitordotdata",
        data: {
          id: this.props.query.deviceId,
          type: this.props.query.deviceType
        }
      })
      .then(res => {
        if (res.success) {
          this.setState(
            {
              datalist: res.data,
              pagination: Utils.pagination(res, current => {
                this.params.pageindex = current;
                this.getList();
              }),
              xdata: res.data.createon
            },
            () => {
              var xdata = [];
              var levelvalue = [];
              var vertical = [];
              res.data.map(item => xdata.push(item.createon.substring(0, 10)));
              res.data.map(item => levelvalue.push(item.x));
              res.data.map(item => vertical.push(item.y));
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
  getColumns = () => {
    const type = this.props.query.deviceType;

    var columns;
    switch (type) {
      case "1":
        {
         return  columns = [
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
              title: "水平位移",
              dataIndex: "x",
              align: "center"
            },
            {
              title: "水平差值",
              dataIndex: "xdiff",
              align: "center"
            },
            {
              title: "垂直位移",
              dataIndex: "y",
              align: "center"
            },
            {
              title: "垂直差值",
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
    this.setState(
      {
        begintime: moment(data.doubledata[0]).format("YYYY-MM-DD HH:mm:ss"),
        endtime: moment(data.doubledata[1]).format("YYYY-MM-DD HH:mm:ss")
      },
      () => {
        this.getList();
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
              dataSource={this.state.datalist}
              pagination={this.state.pagination}
            />
          </TabPane>
          <TabPane tab="曲线图" key="2">
            <CurveChart
              typeid={this.props.query.deviceId}
              xdata={this.state.xdata}
              levelvalue={this.state.levelvalue}
              vertical={this.state.vertical}
            />
          </TabPane>
          <TabPane tab="报警信息" key="3">
            <AlarmInfo netid={this.state.netid} cid={this.state.cid} />
          </TabPane>
          <TabPane tab="检测报告" key="4">
            <CheckReport />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dotdetails;
