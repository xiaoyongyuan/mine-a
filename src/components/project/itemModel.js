import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Upload, Icon} from 'antd'
import ofteraxios from '../../axios/ofter'
const FormItem = Form.Item;
const Option = Select.Option;
const token={AUTHORIZATION: 'Bearer '+localStorage.getItem("token")};
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
      action:window.g.fileURL+"/api/uploadFile", //上传地址
    }
    
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentWillMount(){
    ofteraxios.projectlist().then(res=>{ //项目列表
      if(res.success){
        var project=[];
        res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
        this.setState({project,selectp:project.length?project[0].code:''})
      }
    },()=>{})

  }

  reset = ()=>{ //取消表单
    this.setState({
      excel:'',
      filepath:'',
      filename_cad:''
    });
      this.props.form.resetFields();
      this.props.uploadreset()
  }
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              var data=values;
              data.filename_cad=_this.state.cad;
              data.itemtype=2;
              data.filepath=_this.state.filepath;
              data.excel=_this.state.excel;
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
            this.setState({[fileurl]:resp.data.url},()=>{
                console.log('上传成功',this.state[fileurl])
            })
          }else{
            message.error(resp.msg)
          }
        }
    };
  removefile=(file,fileurl)=>{ //删除文件
    this.setState({[fileurl]:''})
  };
  //限制上传大小
    beforeUpload = (file) =>{
        console.log("file",file);
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            Modal.error({
                title: '超过20M限制 不允许上传!'
            })
        }
        return isLt2M;
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
                      <Upload beforeUpload={this.beforeUpload} {...this.property} headers={token } onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
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
              <FormItem key="buts" style={{display:'flex','justify-content':'flex-end'}}>
                <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
              </FormItem>
          </Form>         
        </Modal>
      </div>
    );
  }
}

export default ItemModel=Form.create({})(ItemModel);

