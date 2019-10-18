import React, { Component } from 'react';
import {Modal, Form, message, Input, Upload, Button, Icon,DatePicker,Select } from 'antd'
import axios from "../../axios";
import ofterajax from "../../axios/ofter";
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker, } = DatePicker;
const { Option } = Select;
let vis=false;
class UploadModel extends Component {
  constructor(props){
    super(props);
    this.state={
    };
      this.fileList={
          filepath:[],
          moreSelects:[],
      };
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  moreSelects = () => {
    //下拉搜索
    console.log("下拉搜索");
    let _this=this;
    // var opt;
    ofterajax.projectlist().then(res=>{ //项目列表
      if(res.success){
          var project=[];
          res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
          _this.setState({ moreSelects: project },()=>{
            console.log("下拉搜索",this.state.moreSelects);
          });
      }
    })
  };
//   componentWillMount(){
//     this.moreSelects();
//   }
    componentWillReceiveProps(nextProps){
        if( nextProps.newShow !== vis){
            vis=nextProps.newShow;
            if(nextProps.newShow){
                this.setState({
                    code:nextProps.code
                }, () => {
                    this.moreSelects();
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
                    var fileList = [
                        {
                            name:res.data.oldfilename,
                            url:res.data.filepath
                        }
                    ];
                    var obj  = {
                        fileList
                    };
                    this.fileList={
                        filepath:[
                            {
                                uid: '-1',
                                name: res.data.oldfilename,
                                status: 'done',
                                url: res.data.filepath,
                            },
                        ],
                    };
                    this.props.form.setFieldsValue({
                        projectname:res.data.projectname,//项目名称
                        memo:res.data.memo,//备注
                        doubledata:[moment(res.data.begindate),moment(res.data.enddate)],
                        uploader:obj
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
            
            
            if (!err) {
                console.log(values);
                // if(values.uploader.fileList.length == 0){
                //     message.error('请重新上传文件');
                //     return;
                // }
               

                var data={};
                  data.projectname=values.projectname;
                  data.filepath=values.uploader.fileList[0].url;
                  data.begindate=values.doubledata[0].format('YYYY-MM-DD');
                  data.enddate=values.doubledata[1].format('YYYY-MM-DD');
                  data.oldfilename = values.uploader.fileList[0].name;
                data.memo=values.memo;
                _this.props.filterSubmit(data);
                _this.props.form.resetFields();
                _this.reset();
            }
        });
    };

    uploadchange=(info,fileurl)=>{ //上传文件
        let switchUp=true;
        // console.log("info",info);
        // console.log("fileurl",fileurl);
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
        this.fileList[fileurl]=[];
        const data={
            filePath:file.url,
        };
        axios.ajax({
            baseURL:window.g.fileURL,
            method: 'get',
            url: '/api/delFile',
            data: data
        }).then((res)=>{
            if(res.success){
                message.success('删除成功！');
            }
        },(res)=>{});
    };

  render() {
      let _this=this;
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
    //   console.log(_this.state.moreSelects);
    //   if (this.state.moreSelects.length==0) this.moreSelects();
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
                {getFieldDecorator("projectname", {
                    required: true,
                    message: '请输入标题',
                })(
                    <div>
                    {this.state.moreSelects?
                        <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="项目名称"
                    optionFilterProp="children"
                    filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.moreSelects.map(city => (
                        <Option
                        key={city.code}
                        value={city.name}
                        >
                        {city.name}
                        </Option>
                    ))}</Select>
                    :""
                    }
                    </div>
                   
                )}
                </FormItem>
                {/* <FormItem label='项目名称' key='pname'>
                    {
                        getFieldDecorator('projectname',{
                            rules:[{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input key='montInputtitle' />
                        )
                    }
                </FormItem> */}
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
                        <Upload fileList={this.fileList.filepath} {...property} accept='application/pdf' onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
                            {/* 只上传pdf文件，所以不需要了: ,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document */}
                            <Button>
                                <Icon type="upload" /> 选择pdf文件
                            </Button>
                        </Upload>,
                    )}
                </FormItem>
                <FormItem label='备注' key='memo'>
                    {
                        getFieldDecorator('memo')(
                            <Input key='memoInputmemo' />
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

