import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Checkbox, Radio, DatePicker, Upload, Icon} from 'antd'
import BaseForm from "../common/BaseForm"
import ofteraxios from '../../axios/ofter'


const FormItem = Form.Item;
const Option = Select.Option;
class ItemModel extends Component {
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
        action:"http://192.168.10.29:8001/sys/api/uploadFile", //上传地址
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
              data.filename_cad=_this.state.cad
              data.itemtype=2
              data.filepath=_this.state.filepath
              data.excel=_this.state.excel
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
      <div className="ItemModel">
        <Modal
          title="上传"
          visible={this.props.newShow}
          onCancel={this.reset}
          footer={null}
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='名称' key='mont'>
                  {
                      getFieldDecorator('itemtitle',{
                          rules:[{
                            required: true,
                            message: '请输入标题',
                          }],
                      })(
                          <Input key='montInput' />
                      )
                  }
              </FormItem>
              <FormItem label='项目' key='projectid'>
                {
                    getFieldDecorator('projectid', {
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
              <FormItem label='文件' key='modoc'>
                  {getFieldDecorator('filepath', {
                      rules: [{
                            required: true,
                            message: '请上传文件',
                          }],
                    })(
                      <Upload {...this.property} onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
                        <Button>
                          <Icon type="upload" /> 选择文件
                        </Button>
                      </Upload>,
                  )}
              </FormItem>
              <FormItem label='备注' key='memo'>
                  {
                      getFieldDecorator('memo')(
                          <Input key='memoInput' />
                      )
                  }
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

export default ItemModel=Form.create({})(ItemModel);

