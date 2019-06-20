import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Checkbox, Radio, DatePicker, Upload, Icon} from 'antd'
import BaseForm from "../common/BaseForm"
import ofteraxios from '../../axios/ofter'
import axios from '../../axios'


const FormItem = Form.Item;
const Option = Select.Option;
const cadformat="image/vnd.dwg,image/vnd.dxf";
const excelformat="application/vnd.ms-excel application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const wordformat="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";


class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
    };

    this.property={
      showUploadList:true,
      multiple:false,
      name:"file" , 
      action:"http://192.168.10.29:8001/sys/api/uploadFile", //上传地址
    }
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  }
  componentDidMount(){
    }
  reset = ()=>{ //取消表单
    this.setState({
      excel:'',
      filepath:'',
      filename_cad:''
    })
      this.props.form.resetFields();
      this.props.uploadreset()
  }
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              var data=values;
              data.filepath=_this.state.filepath
              data.filepathexcel=_this.state.filepathexcel
              data.filepathcad=_this.state.filepathcad
              _this.props.changeSubmit(data);
              _this.props.form.resetFields();
          }
      });
        
  };

  uploadchange=(info,fileurl)=>{ //上传文件
    console.log('fileurlfileurl',info,fileurl)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
          const resp=info.file.response;
          if(resp.success){
            this.setState({[fileurl]:resp.data.url},()=>{
                console.log('上传成功',this.state[fileurl])
            })
          }else{
            message.error(resp.msg)
          }
          
            
        }
    }
  removefile=(file,fileurl)=>{ //删除文件
    this.setState({[fileurl]:''})

  } 

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
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
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='监测规划' key='modoc'>
                  {getFieldDecorator('filepath', {
                      rules: [{
                            required: true,
                            message: '请上传word或pdf文件',
                          }],
                    })(
                      <Upload accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' {...this.property}  onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
                        <Button>
                          <Icon type="upload" /> 选择word或pdf文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              <FormItem label='CAD' key='mocad'>
                  {getFieldDecorator('filepathcad', {
                      rules: [{
                            required: true,
                            message: '请上传CAD文件',
                          }],
                    })(
                      <Upload  {...this.property} accept='application/acad,application/dxf' onChange={(info)=>this.uploadchange(info,'filepathcad')} onRemove={(info)=>this.removefile(info,'filepathcad')}>
                        <Button>
                          <Icon type="upload" /> 选择CAD文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              <FormItem label='Excel' key='moExcel'>
                  {getFieldDecorator('filepathexcel', {
                      rules: [{
                            required: true,
                            message: '请上传Excel文件',
                          }],
                    })(
                      <Upload  {...this.property} accept='application/vnd.ms-excel application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={(info)=>this.uploadchange(info,'filepathexcel')} onRemove={(info)=>this.removefile(info,'filepathexcel')}>
                        <Button>
                          <Icon type="upload" /> 选择Excel文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              <FormItem key="buts">
                <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
              </FormItem>
          </Form>         
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

