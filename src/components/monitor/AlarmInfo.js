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
        initialValue: "蓝色",
        field: "alarmtype",
        list: [
          {
            code: "1",
            name: "蓝色"
          },
          {
            code: "2",
            name: "橙色"
          },
          {
            code: "3",
            name: "黄色"
          },
          {
            code: "4",
            name: "红色"
          }
        ]
      },
      {
        type: "datePicker",
        label: "开始日期-",
        field: "begintime",
        placeholder: "请选择日期",
        initialValue: ["2018-05-29"],
        showTime: true,
        format: "YYYY-MM-DD HH:mm:ss"
      },
      {
        type: "datePicker",
        label: "-结束日期",
        field: "endtime",
        placeholder: "请选择日期",
        initialValue: ["22018-05-29"],
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
      dataIndex: "code",
      align: "center"
    },
    {
      title: "灾害名称",
      dataIndex: "code",
      align: "center"
    },
    {
      title: "报警时间",
      dataIndex: "code",
      align: "center"
    },
    {
      title: "报警原因",
      dataIndex: "code",
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
            () => {
              console.log(this.state.datalist);
            }
          );
        }
      });
  };
  handleFilterSubmit = data => {
    console.log(data);
    this.setState(
      {
        alarmtype: data.alarmtype,
        begintime: moment(data.begintime).format("YYYY-MM-DD HH:mm:ss"),
        endtime: moment(data.endtime).format("YYYY-MM-DD HH:mm:ss")
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
