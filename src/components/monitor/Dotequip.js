import React, { Component } from "react";
import { Row, Col, Radio, Button, Modal, DatePicker, message } from "antd";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import Form from "../common/BaseForm";
import "../../style/jhy/css/dotequip.less";
const confirm = Modal.confirm;
const easyURL = window.g.easyURL;
class Dotequip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      typeList: [],
      projSelected: 1,
      monintSelected: 1,
      tableData: [],
      bindmodalshow: false,
      setTime: "",
      bindDevId: ""
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
        dataIndex: "data",
        align: "center"
      },
      {
        title: "创建时间",
        dataIndex: "createon",
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
            case 0: {
              return <div>未绑定</div>;
            }
            case 1: {
              return <div>启用</div>;
            }
            case 2: {
              return <div>弃用</div>;
            }
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
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      this.handBind(record.cid);
                    }}
                  >
                    绑定
                  </Button>
                );
              }
              break;
            case 1:
              {
                return (
                  <div>
                    <Button
                      type="primary"
                      onClick={() => {
                        this.handDetail(record);
                      }}
                    >
                      查看
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        this.handAbandon(record.cid, record.state);
                      }}
                    >
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
                    <Button
                      type="primary"
                      onClick={() => {
                        this.handDetail(record);
                      }}
                    >
                      查看
                    </Button>
                    <Button
                      type="primary"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        this.handUnseal(record.cid, record.state);
                      }}
                    >
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
  componentWillMount() {}
  componentDidMount() {
    this.getProjectList();
    this.getTypeList();
    this.getDeviceList();
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
            () => {}
          );
        }
      });
  };
  getTypeList = () => {
    axios
      .ajax({
        method: "get",
        url: easyURL + "/montinet"
      })
      .then(res => {
        if (res.success) {
          var tlist = [];
          res.data.map(v => {
            tlist.push({
              label: v.name,
              value: v.code
            });
          });
          this.setState(
            {
              typeList: tlist
            },
            () => {}
          );
        }
      });
  };

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
    this.setState(
      {
        projSelected: e.target.value
      },
      () => {
        this.getDeviceList();
      }
    );
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
  handSetTime = v => {
    this.setState({
      setTime: moment(v).format("YYYY-MM-DD HH:mm:ss")
    });
  };
  submitTime = () => {
    const _this = this;
    axios
      .ajax({
        method: "put",
        url: easyURL + "/monitordot",
        data: {
          id: this.state.bindDevId,
          time: this.state.setTime
        }
      })
      .then(res => {
        if (res.success) {
          message.success("绑定成功");
          this.setState({
            bindmodalshow: false
          });
          _this.getDeviceList();
        } else {
          message.error("绑定失败");
        }
      });
  };
  cancleTMod = () => {
    this.setState({
      bindmodalshow: false
    });
  };
  handBind = id => {
    this.setState(
      {
        bindmodalshow: true,
        bindDevId: id
      },
      () => {}
    );
  };
  handDetail = record => {
    window.location.href = `/#/main/dotdetails?netid=${
      this.state.monintSelected
    }&cid=${record.cid}`;
  };

  handAbandon = (id, state) => {
    const _this = this;

    confirm({
      title: "确认弃用吗？",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        axios
          .ajax({
            method: "put",
            url: easyURL + "/monitordot",
            data: {
              id: id,
              status: state
            }
          })
          .then(res => {
            if (res.success) {
              message.success("已弃用");
              _this.getDeviceList();
            }
          });
      }
    });
  };
  handUnseal = (id, state) => {
    const _this = this;

    confirm({
      title: "确认启用吗？",
      okText: "确认",
      okType: "success",
      cancelText: "取消",
      onOk() {
        axios
          .ajax({
            method: "put",
            url: easyURL + "/monitordot",
            data: {
              id: id,
              status: state
            }
          })
          .then(res => {
            if (res.success) {
              message.success("已启用");
              _this.getDeviceList();
            }
          });
      }
    });
  };
  render() {
    return (
      <div className="dotequip">
        <div className="optbox">
          <Row
            className="moniproj"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Col span={4} className="capt">
              监测网规划
            </Col>
            <Col span={19}>
              <Radio.Group
                options={this.state.projectList}
                onChange={this.handSelectP}
                defaultValue={1}
                value={this.state.projSelected}
              />
            </Col>
          </Row>
          <Row
            className="monitype"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Col span={4} className="capt">
              监测网类型
            </Col>
            <Col span={19}>
              <Radio.Group
                options={this.state.typeList}
                onChange={this.handSelectM}
                defaultValue={1}
                value={this.state.monintSelected}
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
        <div className="devicelist" style={{ marginTop: "10px" }}>
          <Table columns={this.columns} dataSource={this.state.tableData} />
        </div>
        <Modal
          centered={true}
          destroyOnClose={true}
          visible={this.state.bindmodalshow}
          title="绑定设备"
          onCancel={() => {
            this.cancleTMod();
          }}
          onOk={() => {
            this.submitTime();
          }}
          cancelText="取消"
          okText="提交"
          okType="success"
          bodyStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <span>安装时间：</span>{" "}
          <DatePicker
            showTime
            placeholder="请选取安装时间"
            onChange={date => {
              this.handSetTime(date);
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Dotequip;
