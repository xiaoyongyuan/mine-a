import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Checkbox, Radio, DatePicker, Upload, Icon} from 'antd'
import BaseForm from "../common/BaseForm"
import ofteraxios from '../../axios/ofter'

const FormItem = Form.Item;
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
    this.projectlist=()=>{
      ofteraxios.projectlist().then(res=>{
        if(res.success){
          res.data.map(item=>{return {code:item.code,name:item.projectname}})
        }
      })
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
              action:"http://192.168.10.29:8001/sys/api/uploadFile", //上传地址
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
  }
  componentDidMount(){
    }
  reset = ()=>{ //取消表单
      this.props.form.resetFields();
      this.props.uploadreset();
  }

  handleFilterSubmit = (params)=>{ //提交表单
    var data={}
    data.projectname=params.projectname
    data.filepath=params.fileurl
    data.begindate=params.doubledata[0].format('YYYY-MM-DD')
    data.enddate=params.doubledata[1].format('YYYY-MM-DD')
    data.memo=params.memo
    this.props.filterSubmit(data)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

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

    function beforeUpload(file) {
      console.log('file',file)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("上传图片不能大于5M!");
      }
      return isLt5M;
    }

  }
}

export default UploadModel=Form.create({})(UploadModel);

