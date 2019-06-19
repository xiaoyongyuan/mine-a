import React, { Component } from "react";
import {
  Row,
  Col,
  Radio,
  Button,
  Modal,
  DatePicker,
  message,
  Input
} from "antd";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import Form from "../common/BaseForm";
import "../../style/jhy/css/dotequip.less";
const confirm = Modal.confirm;
const bizserviceURL = window.g.bizserviceURL;
const sysURL = window.g.sysURL;
class Dotequip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      typeList: [],
      projSelected: "",
      monintSelected: "",
      tableData: [],
      bindmodalshow: false,
      bindDevId: "",
      bindCodeId: ""
    };
    this.columns = [
      {
        title: "序号",
        align: "center",
        render: (text, record, index) => {
          return index + 1;
        }
      },
      {
        title: "点位名称",
        dataIndex: "pointname",
        align: "center"
      },
      {
        title: "设备id",
        dataIndex: "devicecode",
        align: "center"
      },
      {
        title: "安装时间",
        dataIndex: "installdate",
        render: text => {
          moment(text).format("YYYY-MM-DD HH:mm:ss");
        },
        align: "center"
      },
      {
        title: "创建时间",
        dataIndex: "createon",
        render: text => {
          moment(text).format("YYYY-MM-DD HH:mm:ss");
        },
        align: "center"
      },
      {
        title: "设备类型",
        dataIndex: "devicetype",
        align: "center"
      },
      {
        title: "坐标X",
        dataIndex: "lnglat",
        key: "x",
        render: text => {
          if (text) {
            var arr = text.split(",");
            return arr[0];
          }
        },
        align: "center"
      },
      {
        title: "坐标Y",
        dataIndex: "lnglat",
        key: "y",
        render: text => {
          if (text) {
            var arr = text.split(",");
            return arr[1];
          }
        },
        align: "center"
      },
      {
        title: "坐标Z",
        dataIndex: "lnglat",
        key: "z",
        render: text => {
          if (text) {
            var arr = text.split(",");
            return arr[2];
          }
        },
        align: "center"
      },
      {
        title: "状态",
        dataIndex: "states",
        render: text => {
          switch (text) {
            case "0": {
              return <div>未绑定</div>;
            }
            case "1": {
              return <div>启用</div>;
            }
            case "2": {
              return <div>弃用</div>;
            }
          }
        },
        align: "center"
      },
      {
        title: "操作",
        key: "option",
        dataIndex: "states",
        render: (text, record, index) => {
          switch (text) {
            case "0":
              {
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      this.handBind(record.code, record.devicecode);
                    }}
                  >
                    绑定
                  </Button>
                );
              }
              break;
            case "1":
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
                        this.handAbandon(record.code);
                      }}
                    >
                      弃用
                    </Button>
                  </div>
                );
              }
              break;
            case "2":
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
                        this.handUnseal(record.code);
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
        url: bizserviceURL + "	/api/getProjectListAll"
      })
      .then(res => {
        console.log(res, "项目");
        if (res.success) {
          var plist = [];
          res.data.map(v => {
            plist.push({
              label: v.title,
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
        url: sysURL + "/api/findDictionaryByType",
        data: {
          dtype: "MONITORNET"
        }
      })
      .then(res => {
        console.log(res, "类型");

        if (res.success) {
          var tlist = [];
          res.data.map(v => {
            tlist.push({
              label: v.dname,
              value: v.dvalue
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
        url: bizserviceURL + "/api/getMonitordeviceList",
        data: {
          itemid: this.state.projSelected,
          netid: this.state.monintSelected
        }
      })
      .then(res => {
        console.log(res, "设备");
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

  cancleTMod = () => {
    this.setState({
      bindmodalshow: false
    });
  };
  handBind = (id, devid) => {
    this.setState(
      {
        bindmodalshow: true,
        bindCodeId: id,
        bindDevId: devid
      },
      () => {}
    );
  };
  submitBind = () => {
    const _this = this;
    console.log(this.input);
    axios
      .ajax({
        method: "put",
        url: bizserviceURL + "/api/bindMonitorDevice",
        data: {
          code: this.state.bindCodeId,
          devicecode: this.input.state.value
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
          this.setState({
            bindmodalshow: false
          });
        }
      });
  };
  handDetail = record => {
    window.location.href = `/#/main/dotdetails?code=${record.code}`;
  };

  handAbandon = id => {
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
            url:
              "http://192.168.10.11:9001/bizservice" +
              "/api/disabledMonitorDevice",
            data: {
              code: id,
              dataType: "json",
              contentType: "application/json"
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
  handUnseal = id => {
    const _this = this;
    console.log(id, "382");
    confirm({
      title: "确认启用吗？",
      okText: "确认",
      okType: "success",
      cancelText: "取消",
      onOk() {
        axios
          .ajax({
            method: "put",
            url: bizserviceURL + "/api/enabledMonitorDevice",
            data: {
              code: id
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
          title="确认绑定设备吗？"
          onCancel={() => {
            this.cancleTMod();
          }}
          onOk={() => {
            this.submitBind();
          }}
          cancelText="取消"
          okText="提交"
          okType="success"
          bodyStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <label for="idnum">设备ID:</label>
          <Input
            ref={input => {
              this.input = input;
            }}
            id="idnum"
            style={{ width: "70%", marginLeft: "5px" }}
          />
        </Modal>
      </div>
    );
  }
}

export default Dotequip;
