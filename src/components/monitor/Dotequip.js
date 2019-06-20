import React, { Component } from "react";
import {
  Row,
  Col,
  Icon,
  Radio,
  Button,
  Modal,
  DatePicker,
  message,
  Select,
  Input
} from "antd";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import Form from "../common/BaseForm";
import Utils from "../../utils/utils";

import "../../style/jhy/css/dotequip.less";
const confirm = Modal.confirm;
const bizserviceURL = window.g.bizserviceURL;
const sysURL = window.g.sysURL;
const deviceURL = window.g.deviceURL;
class Dotequip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [], //项目列表
      originPro: [],
      typeList: [], //类型列表
      projSelected: "", //项目选中
      projdefsel: "", //项目默认选中
      monintSelected: "", //监测选中
      monintdefsel: "", //监测默认选中
      tableData: [], //
      bindmodalshow: false, //
      bindDevId: "", //绑定设备id
      bindCodeId: "", //绑定code
      pagination: [],
      deviceCount: "",
      detcode: "",
      filepath: ""
    };
    this.params = {
      pageindex: 1,
      pagesize: 10
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
        dataIndex: "dname",
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
                    className="btn-binding"
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
                      type="link"
                      onClick={() => {
                        this.handDetail(record);
                      }}
                    >
                      查看
                    </Button>
                    <Button
                      type="danger"
                      style={{ marginLeft: "5px" }}
                      className="btn-abandoning"
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
                      type="link"
                      className="btn-look"
                      onClick={() => {
                        this.handDetail(record);
                      }}
                    >
                      查看
                    </Button>
                    <Button
                      type="dashed"
                      className="btn-use"
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
          if (res.data.length > 0) {
            localStorage.setItem("prolist", res.data);
            var plist = [];
            res.data.map(v => {
              plist.push({
                label: v.projectname,
                value: v.code
              });
            });
            this.setState(
              {
                originPro: res.data,
                projectList: plist,
                projdefsel: res.data[0].code,
                filepath: res.data[0].filepath,
                detcode: res.data[0].code
              },
              () => {
                this.getTypeList();
              }
            );
          }
        }
      });
  };
  getTypeList = () => {
    axios
      .ajax({
        method: "get",
        url: deviceURL + "/api/monitorNetAll",
        data: {
          itemid: this.state.projSelected
            ? this.state.projSelected
            : this.state.projdefsel
        }
      })
      .then(res => {
        console.log(res, "类型");

        if (res.success) {
          if (res.data.length > 0) {
            var tlist = [];
            res.data.map(v => {
              tlist.push({
                label: v.netname, //或nettype
                value: v.code
              });
            });
            this.setState(
              {
                typeList: tlist,
                monintdefsel: res.data[0].code
              },
              () => {
                this.getDeviceList();
              }
            );
          }
        }
      });
  };

  getDeviceList = () => {
    axios
      .ajax({
        method: "get",
        url: bizserviceURL + "/api/findMonitordeviceThresholdList",
        data: {
          itemid: this.state.projSelected
            ? this.state.projSelected
            : this.state.projdefsel,
          netid: this.state.monintSelected
            ? this.state.monintSelected
            : this.state.monintdefsel
        }
      })
      .then(res => {
        console.log(res, "设备");
        if (res.success) {
          this.setState({
            tableData: res.data,
            pagination: Utils.pagination(res, current => {
              this.params.pageindex = current;
              this.getDeviceList();
            }),
            deviceCount: res.totalcount
          });
        }
      });
  };
  handSelectP = val => {
    this.setState(
      {
        projSelected: val
      },
      () => {
        this.getTypeList();
        this.getDeviceList();
      }
    );
    this.state.originPro.find(item => {
      console.log(item, val);
      if (item.code == val) {
        this.setState({
          filepath: item.filepath
        });
      }
    });
  };
  handSelectM = val => {
    this.setState(
      {
        monintSelected: val
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
    axios
      .ajax({
        method: "put",
        url: "http://192.168.10.11:8001/bizservice/api/bindMonitorDevice",
        data: {
          code: this.state.bindCodeId,
          devicecode: this.input.state.value,
          states: 1
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
    window.location.href = `/#/main/dotdetails?deviceId=${
      record.code
    }&&companyCode=${record.companycode}&&deviceType=${record.devicetype}`;
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
            url: bizserviceURL + "/api/disabledMonitorDevice",
            data: {
              code: id
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
  selprorender = () => {
    if (this.state.projectList.length > 0) {
      const option = this.state.projectList.map((item, key) => (
        <Select.Option key={key} value={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      ));

      return (
        <Select
          defaultValue={this.state.projectList[0].value}
          placeholder="请选择规划"
          dropdownClassName="dotselect"
          onChange={val => {
            this.handSelectP(val);
          }}
        >
          {option}
        </Select>
      );
    }
  };
  seltyperender = () => {
    if (this.state.typeList.length > 0) {
      const option = this.state.typeList.map((item, key) => (
        <Select.Option key={key} value={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      ));
      return (
        <Select
          defaultValue={this.state.typeList[0].value}
          placeholder="请选择监测网"
          dropdownClassName="dotselect"
          onChange={val => {
            this.handSelectM(val);
          }}
        >
          {option}
        </Select>
      );
    }
  };
  render() {
    return (
      <div className="dotequip">
        <div className="optbox">
          <Row type="flex" justify="arrangement" gutter={16} align="middle">
            <Col span={2}>
              <span className="label block">监测规划</span>
            </Col>
            <Col span={4}> {this.selprorender()}</Col>
            <Col span={3}>
              <span className="cont block">
                <span className="tit block">
                  <Icon
                    type="file-text"
                    style={{ display: "inline-block", marginRight: "2px" }}
                  />
                  监测设备
                </span>
                <span className="cotrg block">{this.state.deviceCount}/个</span>
              </span>
            </Col>
          </Row>
          <Row
            type="flex"
            justify="arrangement"
            gutter={16}
            align="middle"
            style={{ marginTop: "10px" }}
          >
            <Col span={2}>
              <span className="label block">监测网</span>
            </Col>
            <Col span={4}> {this.seltyperender()}</Col>
            <Col span={3}>
              <span className="cont block">
                <span className="tit block">
                  <Icon
                    type="cluster"
                    style={{ display: "inline-block", marginRight: "2px" }}
                  />
                  文档查看
                </span>
                <a
                  className="cotrg block"
                  href={`https://view.officeapps.live.com/op/view.aspx?src=${
                    this.state.filepath
                  }`}
                >
                  查看
                </a>
              </span>
            </Col>
          </Row>
        </div>
        <div className="devicelist" style={{ marginTop: "10px" }}>
          <Table
            columns={this.columns}
            dataSource={this.state.tableData}
            pagination={this.state.pagination}
          />
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
          <label htmlFor="idnum">设备ID:</label>
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
