import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Checkbox, Radio, DatePicker, Upload, Icon} from 'antd'
import BaseForm from "../common/BaseForm"

const FormItem = Form.Item;
const urls='https://www.easy-mock.com/mock/5ce208b85fa13b1e54d26e06/mainapi'
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
    this.formList ={
        item:[   
          {
            type: 'upload',
            label: '上传',
            field: 'uploader',
            placeholder: '点击上传文件',
            property: {
              accept:"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              showUploadList:true,
              multiple:false,
              name:"file" , 
              action:"http://192.168.10.3:8002/api/uploadFile", //上传地址
            }
          },
          {
            type:'button',
            button:[
              {
                label:'提交',
                type:"primary",
                click:'handleFilterSubmit',
              },
              {
                label:'取消',
                click:'reset',
              },
            ]
          }
        ]
      }
  }
  changeState=()=>{

  }
  reset = ()=>{ //取消表单
      this.props.form.resetFields();
      this.props.uploadreset();
  }
  handleFilterSubmit = (params)=>{ //提交表单
      
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
            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>

          
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



// <Form className='baseform' {...formItemLayout}>
//               <Form.Item label="文件">
//                 {getFieldDecorator('upload', {
//                   rules: [{
//                       required: true, message: '请上传文件!'
//                   }],
//                 })(
//                   <Upload {...this.upload()}>
//                     <Button>
//                       <Icon type="upload" /> 选择文件
//                     </Button>
//                   </Upload>,
//                 )}
//               </Form.Item>
//               <FormItem {...tailFormItemLayout}>
//                   <Button type="primary" style={{ margin: '0 20px 0 0' }} onClick={this.handleFilterSubmit}>提交</Button>
//                   <Button onClick={this.reset}>取消</Button>
//               </FormItem>
//           </Form>