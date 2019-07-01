import React, { Component } from 'react';
import {Modal, Form,message} from 'antd'
import BaseForm from "../common/BaseForm"
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
    this.formList ={
        item:[
        {
          type: 'INPUT',
          label: '项目名称',
          field: 'projectname',
          placeholder: '',
          rules: [
              {
                required: true,
                message: '请填写项目名称',
              },
            ],
        },
        {
          type: 'RANGPICKER',
          label: '年份',
          field:'doubledata',
          placeholder:'请选择年份',
          showTime:false,
          format:'YYYY-MM-DD',
          rules: [
              {
                required: true,
                message: '请选择年份',
              },
            ],
        },
          {
            type: 'upload',
            label: '上传',
            field: 'uploader',
            placeholder: '点击上传文件',
            rules: [
              {
                required: true,
                message: '请上传文件',
              },
            ],
            property: {
              accept:"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              showUploadList:true,
              multiple:false,
              name:"file" , 
              action:window.g.fileURL+"/api/uploadFile", //上传地址
                headers:{AUTHORIZATION: 'Bearer '+localStorage.getItem("token")},
                beforeUpload:this.beforeUpload
            }
          },{
          type: 'INPUT',
          label: '备注',
          field: 'memo',
          placeholder: '',
          },{
            type:'button',
            button:[
              {
                label:'取消',
                click:'reset',
                fafuns:'onreset'
              },
                {
                    label:'确定',
                    type:"primary",
                    click:'layerSubmit',
                },
            ]
          }
        ]
      }
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentDidMount(){

  }
  reset = ()=>{ //取消表单
      this.props.form.resetFields();
      this.props.uploadreset();
  };
  handleFilterSubmit = (params)=>{ //提交表单
    var data={};
    data.projectname=params.projectname;
    data.filepath=params.fileurl;
    data.begindate=params.doubledata[0].format('YYYY-MM-DD');
    data.enddate=params.doubledata[1].format('YYYY-MM-DD');
    data.memo=params.memo;
    this.props.filterSubmit(data)
  };
    beforeUpload = (file) =>{
      console.log("file",file);
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            Modal.error({
                title: '超过20M限制 不允许上传!'
            })
        }
    };
  render() {
    return (
      <div className="UploadModel">
        <Modal
          title="上传"
          visible={this.props.newShow}
          onCancel={this.reset}
          footer={null}
        >
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} onreset={this.props.uploadreset}/>
        </Modal>
      </div>
    );
  }
}
export default UploadModel=Form.create({})(UploadModel);

