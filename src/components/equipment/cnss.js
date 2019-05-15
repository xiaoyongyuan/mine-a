import React, { Component } from 'react';
import Etable from "../common/Etable"
class Cnss extends Component {
  constructor(props){
    super(props);
    this.state={
      page:10,
      total:42
    };
  }
  changePage=(page,pageSize)=>{
    this.setState({
      page
    })
  }

  render() {
      const dataSource=[{
        code:1,
        name:'张三'
      },{
        code:2,
        name:'李四'
      }];
      const columns=[{
        title: '序号',
        dataIndex: 'index',
        width:'8%',
        render: (text, record,index) => (index+1),
      },{
        title: 'code',
        dataIndex: 'code',
      },{
        title: '姓名',
        dataIndex: 'name',
      }]
    return (
      <div className="Cnss">
        <Etable className="Etable"
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={{showQuickJumper:true, defaultPageSize:10,current:this.state.page, total:this.state.total,onChange:this.changePage ,hideOnSinglePage:true}}
        />
      </div>
    );
  }
}

export default Cnss;
