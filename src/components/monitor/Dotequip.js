import React, { Component } from "react";
import {Row, Form, Col, Icon, Button, Modal, message, Select, Input} from "antd";
import axios from "../../axios";
import moment from "moment";
import Table from "../common/Etable";
import Utils from "../../utils/utils";
import PageBreadcrumb from "../common/PageBreadcrumb";

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from '../../actions/postActions';

import "../../style/jhy/css/dotequip.less";
const confirm = Modal.confirm;
const FormItem = Form.Item;
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
      deviceCount: "",
      detcode: "",
      filepath: "",
      routes:[
        {path: '', breadcrumbName: '监测数据'},
        {path: '/main/dotequip', breadcrumbName: '点位设备'},
      ],
      defaultValue1:undefined,//监测规划下拉框默认值   北斗环境监测规划
      defaultValue2:undefined,//监测网下拉框默认值   地表水监测网
    };
    this.params = {
      pageindex: 1,
      pagesize: 10
    };
    this.columns = [
      {
        title: "序号",
        align: "center",
        key: "no",
        render: (text, record, index) => {
          return index + 1;
        }
      },
      {
        title: "点位名称",
        dataIndex: "pointname",
        key: "dotname",
        align: "center"
      },
      {
        title: "设备ID",
        dataIndex: "devicecode",
        key: "devid",
        align: "center"
      },
      {
        title: "安装时间",
        key: "instime",
        dataIndex: "installdate",
        align: "center",
      },
      {
        title: "创建时间",
        dataIndex: "createon",
        key: "creatime",
        align: "center",
      },
      {
        title: "设备类型",
        key: "devtype",
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
        key: "states",
        align: "center",
        render: text => {
          switch (text) {
            case "0": {
              return <div className="state-bg-not">未绑定</div>;
            }
            case "1": {
              return <div className="state-bg-normal">启用</div>;
            }
            case "2": {
              return <div className="state-bg-abandoning">弃用</div>;
            }
            default:
            return text
          }
        },
        
      },
      {
        title: "操作",
        key: "option",
        // dataIndex: "states",
        render: (record, index) => {
          // console.log(record, index);
          switch (record.states) {
            case "1": {
              return <Button
                type="link"
                className="btn-look"
                onClick={() => {
                  this.handDetail(record);
                }}
              >
                查看
              </Button>
            }
            default:
            return <Button
            type="link"
            className="btn-look"
            disabled
            >
              查看
            </Button>
          }




          // switch (text) {
          //   case "0":
          //     {
          //       return (
          //         <div></div>
          //         // <Button
          //         //   type="primary"
          //         //   className="btn-binding"
          //         //   onClick={() => {
          //         //     this.handBind(record.code, record.devicecode);
          //         //   }}
          //         // >
          //         //   绑定
          //         // </Button>
          //       );
          //     }
          //   case "1":
          //     {
          //       return (
          //         <div>
          //           <Button
          //             type="link"
          //             onClick={() => {
          //               this.handDetail(record);
          //             }}
          //           >
          //             查看
          //           </Button>
          //           <Button
          //             type="danger"
          //             style={{ marginLeft: "5px" }}
          //             className="btn-abandoning"
          //             onClick={() => {
          //               this.handAbandon(record.code);
          //             }}
          //           >
          //             弃用
          //           </Button>
          //         </div>
          //       );
          //     }
          //   case "2":
          //     {
          //       return (
          //         <div>
          //           <Button
          //             type="link"
          //             className="btn-look"
          //             onClick={() => {
          //               this.handDetail(record);
          //             }}
          //           >
          //             查看
          //           </Button>
          //           <Button
          //             type="dashed"
          //             className="btn-use"
          //             style={{ marginLeft: "5px" }}
          //             onClick={() => {
          //               this.handUnseal(record.code);
          //             }}
          //           >
          //             启用
          //           </Button>
          //         </div>
          //       );
          //     }
          //   default:
          //     {
          //     }
          // }
        }
      }
    ];
  }
  componentWillMount() {
    // console.log(this);
    let pathname=this.props.location.pathname;
    // this.getProjectList();
  }
  componentDidMount() {
    // redux知道全局location，菜单展开
    // console.log(this);
    let Mylocation=this.props.location.pathname;
    this.props.Location(Mylocation);

    this.getProjectList();
  }
  getProjectList = () => {
    axios
      .ajax({
        baseURL:window.g.bizserviceURL,
        method: "get",
        url: "/api/findMonitorPlanAll"
      })
      .then(res => {
        if (res.success) {
          if (res.data.length > 0) {
            // console.log(res.data);
            localStorage.setItem("prolist", res.data);
            var plist = [];
            res.data.map(v => {
              return plist.push({
                label: v.itemtitle,
                value: v.code
              });
            });
            this.setState(
              {
                originPro: res.data,
                projectList: plist,
                projdefsel: res.data[0].code,
                filepath: res.data[0].filepath,
                detcode: res.data[0].code,
                defaultValue1:plist[0].value,
                monintdefsel: "",
                monintSelected: "",
              },() => {
                this.getTypeList();
              }
            );
          }
        }
      });
  };
  getTypeList = () => {
    // http://39.97.238.216:8001/device/api/monitorNetAll?itemid=1173495218001641472
    // console.log(1111);
    axios.ajax({
        baseURL:window.g.deviceURL,
        method: "get",
        url: "/api/monitorNetAll",
        data: {
          itemid: this.state.projSelected
            ? this.state.projSelected
            : this.state.projdefsel
        }
      })
      .then(res => {
        if (res.success) {
          // console.log(res);
          if (res.data.length > 0) {
            var tlist = [];
            res.data.map(v => {
              return tlist.push({
                label: v.netname, //或nettype
                value: v.code
              });
            });
            this.setState(
              {
                typeList: tlist,
                monintdefsel: res.data[0].code,
                defaultValue2:tlist[0].value
              },() => {
                this.getDeviceList();
              }
            );
          }else{
            this.setState(
              {
                monintdefsel: "",
              },() => {
                this.getDeviceList();
              }
            );
          }
        }
      });
  };

  getDeviceList = () => {
    console.log(this.state.monintSelected);
    console.log(this.state.monintdefsel);
      const quparams = {
          pagesize: 10,
          pageindex: this.params.pageindex,
          itemid: this.state.projSelected
              ? this.state.projSelected
              : this.state.projdefsel,
          netid: this.state.monintSelected
              ? this.state.monintSelected
              : this.state.monintdefsel
      };
    axios.ajax({
        baseURL:window.g.bizserviceURL,
        method: "get",
        url: "/api/findMonitordeviceThresholdList",
        data:quparams
      }).then(res => {
        if (res.success) {
          
          this.setState({
            requestCompleted:"requestCompleted",
            tableData: res.data,
            total: res.totalcount,
            pagination: Utils.pagination(res, current => {
              this.params.pageindex = current;
              this.getDeviceList();
            }),
            deviceCount: res.totalcount
          });
          // console.log('tableData',res);
          // console.log('pagination',this.state.pagination);
        }
      });
  };
  handSelectP = val => {
    // console.log(val);
    this.setState(
      {
        projSelected: val,
        defaultValue1:val,
        // defaultValue2:"",
        monintSelected:"",
        typeList:[]
      },
      () => {
        this.getTypeList();
        this.getDeviceList();
      }
    );
    this.state.originPro.find(item => {
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
        monintSelected: val,
        defaultValue2:val
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
  // submitBind = () => {
  //   const _this = this;
  //   const bindvalue = this.input.state.value;
  //  if(bindvalue){
  //      axios.ajax({
  //          baseURL:window.g.bizserviceURL,
  //          method: "put",
  //          url: "/api/bindMonitorDevice",
  //          data: {
  //              code: this.state.bindCodeId,
  //              devicecode: this.input.state.value,
  //              states: 1
  //          }
  //      })
  //          .then(res => {
  //              if (res.success) {
  //                  message.success("绑定成功");
  //                  this.setState({
  //                      bindmodalshow: false
  //                  });
  //                  _this.getDeviceList();
  //              } else {
  //                  // message.error("绑定失败");
  //                  this.setState({
  //                      bindmodalshow: false
  //                  });
  //              }
  //          });
  //  }else {
  //      message.warning('请输入要绑定的设备ID');
  //  }

  // }; 
  handDetail = record => {
    window.location.href = `/#/main/dotdetails?deviceId=${
      record.code
    }&&companyCode=${record.companycode}&&deviceType=${record.devicetype}&&ifreport=${record.ifreport}&&title=${record.pointname}`;
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
            baseURL:window.g.bizserviceURL,
            method: "put",
            url: "/api/disabledMonitorDevice",
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
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: "put",
            url: "/api/enabledMonitorDevice",
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
    // console.log(this.state.projectList);
    if (this.state.projectList.length > 0) {
      const option = this.state.projectList.map((item, key) => (
        <Select.Option key={item.value} value={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      ));
      return (
        <Select
          showSearch
          value={this.state.defaultValue1}
          dropdownClassName="dotselect"
          onChange={val => {
            this.handSelectP(val);
          }}
          filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {option}
        </Select>
      );
    }else{
      return (
        <Select value={undefined}>
        </Select>
      );
    }
  };

  seltyperender = () => {
    // console.log(this.state.typeList);
    // console.log(this.state.defaultValue2);

    if (this.state.typeList.length > 0) {
      const option = this.state.typeList.map((item, key) => (
        <Select.Option key={item.value} value={item.value} title={item.label}>
          {item.label}
        </Select.Option>
      ));
      return (
        <Select
          value={this.state.defaultValue2}
          showSearch
          // allowClear={true}
          // autoClearSearchValue={false}
          dropdownClassName="dotselect"
          onChange={val => {
            this.handSelectM(val);
          }}
          filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {option}
        </Select>
      );
    }else{
      return (
        <Select value={undefined}>
        </Select>
      );
    }
  };
  
  render() {
    let _this=this;
    return (
      <div className="dotequip">
        <PageBreadcrumb routes={this.state.routes} />
        <div className="optbox">
          <Row type="flex"
          gutter={8} 
          align="bottom">
          {/* requestCompleted */}
          {/* {this.state.requestCompleted=="requestCompleted"? */}
            <Col span={7}>
                <span style={{ marginRight:'10px' }} className="label block">监测规划</span> 
                {this.selprorender()}
            </Col>
          {/* //   :""
          // } */}
            <Col span={5}>
              <span className="cont block">
                <span className="tit block">
                  <Icon
                    type="file-text"
                    style={{ display: "inline-block", marginRight: "2px"}}
                  />
                  监测设备
                </span>
                <span className="cotrg block">{this.state.deviceCount?this.state.deviceCount:0}/个</span>
              </span>
            </Col>
          </Row>

          <Row
            type="flex"
            gutter={8}
            align="bottom"
            style={{ marginTop: "10px" }}
          >
            <Col span={7}><span style={{ marginRight:'10px' }} className="label block">监测网</span> 
              {this.seltyperender()}
            </Col>
            <Col span={5}>
              <span className="cont block">
                <span className="tit block">
                {/* ,fontSize:"16px" */}
                  <Icon
                    type="cluster"
                    style={{ display: "inline-block", marginRight: "2px" }}
                  />
                  文档查看
                </span>
                  {
                      this.state.filepath!=null && this.state.filepath.lastIndexOf(".pdf") === -1?
                          <a className="cotrg block" target="_blank" rel="noopener noreferrer" href={"https://view.officeapps.live.com/op/view.aspx?src="+window.g.filesURL+this.state.filepath}>查看</a>:
                          <a className="cotrg block" target="_blank" rel="noopener noreferrer" href={window.g.filesURL+this.state.filepath}>{this.state.filepath!=null?"查看":""}</a>
                  }
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
        {/* <Modal
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
        </Modal> */}
      </div>
    );
  }
}

Dotequip.propTypes = {
  Location: PropTypes.func.isRequired
}


export default connect(null, { Location })(Dotequip); 