import React, { Component } from "react";
import { Tabs } from "antd";
import Form from "../common/BaseForm";
import axios from "../../axios";
import Table from "../common/Etable";
import CurveChart from "./CurveChart";
import AlarmInfo from "./AlarmInfo";
import CheckReport from "./CheckReport.js";
import "../../style/jhy/css/dotdetails.less";
const easyURL = window.g.easyURL;

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
class Dotdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      begintime: "",
      endtime: ""
    };
    this.formList = [
      {
        type: "RANGPICKER",
        label: "双日期",
        field: "doubledata",
        placeholder: "请选择日期",
        initialValue: ["2019-03-09 12:09:09", "2019-03-09 12:09:09"],
        showTime: true,
        format: "YYYY-MM-DD HH:mm:ss"
      },
      {
        type: "button"
        // fafuns:
      }
    ];
  }

  componentDidMount() {
    const par = this.props.match.params[0].split("&&");
    console.log(par[1]);
    axios
      .ajax({
        method: "get",
        url: easyURL + "/monitordotdata",
        data: {
          id: par[2].cid,
          type: par[1].netid
          // cid: par[2].cid
          // createonbegin :
          // createonend
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
  }

  getColumns = () => {
    const par = this.props.match.params[0].split("&&");

    var columns = [];
    switch (par[1].netid) {
      case 1: {
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
        return columns;
      }

      case 2: {
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
        return columns;
      }

      case 3: {
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
        return columns;
      }

      case 4: {
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
        return columns;
      }

      case 5: {
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
        return columns;
      }

      case 6: {
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
        return columns;
      }

      case 7: {
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
        return columns;
      }

      case 8: {
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
        return columns;
      }

      default:
        break;
    }
  };

  render() {
    return (
      <div className="dotdetails">
        <Tabs type="card">
          <TabPane tab="数据列表" key="1">
            <Form formList={this.formList} />

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
