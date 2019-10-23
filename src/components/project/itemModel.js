import React, { Component } from 'react';
import {Modal,message, Input, Select, Form, Button, Upload, Icon} from 'antd'
import ofteraxios from '../../axios/ofter'
import axios from "../../axios";
const FormItem = Form.Item;
const Option = Select.Option;
let vis=false;
class ItemModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
      moreSelects:[],
    };
      this.fileList={
          filepath:[],
      };
  }
  moreSelects = () => {
    //下拉搜索
    // console.log("下拉搜索");
    let _this=this;
    ofteraxios.projectlist().then(res=>{ //项目列表
      if(res.success){
          var project=[];
          res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
          _this.setState({ moreSelects: project },()=>{
            // console.log("下拉搜索",this.state.moreSelects);
          });
      }
    })
  };
  mapOption(){
    const option = this.state.moreSelects.map((city) => (
        <Option
        key={city.code}
        value={city.code}
        >
        {city.name}
        </Option>
    ));
    return option

}
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentWillReceiveProps(nextProps){
      if(nextProps.newShow !== vis){
          vis=nextProps.newShow;
          if(nextProps.newShow){
              ofteraxios.projectlist().then(res=>{ //项目列表
                  if(res.success){
                      var project=[];
                      res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
                      this.setState({project,selectp:project.length?project[0].code:''})
                  }
              },()=>{});
              this.setState({
                  code:nextProps.code
              },()=>{
                  this.requestdata();
                  this.moreSelects();
              })
          }
      }
  }
    requestdata=() => {//取数据
        if(this.state.code){
            const data={
                itemfileId:this.state.code,
            };
            axios.ajax({
                baseURL:window.g.bizserviceURL,
                method: 'get',
                url: '/api/getItemfileById',
                data: data
            }).then((res)=>{
                if(res.success){
                    if(res.data){
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
                            projectid:res.data.projectid,//项目名称
                            itemtitle:res.data.itemtitle,//名称
                            filepath:obj,
                            memo:res.data.memo,//备注
                        });
                    }

                }
            },(res)=>{});
        }
    };
  reset = ()=>{ //取消表单
      this.fileList={
          filepath:[],
      };
      this.props.form.resetFields();
      this.props.uploadreset()
  };
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
            // if(values.filepath.fileList.length == 0){
            //     console.log(66666);
            //     message.error('请重新上传文件');
            //     return;
            // }
              var data={};
              data.itemtitle=values.itemtitle;
              data.filepath=values.filepath.fileList[0].url;
              data.oldfilename = values.filepath.fileList[0].name;
              data.memo=values.memo;
              data.projectid=values.projectid;
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
      const property={
          accept:"application/pdf",
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
                    })(
                        <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="项目名称"
                        optionFilterProp="children"
                        filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.moreSelects?this.mapOption():""}
                        </Select>
                      )
                  }
              </FormItem>
              {/* <FormItem label='项目' key='projectid'>
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
              </FormItem> */}
              <FormItem label='文件' key='modoc'>
                  {getFieldDecorator('filepath', {
                      rules: [{
                            required: true,
                            message: '请上传文件',
                          }],
                    })(
                      <Upload fileList={this.fileList.filepath} {...property} onChange={(info)=>this.uploadchange(info,'filepath')} onRemove={(info)=>this.removefile(info,'filepath')}>
                        <Button>
                          <Icon type="upload" /> 选择pdf文件
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

export default ItemModel=Form.create({})(ItemModel);

