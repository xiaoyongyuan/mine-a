import React, { Component } from 'react';
import {Modal,message, Form, Button, Upload, Icon} from 'antd'
import ofteraxios from '../../axios/ofter'
const FormItem = Form.Item;
class CheckReportModel extends Component {
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

