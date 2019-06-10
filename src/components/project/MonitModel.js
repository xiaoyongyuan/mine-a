import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Checkbox, Radio, DatePicker, Upload, Icon} from 'antd'
import BaseForm from "../common/BaseForm"
import ofteraxios from '../../axios/ofter'


const FormItem = Form.Item;
const Option = Select.Option;
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
    };

    this.property={
      accept:"application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      showUploadList:true,
      multiple:false,
      name:"file" , 
      action:"http://192.168.10.20:8004/sys/api/uploadFile", //上传地址
    }
    this.formList ={
        item:[
        {
          type: 'INPUT',
          label: '项目名称',
          field: 'titles',
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
            
          },{
          type: 'INPUT',
          label: '备注',
          field: 'memo',
          placeholder: '',
          }
        ]
      }
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  }
  componentWillMount(){
    ofteraxios.projectlist().then(res=>{ //项目列表
      if(res.success){
        var project=[]
        res.data.map(item=>project.push({code:item.code,name:item.title}) )
        this.setState({project,selectp:project.length?project[0].code:''})
      }
    })

  }
  componentDidMount(){
    }
  reset = ()=>{ //取消表单
      
  }
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              var data=values;
              console.log('提交前',values,this.state)
              return;
              if(values.upload)data.fileurl=_this.state.fileurl  
              console.log('提交前',this.state.fileurl,data)
              _this.props.filterSubmit(data);
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
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='名称' key='mont'>
                  {
                      getFieldDecorator('mont',{
                          rules:[{
                            required: true,
                            message: '请选择年份',
                          }],
                      })(
                          <Input key='montInput' />
                      )
                  }
              </FormItem>
              <FormItem label='项目' key='titlemo'>
                {
                    getFieldDecorator('titled', {
                        rules:[{
                          required: true,
                          message: '请选择项目',
                        }],
                        initialValue: this.state.selectp
                    })(
                        <Select
                        >
                          {this.state.project.map(city => (
                              <Option key={city.code} value={city.code}>{city.name}</Option>
                          ))}     
                        </Select>
                      )
                  }
              </FormItem>
              <FormItem label='监测规划' key='modoc'>
                  {getFieldDecorator('upload', {
                      rules: [{
                            required: true,
                            message: '请上传文件',
                          }],
                    })(
                      <Upload {...this.property} onChange={(info)=>this.uploadchange(info,'doc')} onRemove={(info)=>this.removefile(info,'doc')}>
                        <Button>
                          <Icon type="upload" /> 选择文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              {/*<FormItem label='CAD' key='mocad'>
                                {getFieldDecorator('upload', {
                                    rules: [{
                                          required: true,
                                          message: '请上传文件',
                                        }],
                                  })(
                                    <Upload {...this.property} onChange={this.uploadchange}>
                                      <Button>
                                        <Icon type="upload" /> 选择文件
                                      </Button>
                                    </Upload>,
                                )}
                            </FormItem>
                            <FormItem label='Excel' key='moExcel'>
                                {getFieldDecorator('upload', {
                                    rules: [{
                                          required: true,
                                          message: '请上传文件',
                                        }],
                                  })(
                                    <Upload {...this.property} onChange={this.uploadchange}>
                                      <Button>
                                        <Icon type="upload" /> 选择文件
                                      </Button>
                                    </Upload>,
                                )}
                            </FormItem>*/}
              <FormItem label='备注' key='memo'>
                  {
                      getFieldDecorator('memo')(
                          <Input key='memoInput' />
                      )
                  }
              </FormItem>
              <FormItem key="buts">
                <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                <Button style={{ margin: '0 10px' }} onClick={()=>this.reset}>取消</Button>
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

