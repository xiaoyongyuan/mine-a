import React, { Component } from "react";
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
const easyURL = window.g.easyURL;

class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      alarmtype: "",
      begintime: "",
      endtime: ""
    };
  }
  formList = {
    type: "inline",
    item: [
      {
        type: "SELECT",
        label: "预警类别",
        initialValue: 0,
        field: "alarmtype",
        list: [
          {
            code: 0,
            name: "全部"
          },
          {
            code: 1,
            name: "蓝色"
          },
          {
            code: 2,
            name: "橙色"
          },
          {
            code: 3,
            name: "黄色"
          },
          {
            code: 4,
            name: "红色"
          }
        ]
      },
      {
        type: "RANGPICKER",
        label: "筛选日期",
        field: "doubledata",
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
  columns = [
    {
      title: "编号",
      dataIndex: "code",
      align: "center"
    },
    {
      title: "IMEI",
      dataIndex: "cid",
      align: "center"
    },
    {
      title: "灾害名称",
      dataIndex: "name",
      align: "center"
    },
    {
      title: "报警时间",
      dataIndex: "data",
      align: "center"
    },
    {
      title: "报警原因",
      dataIndex: "rank",
      align: "center"
    }
  ];
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    axios
      .ajax({
        method: "get",
        url: easyURL + "/alarmlist",
        data: {
          id: this.props.cid,
          type: this.props.netid,
          alarmtype: this.state.alarmtype,
          createonbegin: this.state.begintime,
          createonend: this.state.endtime
        }
      })
      .then(res => {
        if (res.success) {
          this.setState(
            {
              datalist: res.data
            },
            () => {}
          );
        }
      });
  };
  handleFilterSubmit = data => {
    this.setState(
      {
        alarmtype: data.alarmtype,
        begintime:
          data.doubledata != null
            ? moment(data.doubledata[0]).format("YYYY-MM-DD HH:mm:ss")
            : null,
        endtime:
          data.doubledata != null
            ? moment(data.doubledata[1]).format("YYYY-MM-DD HH:mm:ss")
            : null
      },
      () => {
        this.getList();
      }
    );
  };
  render() {
    return (
      <div className="alarmInfo">
        <BaseForm
          formList={this.formList}
          filterSubmit={this.handleFilterSubmit}
        />

        <Table columns={this.columns} dataSource={this.state.datalist} />
      </div>
    );
  }
}
export default AlarmInfo;
