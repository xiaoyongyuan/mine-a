import React, { Component } from "react";
import { Tabs } from "antd";
import BaseForm from "../common/BaseForm";
import axios from "../../axios";
import moment from "moment";
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
            endtime: "",
            netid: "",
            cid: ""
        };
    }
    formList = {
        type: "inline",
        item: [
            {
                type: "RANGPICKER",
                label: "筛选日期",
                field: "doubledata",
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
        this.setState({
            netid: this.props.query.netid,
            cid: this.props.query.cid
        });
        this.getList();
    }
    getList = () => {
        axios
            .ajax({
                method: "get",
                url: easyURL + "/monitordotdata",
                data: {
                    id: this.props.query.cid,
                    type: this.props.query.netid,
                    createonbegin: this.state.begintime,
                    createonend: this.state.endtime
                }
            })
            .then(res => {
                if (res.success) {
                    this.setState(
                        {
                            datalist: res.data,
                            // xdata:res.data.createon
                        },
                        () => {
                            console.log(this.state.datalist);
                            console.log("xdata",this.state.xdata);
                            var xdata=[];
                            res.data.map(item =>
                                // {
                                //   console.log("item",item.createon.substring(0,10));
                                // }
                                xdata.push(item.createon.substring(0,10))
                            );
                            console.log("xdata",xdata);
                            this.setState({
                                xdata:xdata
                            })
                        }
                    );
                }
            });
    };
    getColumns = () => {
        const type = this.props.query.netid;
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
        this.setState(
            {
                begintime: moment(data.doubledata[0]).format("YYYY-MM-DD HH:mm:ss"),
                endtime: moment(data.doubledata[1]).format("YYYY-MM-DD HH:mm:ss")
            },
            () => {
                this.getList();
            }
        );
    };
    render() {
        return (
            <div className="dotdetails">
                <Tabs type="card">
                    <TabPane tab="数据列表" key="1">
                        <BaseForm
                            formList={this.formList}
                            filterSubmit={this.handleFilterSubmit}
                        />
                        <Table
                            columns={this.getColumns()}
                            dataSource={this.state.datalist}
                        />
                    </TabPane>
                    <TabPane tab="曲线图" key="2">
                        <CurveChart xdata={this.state.xdata}/>
                    </TabPane>
                    <TabPane tab="报警信息" key="3">
                        <AlarmInfo netid={this.state.netid} cid={this.state.cid} />
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
