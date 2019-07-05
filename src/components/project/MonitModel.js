import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Upload, Icon} from 'antd'
import ofteraxios from '../../axios/ofter'
import axios from '../../axios'
const FormItem = Form.Item;
const Option = Select.Option;
let vis=false;
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
    componentWillReceiveProps(nextProps){
        if( nextProps.newShow !== vis){
            vis=nextProps.newShow;
            if(nextProps.newShow){
                ofteraxios.projectlist().then(res=>{ //项目列表
                    if(res.success){
                        var project=[];
                        res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
                        this.setState({project,selectp:''})
                    }
                })
            }
        }
    }
  componentDidMount(){}
  reset = ()=>{ //取消表单
      this.fileList={
          filepath:[],
          filepathcad:[],
          filepathexcel:[],
      };
      this.props.form.resetFields();
      this.props.uploadreset();
  };
  handleFilterSubmit = ()=>{//表单提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          console.log(values,'values33');
          if (!err) {
              var data={};
              data.projectid=values.projectid;
              data.itemtitle=values.itemtitle;
              data.memo=values.memo;
              data.filepath=values.filepath.fileList[0].url;
              data.filepathcad=values.filepathcad.fileList[0].url;
              data.filepathexcel=values.filepathexcel.fileList[0].url;
              _this.props.filterSubmit(data);
              _this.props.form.resetFields();
              _this.reset();
          }
      });
  };

    uploadchange=(info,fileurl)=>{ //上传文件
        let switchUp=true;
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        const isLt2M = info.file.size / 1024 / 1024 < 20;
        console.log('info.file.size',info.file);
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
  selectproj=(value)=>{
    const _this=this;
    axios.ajax({
        baseURL:window.g.bizserviceURL,
        method: 'get',
        url: '/api/checkitemFile',
        data: {
          itemtype:11,
          projectid:value
        }
    }).then((res)=>{
      if(!res.success){
        var project=_this.state.project;
        _this.props.form.setFieldsValue({ projectid: '' });
        project.map((item,i)=>{
          if(item.code===value) project[i].disabled=true
        });
        this.setState(project)
      }
    })
  };

  render() {
      const property={
          showUploadList:true,
          multiple:false,
          name:"file" ,
          action:window.g.fileURL+"/api/uploadFile", //上传地址
          headers:{AUTHORIZATION: 'Bearer '+localStorage.getItem("token")},//请求头
      };
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
      <div className="UploadModel">
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
                        <Select onChange={this.selectproj}
                        >
                          <Option key='noselect' value=''>请选择项目</Option>
                          {this.state.project.map(city => (
                              <Option key={city.code} value={city.code} disabled={city.disabled}>{city.name}</Option>
                          ))}     
                        </Select>
                      )
                  }
              </FormItem>
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
                      <Upload fileList={this.fileList.filepathcad} {...property} accept='application/acad,application/dxf' onChange={(info)=>this.uploadchange(info,'filepathcad')} onRemove={(info)=>this.removefile(info,'filepathcad')}>
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
                      <Upload fileList={this.fileList.filepathexcel} {...property} accept='application/vnd.ms-excel application/x-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={(info)=>this.uploadchange(info,'filepathexcel')} onRemove={(info)=>this.removefile(info,'filepathexcel')}>
                        <Button>
                          <Icon type="upload" /> 选择Excel文件
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

