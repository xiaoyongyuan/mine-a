import React, { Component } from 'react';
import { Row, Col,Pagination,Button} from "antd";
import Utils from "../../utils/utils";
import BaseForm from "../common/BaseForm";
import "./index.less"


class Insarmanage extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      pagination:{}
    };
    this.params = {
        page:1,
    }
    this.formList = [
        {
          type: 'monitoring', //监测点列表
        },
        {
          type: 'sensor', //传感器列表
        },
        {
          type: 'SELECT',
          label: '状态',
          field: 'order_status',
          placeholder: '全部',
          initialValue: '0',
          list: [{code: '0', name: '全部'}, {code: '1', name: '进行中'}, {code: '3', name: '行程结束'}]
        },
        {
          type: 'INPUT',
          label: '名称',
          field: 'uname',
          placeholder: '请输入名称',
          initialValue: 'sss',
        },
        {
          type:'datePicker',
          label: '日期',
          field:'selectdata',
          placeholder:'请输入日期',
          width: 150,
          // initialValue:'2019-03-09 12:09:09',
          showTime:true,
          format:'YYYY-MM-DD HH:mm:ss'
        },{
          type: 'RANGPICKER',
          label: '双日期',
          field:'doubledata',
          placeholder:'请选择日期',
          initialValue:['2019-03-09 12:09:09','2019-03-09 12:09:09'],
          showTime:true,
          format:'YYYY-MM-DD HH:mm:ss'
        },
    ]
  }
  componentDidMount(){
      this.requestList();
  }
  requestList = ()=>{
    const data={
      success:1,
      data:[{
        code:1,
        time:'2019-03-09 12:09:09',
        pic:'http://pic01.aokecloud.cn/alarm/1000004/background/efa61zz7.jpg?t=1557973203',
        file:''
      },{
        code:2,
        time:'2019-03-09 12:09:09',
        pic:'http://pic01.aokecloud.cn/alarm/1000004/background/efa61zz7.jpg?t=1557973203',
        file:''
      },{
        code:3,
        time:'2019-03-09 12:09:09',
        pic:'http://pic01.aokecloud.cn/alarm/1000004/background/efa61zz7.jpg?t=1557973203',
        file:''
      }],
      pageSize:10,
      page:this.params.page,
      total:30,
    }

    this.setState({
        list:data.data,
        pagination:Utils.pagination(data,(current)=>{
            this.params.page=current;
            this.requestList();
        })
    })

  }
  handleFilterSubmit = (filterParams) => {
      // this.params = filterParams;
      console.log('sssssss',filterParams)
      this.requestList();
  };

  render() {
    return (
      <div className="Insarmanage">
        <div className="selectForm">
          <div className="leftForm"> 
            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
          </div>
          <div className="rightOpt">
            <Button type="primary">新增</Button>
          </div>
        </div>
        <div className="content">
          <Row gutter={16}>
          {this.state.list.map((el,i)=>(
            <Col className="gutter-row" key={el.code} lg={6} xl={6} xxl={4}>
              <img src={el.pic} />
              <p>{el.time}</p>
            </Col>
            )
          )}
          </Row>
          <Pagination className="PaginationRight" {...this.state.pagination}/>
        </div>
      </div>
    );
  }
}

export default Insarmanage;
