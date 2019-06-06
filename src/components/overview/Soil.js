import React, { Component } from 'react';
import {Row, Col,DatePicker,Button,Table} from "antd";
import arcgis from "../../style/yal/image/test.png";
import "../../style/yal/css/soil.css";

const { RangePicker } = DatePicker;

//嵌套字表
const expandedRowRender = () => {
    const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
};

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        width:'8%',
        render: (text, record,index) => (index+1),
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
];

const data = [];
for (let i = 0; i < 3; ++i) {
    data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
    });
}

//字表
// const zb =
//     <table border="1">
//     <tr>
//         <th>Month</th>
//         <th>Savings</th>
//     </tr>
//     <tr>
//         <td>January</td>
//         <td>$100</td>
//     </tr>
//     <tr>
//         <td>February</td>
//         <td>$80</td>
//     </tr>
// </table>;

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
                  <a href={"#/main/overview/soilbreathe"}>
                      <Button type="primary">新增</Button>
                  </a>
              </Col>
          </Row>
          <Row className="table-row">
              <Col>
                  <Table
                      className="components-table-demo-nested"
                      columns={columns}
                      expandedRowRender={expandedRowRender}
                      dataSource={data}
                  />
              </Col>
          </Row>
      </div>
    );
  }
}

export default Soil;
