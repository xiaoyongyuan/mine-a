import React, { Component } from 'react';
import {Row, Col,DatePicker,Button,} from "antd";
import arcgis from "../../style/yal/image/test.png";
import "../../style/yal/css/soil.css";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class Soil extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      pagination:{}
    };
    this.params = {
        page:1,
    }
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="Soil">
          <Row>
              <Col className="soil-col">
                  <img src={arcgis} alt="1"/>
              </Col>
          </Row>
          <Row className="soil-query">
              <Col span={18}>
                  <label>上传时间：</label>
                  <RangePicker  />
                  <Button type="primary">查询</Button>

              </Col>
              <Col span={4}>
                  <Button type="primary">新增</Button>
              </Col>
          </Row>
      </div>
    );
  }
}

export default Soil;
