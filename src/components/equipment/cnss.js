import React, { Component } from 'react';
import Etable from "../common/Etable"
import Utils from "../../utils/utils"

class Cnss extends Component {
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
  changePage=(page,pageSize)=>{
    this.setState({
      page
    })
  }
  requestList = ()=>{
    const data={
      success:1,
      data:[{
        code:1,
        name:'设备1',
        location:'不知道在哪',
        lasttime:'2019-03-09 12:09:09',
        time:'2019-03-09 12:09:09',
        lastdata:'0.023',
        frequency:'1 hours',
        duration:'22'
      },{
        code:2,
        name:'设备1',
        location:'不知道在哪',
        lasttime:'2019-03-09 12:09:09',
        time:'2019-03-09 12:09:09',
        lastdata:'0.023',
        frequency:'1 hours',
        duration:'22'
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

  render() {
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        width:'8%',
        render: (text, record,index) => (index+1),
      },{
        title: '设备名称',
        dataIndex: 'name',
      },{
        title: '安装地点',
        dataIndex: 'location',
      },{
        title: '安装时间',
        dataIndex: 'time',
      },{
        title: '采样频率',
        dataIndex: 'frequency',
      },{
        title: '最后一次通讯时间',
        dataIndex: 'lasttime',
      },{
        title: '最后一次数据',
        dataIndex: 'lastdata',
      },{
        title: '在线时长',
        dataIndex: 'duration',
      }]
    return (
      <div className="Cnss">
        <Etable
            ref="pageChange"
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
        />
      </div>
    );
  }
}

export default Cnss;
