import React, { Component } from 'react';
import {Modal,message, Form, Button, Upload, Icon} from 'antd'
const FormItem = Form.Item;
class CheckReportModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };

    this.property={
      headers:{
        ContentType:'application/json;charset=UTF-8',
        AUTHORIZATION: 'Bearer '+localStorage.getItem("token")
      },
      accept:"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      showUploadList:true,
      multiple:false,
      name:"file",
      action:window.g.fileURL+"/api/uploadFile", //上传地址
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
      filename:'',
      fileurl:"",
      cad:""
    })
      this.props.form.resetFields();
      this.props.uploadreset()
  }
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              var data=values;
              data.filename=_this.state.cad
              data.fileurl=_this.state.fileurl
              data.excel=_this.state.excel
              _this.props.filterSubmit(data);
              _this.props.form.resetFields();
          }
      });
        
  };

  uploadchange=(info,fileurl)=>{ //上传文件
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
          const resp=info.file.response;
          if(resp.success){
            console.log("上传文件",info);
            this.setState({
              [fileurl]:resp.data.url,
              cad:info.file.name
            },()=>{
            })
          }else{
            message.error(resp.msg)
          }
          
            
        }
    }
  removefile=(file,fileurl)=>{ //删除文件
    this.setState({
      [fileurl]:'',
      excel:'',
      filename:'',
      cad:""
    })

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
    return (
      <div className="CheckReportModel">
        <Modal
          title="监测报告新增"
          visible={this.props.newShow}
          onCancel={this.reset}
          footer={null}
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='选择文件' key='modoc'>
                  {getFieldDecorator('fileurl', {
                      rules: [{
                            required: true,
                            message: '请上传文件',
                          }],
                    })(
                      <Upload {...this.property} onChange={(info)=>this.uploadchange(info,'fileurl')} onRemove={(info)=>this.removefile(info,'fileurl')}>
                        <Button>
                          <Icon type="upload" /> 选择文件
                        </Button>
                      </Upload>
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
  }
}

export default CheckReportModel=Form.create({})(CheckReportModel);

