import React, { Component } from "react";
import { Tabs } from "antd";
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import Table from "../common/Etable";
import CurveChart from "./CurveChart";
import AlarmInfo from "./AlarmInfo";
import CheckReport from "./CheckReport.js";
import "../../style/jhy/css/dotdetails.less";
const easyURL = window.g.easyURL;

const { TabPane } = Tabs;
class Dotdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      begintime: "",
      endtime: ""
    };
  }
  formList = {
    type: "inline",
    item: [
      {
        type: "RANGPICKER",
        label: "双日期",
        field: "doubledata",
        // rules:,
        placeholder: "请选择日期",
        initialValue: ["2019-03-09 12:09:09", "2019-03-09 12:09:09"],
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
    this.getList();
  }
  getList = () => {
    const par = this.props.match.params[0];
    const rst = par.substring(par.indexOf("&&") + 2, par.lastIndexOf("&&"));
    const proid = par
      .substring(0, par.indexOf("&&"))
      .substring(par.substring(0, par.indexOf("&&")).indexOf(":") + 1);
    const type = rst.substring(rst.indexOf(":") + 1);
    const cid = par
      .substring(par.lastIndexOf("&&") + 2)
      .substring(par.substring(par.lastIndexOf("&&") + 2).indexOf(":") + 1);

    axios
      .ajax({
        method: "get",
        url: easyURL + "/monitordotdata",
        data: {
          id: cid,
          type: type,
          // proid: proid,
          createonbegin: this.state.begintime,
          createonend: this.state.endtime
        }
      })
      .then(res => {
        console.log(res);
        if (res.success) {
          this.setState({
            datalist: res.data
          });
        }
      });
  };
  getColumns = () => {
    const par = this.props.match.params[0];
    const rst = par.substring(par.indexOf("&&") + 2, par.lastIndexOf("&&"));
    const type = rst.substring(rst.indexOf(":") + 1);
    var columns;
    switch (type) {
      case "1":
        {
          columns = [
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
              title: "垂直位移",
              dataIndex: "y",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "水平差值",
              dataIndex: "xdiff",
              align: "center"
            },
            {
              title: "垂直差值",
              dataIndex: "ydiff",
              align: "center"
            }
          ];
        }
        break;
      case "2":
        {
          columns = [
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
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "裂缝差值",
              dataIndex: "xdiff",
              align: "center"
            }
          ];
        }
        break;

      case "3":
        {
          columns = [
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
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "沉降差值",
              dataIndex: "xdiff",
              align: "center"
            }
          ];
        }
        break;

      case "4":
        {
          columns = [
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
              align: "center"
            }
          ];
        }
        break;

      case "5":
        {
          columns = [
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
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "水压差值",
              dataIndex: "xdiff",
              align: "center"
            }
          ];
        }
        break;

      case "6":
        {
          columns = [
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
              title: "水位值",
              dataIndex: "x",
              align: "center"
            },
            {
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "水位差值",
              dataIndex: "ydiff",
              align: "center"
            }
          ];
        }
        break;

      case "7":
        {
          columns = [
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
              title: "统计时长",
              dataIndex: "",
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
            }
          ];
        }
        break;

      case "8":
        {
          columns = [
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
              title: "统计时长",
              dataIndex: "",
              align: "center"
            },
            {
              title: "雨量差值",
              dataIndex: "ydiff",
              align: "center"
            }
          ];
        }
        break;

      default:
        break;
    }
    return columns;
  };
  handleFilterSubmit = data => {
    console.log(data);
    this.setState(
      {
        begintime: data[0],
        endtime: data[1]
      },
      () => {
        this.getList();
      }
    );
  };
  render() {
    return (
      <div className="dotdetails">
        <div className="selectForm">
          <div className="leftForm">
            <BaseForm
              formList={this.formList}
              filterSubmit={this.handleFilterSubmit}
            />
          </div>
        </div>

        <Tabs type="card">
          <TabPane tab="数据列表" key="1">
            <Table
              columns={this.getColumns()}
              dataSource={this.state.datalist}
            />
          </TabPane>
          <TabPane tab="曲线图" key="2">
            <CurveChart />
          </TabPane>
          <TabPane tab="报警信息" key="3">
            <AlarmInfo />
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
