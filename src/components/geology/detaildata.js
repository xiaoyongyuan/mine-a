import React, { Component } from 'react';
import {Row, Col,DatePicker,Button,Table, Divider, Tag} from "antd";
import DataOverviewEcharts from "../DataOverviewEcharts";
import Etable from "../common/Etable"
import OverallEcharts from "../datashow/OverallEcharts";
import "../../style/yal/css/detaildata.css";
import Utils from "../../utils/utils";

class Detaildata extends Component {
  constructor(props){
    super(props);
      this.state={
          page:1,
      };
      this.params = {
          page:1
      }
  }
    componentDidMount(){
        this.requestList();
    }

    requestList = ()=>{
        const data={
            success:1,
            data:[{
                code:1,
                monitorvalue:0.2,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:2,
                monitorvalue:0.3,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:3,
                monitorvalue:0.4,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:4,
                monitorvalue:0.4,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:5,
                monitorvalue:0.2,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:6,
                monitorvalue:0.4,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            },{
                code:7,
                monitorvalue:0.3,
                thresholdvalue:'0.3--1.2',
                time:'2019-03-09 12:09:09'
            }],
            pageSize:10,
            page:this.params.page,
            total:30,
        };

        this.setState({
            list:data.data,
            pagination:Utils.pagination(data,(current)=>{
                this.params.page=current;
                this.requestList();
            })
        })
    };



  render() {
      const columns=[{
          title: '序号',
          dataIndex: 'index',
          width:'8%',
          render: (text, record,index) => (index+1),
      },{
          title: '时间',
          dataIndex: 'time',
      },{
          title: '监测值(mm)',
          dataIndex: 'monitorvalue',
      },{
          title: '阈值(mm)',
          dataIndex: 'thresholdvalue',
      },{
          title: '检测值变化(mm)',
          dataIndex: 'monitorvaluechange',
      }];
    return (
      <div className="Detaildata">
          <div className="DetaildataTop">
              <DataOverviewEcharts
                  type="detaildata"
              />
          </div>
          <div className="DetaildataBottom">
              <Row className="query" type="flex" justify="center">
                  <Col span={6} className="querycol">
                      <DatePicker />
                      <Button type="primary">查询</Button>
                  </Col>
              </Row>
              <Row className="querytable">
                  <Col>
                      <Etable
                          ref="pageChange"
                          bordered
                          columns={columns}
                          dataSource={this.state.list}
                          pagination={this.state.pagination}
                      />
                  </Col>
              </Row>
          </div>
      </div>
    );
  }
}

export default Detaildata;
