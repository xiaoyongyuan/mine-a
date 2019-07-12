import React, { Component } from "react";
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import Utils from "../../utils/utils";
const alarmlist= [
    {
      code:'1',
        cid:'235674',
        name:'一级水位预警',
        data:'2019-05-15 13:44:12',
        rank:'1',
    },
    {
        code:'2',
        cid:'235675',
        name:'二级降雨量预警',
        data:'2019-05-16 13:44:12',
        rank:'2',
    },
    {
        code:'3',
        cid:'235676',
        name:'一级降雨量预警',
        data:'2019-05-17 13:44:12',
        rank:'1',
    },
    {
        code:'4',
        cid:'334563',
        name:'三级损毁预警',
        data:'2019-05-18 13:44:12',
        rank:'2',
    },
    {
        code:'5',
        cid:'334563',
        name:'三级损毁预警',
        data:'2019-05-19 13:44:12',
        rank:'2',
    },
    {
        code:'6',
        cid:'334563',
        name:'三级损毁预警',
        data:'2019-05-20 21:11:12',
        rank:'2',
    },
    {
        code:'7',
        cid:'124332',
        name:'二级降雨量预警',
        data:'2019-05-21 13:44:12',
        rank:'3',
    },
];
class AlarmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      alarmtype: "",
      begintime: "",
      endtime: "",
      pagination: []
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
        baseURL:window.g.easyURL,
        method: "get",
        url:"/alarmlist",
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
              datalist: res.data,
              pagination: Utils.pagination(res, current => {
                this.params.pageindex=current;
                this.getList();
              })
            });
        }
      },()=>{});
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
        <Table
          columns={this.columns}
          dataSource={alarmlist}
          // pagination={this.state.pagination}
        />
      </div>
    );
  }
}
export default AlarmInfo;
