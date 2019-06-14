import React, { Component } from 'react';
import {Modal,InputNumber , Select, Form, Button} from 'antd'
import ofteraxios from '../../axios/ofter'
const FormItem = Form.Item;
const Option = Select.Option;
class ThresholdModel extends Component {
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
      console.log("nextProps",nextProps);
      if(nextProps.newShow){
          ofteraxios.projectlist().then(res=>{ //项目列表
              if(res.success){
                  var project=[];
                  res.data.map(
                      item=>project.push(
                          {
                              code:item.code,
                              name:item.title
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
      }
    }
  componentDidMount(){

  }
  reset = ()=>{ //取消表单
    this.setState({
        projectid:'',
        montinetid:'',
        equiptypeid:'',
        heightvalue:'',
        lowvalue:'',
        montinet:[],
        equiptype:[],
    });
      this.props.form.resetFields();
      this.props.uploadreset()
  };
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          console.log("values33",values);
          if (!err) {
              var data=values;
              // data.filename_cad=_this.state.cad;
              // data.filepath=_this.state.filepath;
              // data.excel=_this.state.excel;
              _this.props.filterSubmit(data);
              _this.props.form.resetFields();
          }
      });
        
  };
    projectidChange = (value) =>{
        console.log("value",value);
        ofteraxios.montinetlist(value).then(res=>{ //监测网列表
            if(res.success){
                var montinet=[];
                res.data.map(
                    item=>montinet.push(
                        {
                            code:item.code,
                            name:item.name
                        }
                    )
                );
                this.setState(
                    {
                        projectid:value,
                        montinet,
                        selectmontinet:montinet.length?montinet[0].code:''
                    }
                )
            }
        });
    };
    montinetidChange =(value)=>{
        console.log("value",value);
        ofteraxios.equiptypelist(this.state.projectid,value).then(res=>{ //设备类型列表
            if(res.success){
                var equiptype=[];
                res.data.map(
                    item=>equiptype.push(
                        {
                            code:item.code,
                            name:item.name
                        }
                    )
                );
                this.setState(
                    {
                        equiptype,
                        selectequiptype:equiptype.length?equiptype[0].code:''
                    }
                )
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
      <div className="ThresholdModel">
        <Modal
          title="监测网阈值新增"
          visible={this.props.newShow}
          onCancel={this.reset}
          footer={null}
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='规划方案' key='projectid'>
                  {
                      getFieldDecorator('projectid', {
                          rules:[{
                              required: true,
                              message: '请选择规划方案',
                          }],
                          initialValue: this.state.selectp
                      })(
                          <Select onChange={this.projectidChange}>
                              {this.state.project.map(city => (
                                  <Option key={city.code} value={city.code}>{city.name}</Option>
                              ))}
                          </Select>
                      )
                  }
              </FormItem>
              <FormItem label='监测网' key='montinetid'>
                  {
                      getFieldDecorator('montinetid', {
                          rules:[{
                              required: true,
                              message: '请选择监测网',
                          }],
                          initialValue: '----请选择----'
                      })(
                          <Select onChange={this.montinetidChange}>
                              {this.state.montinet.map(city => (
                                  <Option key={city.code} value={city.code}>{city.name}</Option>
                              ))}
                          </Select>
                      )
                  }
              </FormItem>
              <FormItem label='设备类型' key='equiptypeid'>
                {
                    getFieldDecorator('equiptypeid', {
                        rules:[{
                          required: true,
                          message: '请选设备类型',
                        }],
                        initialValue: '----请选择----'
                    })(
                        <Select>
                          {this.state.equiptype.map(city => (
                              <Option key={city.code} value={city.code}>{city.name}</Option>
                          ))}     
                        </Select>
                      )
                  }
              </FormItem>

              <FormItem label='高阈值' key='heightvalue'>
                  {
                      getFieldDecorator('heightvalue')(
                          <InputNumber  key='memoInput' />
                      )
                  }
              </FormItem>
              <FormItem label='低阈值' key='lowvalue'>
                  {
                      getFieldDecorator('lowvalue')(
                          <InputNumber  key='memoInput' />
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
  }
}

export default ThresholdModel=Form.create({})(ThresholdModel);

