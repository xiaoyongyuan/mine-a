import React, { Component } from "react";
import { Row, Col, Radio, Button } from "antd";
import axios from "../../axios";

import Table from "../common/Etable";
import Form from "../common/BaseForm";
import "../../style/jhy/css/dotequip.less";

const easyURL = window.g.easyURL;
const monitorNetType = [
  { label: "形变监测网", value: "1" },
  { label: "地裂缝监测网", value: "2" },
  { label: "雨量监测网", value: "3" },
  { label: "土壤环境监测网", value: "4" },
  { label: "沉降监测网", value: "5" },
  { label: "地下水监测网", value: "6" },
  { label: "地表水监测网", value: "7" },
  { label: "土地损毁与复垦监测网", value: "8" }
];
class Dotequip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      projSelected: "",
      monintSelected: "",
      tableData: []
    };
    this.columns = [
      {
        title: "点位名称",
        dataIndex: "name",
        align: "center"
      },
      {
        title: "设备id",
        dataIndex: "cid",
        align: "center"
      },
      {
        title: "安装时间",
        dataIndex: "createon",
        align: "center"
      },
      {
        title: "创建时间",
        dataIndex: "data",
        align: "center"
      },
      {
        title: "设备类型",
        dataIndex: "type",
        align: "center"
      },
      {
        title: "坐标X",
        dataIndex: "x",
        align: "center"
      },
      {
        title: "坐标Y",
        dataIndex: "y",
        align: "center"
      },
      {
        title: "坐标Z",
        dataIndex: "z",
        align: "center"
      },
      {
        title: "状态",
        dataIndex: "state",
        render: text => {
          switch (text) {
            case 0:
              {
                return <div>未启用</div>;
              }
              break;
            case 1:
              {
                return <div>启用</div>;
              }
              break;
            case 2:
              {
                return <div>弃用</div>;
              }
              break;
          }
        },
        align: "center"
      },
      {
        title: "操作",
        key: "option",
        dataIndex: "state",
        render: (text, record, index) => {
          switch (text) {
            case 0:
              {
                return <Button type="primary">绑定</Button>;
              }
              break;
            case 1:
              {
                return (
                  <div>
                    <Button type="primary">查看</Button>
                    <Button type="primary" style={{ marginLeft: "5px" }}>
                      弃用
                    </Button>
                  </div>
                );
              }
              break;
            case 2:
              {
                return (
                  <div>
                    <Button type="primary">查看</Button>
                    <Button type="primary" style={{ marginLeft: "5px" }}>
                      启用
                    </Button>
                  </div>
                );
              }
              break;

            default:
              {
              }
              break;
          }
        }
      }
    ];
  }

  componentDidMount() {
    this.getProjectList();
    console.log(this.state.projectList);
  }
  getProjectList = () => {
    axios
      .ajax({
        method: "get",
        url: easyURL + "/getproject"
      })
      .then(res => {
        if (res.success) {
          var plist = [];
          res.data.map(v => {
            plist.push({
              label: v.projectname,
              value: v.code
            });
          });
          this.setState(
            {
              projectList: plist
            },
            () => {
              console.log(this.state.projectList, "[[[[[[[[[[[[[[[[[[[");
            }
          );
        }
      });
  };
  componentDidUpdate(prevProps, prevState) {
    this.getDeviceList();
    console.log(this.state.projectList);
  }

  getDeviceList = () => {
    axios
      .ajax({
        method: "get",
        url: easyURL + "/monitordot",
        data: {
          projected: this.state.projSelected,
          netid: this.state.monintSelected
        }
      })
      .then(res => {
        if (res.success) {
          this.setState({
            tableData: res.data
          });
        }
      });
  };
  handSelectP = e => {
    this.setState({
      projSelected: e.target.value
    });
  };
  handSelectM = e => {
    this.setState(
      {
        monintSelected: e.target.value
      },
      () => {
        this.getDeviceList();
      }
    );
  };
  render() {
    return (
      <div className="dotequip">
        <div className="optbox">
          <Row className="moniproj">
            <Col span={4} className="capt">
              监测网规划
            </Col>
            <Col span={19}>
              <Radio.Group
                options={this.state.projectList}
                onChange={this.handSelectP}
                value={1}
              />
            </Col>
          </Row>
          <Row className="monitype">
            <Col span={4} className="capt" style={{ display: "flex" }}>
              监测网类型
            </Col>
            <Col span={19}>
              <Radio.Group
                options={monitorNetType}
                onChange={this.handSelectM}
                value={1}
              />
              <Row>
                <Col />
                <Col />
                <Col />
                <Col />
                <Col />
                <Col />
                <Col />
                <Col />
              </Row>
            </Col>
          </Row>
        </div>
        <div className="devicelist">
          <Table columns={this.columns} dataSource={this.state.tableData} />
        </div>
      </div>
    );
  }
}

export default Dotequip;
