import React, { Component } from 'react';
import {Table,Modal} from 'antd'
import BaseForm from "../common/BaseForm"

class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
    this.formList = [   
        {
          type: 'uploade',
          label: '上传',
          field: 'uploader',
          placeholder: '点击上传文件',
        },
        {
          type: 'INPUT',
          label: '监测点',
          field: 'dot',
          placeholder: '请输入',
          initialValue: '',
        },

    ]
  }

    




  render() {
    return (
      <div className="UploadModel">
        <Modal
          title="上传"
          visible={this.props.newShow}
          onOk={()=>this.changeState('memoswitch',false)}
          onCancel={()=>this.changeState('memoswitch',false)}
        >
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
        </Modal>
      </div>
    );
  }
}

export default UploadModel;
