import React, { Component } from 'react';
import {Modal,message, Form, Button, Upload, Icon} from 'antd'
const FormItem = Form.Item;
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
    };
      this.fileList={
          filepath:[],
          filepathcad:[],
          filepathexcel:[],
      }
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentDidMount(){
    }
  reset = ()=>{ //取消表单
      this.fileList={
          filepath:[],
          filepathcad:[],
          filepathexcel:[],
      };
      this.props.form.resetFields();
      this.props.uploadreset()
  };
  handleFilterSubmit = ()=>{//表单提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              var data={};
              data.filepath=values.filepath.fileList[0].url;
              data.filepathcad=values.filepathcad.fileList[0].url;
              data.filepathexcel=values.filepathexcel.fileList[0].url;
              _this.props.changeSubmit(data);
              _this.props.form.resetFields();
              _this.reset();
          }
      });
        
  };
    uploadchange=(info,fileurl)=>{ //上传文件
        let switchUp=true;
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        if( info.file.size / 1024 / 1024 > 20){ //只能上传20M以内的文件
            message.error('请上传20M以内的文件');
            switchUp=false;
        }else{
            fileList = fileList.map(file => {
                if (file.response) {
                    if(file.response.success){
                        file.url = file.response.data.url;
                    }else{
                        message.error(file.response.msg);
                        switchUp=false;
                    }
                }
                return file;
            });
        }
        this.fileList[fileurl]=switchUp?fileList:[]
    };
  removefile=(file,fileurl)=>{ //删除文件
      this.fileList[fileurl]=[]
  };
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
      const property={
          showUploadList:true,
          multiple:false,
          name:"file" ,
          action:window.g.fileURL+"/api/uploadFile", //上传地址
          headers:{AUTHORIZATION: 'Bearer '+localStorage.getItem("token")},//请求头
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
                      <Upload fileList={this.fileList.filepath} accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' {...property}  onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
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
                      <Upload fileList={this.fileList.filepathcad}  {...property} accept='application/acad,application/dxf' onChange={(info)=>this.uploadchange(info,'filepathcad')} onRemove={(info)=>this.removefile(info,'filepathcad')}>
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
                      <Upload fileList={this.fileList.filepathexcel}  {...property} accept='application/vnd.ms-excel application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={(info)=>this.uploadchange(info,'filepathexcel')} onRemove={(info)=>this.removefile(info,'filepathexcel')}>
                        <Button>
                          <Icon type="upload" /> 选择Excel文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              <FormItem key="buts" style={{display:'flex',justifyContent:'flex-end'}}>
                <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
                <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
              </FormItem>
          </Form>         
        </Modal>
      </div>
    );
  }
}
export default UploadModel=Form.create({})(UploadModel);

