import React, { Component } from 'react';
import {Table} from 'antd'
import  "./index.less"
class Etable extends Component {
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
    return (
      <div className="Etable">
        <Table
            bordered
            dataSource={[]}
            rowKey={record=>record.code}
            pagination={{showQuickJumper:true, defaultPageSize:10,current:this.state.page, total:this.state.total,onChange:this.changePage ,hideOnSinglePage:true}}
            {...this.props}
        />
      </div>
    );
  }
}

export default Etable;
