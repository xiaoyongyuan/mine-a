import React, { Component } from 'react';
import {Modal, Form, message, Input, Upload, Button, Icon,DatePicker } from 'antd'
import axios from "../../axios";
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker, } = DatePicker;
let vis=false;
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
      this.fileList={
          filepath:[],
      };
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentDidMount(){

  }
    componentWillReceiveProps(nextProps){
        if( nextProps.newShow !== vis){
            vis=nextProps.newShow;
            if(nextProps.newShow){
                this.setState({
                    code:nextProps.code
                }, () => {
                    console.log("code",this.state.code);
                    this.requestdata();
                });
            }
        }
    }
    requestdata=() => {//取数据
        if(this.state.code){
            const data={
                projectId:this.state.code,
            };
            axios.ajax({
                baseURL:window.g.bizserviceURL,
                method: 'get',
                url: '/api/getProjectById',
                data: data
            }).then((res)=>{
                if(res.success){
                    console.log("res",res);
                    this.props.form.setFieldsValue({
                        projectname:res.data.projectname,//项目名称
                        memo:res.data.memo,//备注
                        doubledata:[moment(res.data.begindate),moment(res.data.enddate)],
                    });
                }
            },(res)=>{});
        }
    };
  reset = ()=>{ //取消表单
      this.fileList={
          filepath:[],
      };
      this.props.form.resetFields();
      this.props.uploadreset();
  };

    handleFilterSubmit = ()=>{//表单提交
        const _this=this;
        this.props.form.validateFields((err, values) => {
            console.log("values",values);
            if (!err) {
                var data={};
                  data.projectname=values.projectname;
                  data.filepath=values.uploader.fileList[0].url;
                  data.begindate=values.doubledata[0].format('YYYY-MM-DD');
                  data.enddate=values.doubledata[1].format('YYYY-MM-DD');
                  data.oldfilename = values.uploader.file.name;
                data.memo=values.memo;
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
        if( info.file.size / 1024 / 1024 > 100){ //只能上传100M以内的文件
            message.error('请上传100M以内的文件');
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
                <FormItem label='项目名称' key='pname'>
                    {
                        getFieldDecorator('projectname',{
                            rules:[{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input key='montInput' />
                        )
                    }
                </FormItem>
                <FormItem label='年份' key='year'>
                    {
                        getFieldDecorator('doubledata',{
                            rules:[{
                                required: true,
                                message: '请选择年份',
                            }],
                        })(
                            <RangePicker />
                        )
                    }
                </FormItem>
                <FormItem label='上传' key='mofiel'>
                    {getFieldDecorator('uploader', {
                        rules: [{
                            required: true,
                            message: '请上传文件',
                        }],
                    })(
                        <Upload fileList={this.fileList.filepath} {...property} accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
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

