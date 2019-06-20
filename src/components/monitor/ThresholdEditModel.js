import React, { Component } from 'react';
import {Modal, InputNumber, Select, Form, Button, message, Input} from 'antd'
import ofteraxios from '../../axios/ofter'
import axios from "../../axios";
const FormItem = Form.Item;
const Option = Select.Option;
let vis=false;
class ThresholdEditModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
        montinet:[],//监测网列表
        selectmontinet:'',//选择的监测方案
        equiptype:[],//设备类型列表
        selectequiptype:'',//选择的设备类型
    };
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };
  componentWillMount(){

  }
    componentWillReceiveProps(nextProps){
      console.log("nextProps1122",nextProps);

        if( nextProps.newShow !== vis){
            vis=nextProps.newShow;
            if(nextProps.newShow){
                ofteraxios.projectlist().then(res=>{ //规划方案列表
                    if(res.success){
                        var project=[];
                        res.data.map(
                            item=>project.push(
                                {
                                    code:item.code,
                                    name:item.projectname
                                }
                            )
                        );
                        this.setState(
                            {
                                project,
                                selectp:project.length?project[0].code:''
                            }
                        )
                    }
                });

                this.setState({
                    code:nextProps.code,
                    type:nextProps.type
                }, () => {
                    this.requestdata();
                });

            }
        }
      // if(nextProps.newShow){
      //
      //
      //
      //
      // }
    }

    requestdata=() => {//取数据
        if(this.state.code){
            const data={
                code:this.state.code,
            };
            console.log("hhhcode出阿里",data);
            axios.ajax({
                baseURL:window.g.deviceURL,
                method: 'get',
                url: '/api/monitorDeviceTypeById',
                data: data
            }).then((res)=>{
                console.log("res111",res);
                if(res.success){
                    this.props.form.setFieldsValue({
                        lowvalue: res.data.minumum,//低阈值
                        heightvalue:res.data.maximum,//高阈值itemid
                        netname:res.data.netid,//
                        equiptypeid:res.data.devicetype,
                        memo:res.data.memo
                    });
                }
            });
        }
    };
  componentDidMount(){

  }
  reset = ()=>{ //取消表单
    this.setState({
        projectid:'',
        netname:'',
        equiptypeid:'',
        heightvalue:'',
        lowvalue:'',
        montinet:[],
        equiptype:[],
    });
      this.props.form.setFieldsValue({
          lowvalue: '',//低阈值
          heightvalue:'',//高阈值itemid
          netname:'',//
          equiptypeid:''
      });
      this.props.form.resetFields();
      this.props.uploadreset()
  };
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          console.log("values33",values);
          if (!err) {
              var data={
                  itemid:values.projectid,
                  // netname:values.netname,equiptypeid
                  netid:values.netname,
                  maximum:values.heightvalue,
                  minumum:values.lowvalue,
                  devicetype:values.equiptypeid,
                  memo:values.memo
              };
              data.code=this.state.code;
              axios.ajax({
                  baseURL:window.g.deviceURL,
                  method: 'put',
                  url: '/api/monitorDeviceType',
                  data: data
              }).then((res)=>{
                  const list=this.state.list;
                  if(res.success){
                      message.success('编辑成功！', 3);
                      this.setState({
                          list:list
                      });
                  }
              }).catch((error)=>{
                  console.log("error",error);
              });

              // data.filename_cad=_this.state.cad;
              // data.filepath=_this.state.filepath;
              // data.excel=_this.state.excel;
              this.props.uploadreset();
              _this.props.filterSubmit(data);
              _this.props.form.resetFields();
          }
      });
        
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
      <div className="ThresholdEditModel">
        <Modal
          title="监测网阈值编辑"
          visible={this.props.newShow}
          onCancel={this.reset}
          footer={null}
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='高阈值' key='heightvalue'>
                  {getFieldDecorator('heightvalue', {
                      rules: [{
                          required: true, message: '请输高阈值!',
                      }],
                  })(
                      <InputNumber  key='memoInput' />
                  )}
                  {/*{*/}
                      {/*getFieldDecorator('heightvalue')(*/}
                          {/*<InputNumber  key='memoInput' />*/}
                      {/*)*/}
                  {/*}*/}
              </FormItem>
              <FormItem label='低阈值' key='lowvalue'>
                  {getFieldDecorator('lowvalue', {
                      rules: [{
                          required: true, message: '请输低阈值!',
                      }],
                  })(
                      <InputNumber  key='memoInput' />
                  )}
                  {/*{*/}
                      {/*getFieldDecorator('lowvalue')(*/}
                          {/*<InputNumber  key='memoInput' />*/}
                      {/*)*/}
                  {/*}*/}
              </FormItem>
              <FormItem label='备注' key='memo'>
                  {getFieldDecorator('memo', {
                      // rules: [{
                      //     required: true, message: '请输低阈值!',
                      // }],
                  })(
                      <Input  key='memoInput' />
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

export default ThresholdEditModel=Form.create({})(ThresholdEditModel);

