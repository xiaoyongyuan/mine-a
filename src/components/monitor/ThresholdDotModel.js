import React, { Component } from 'react';
import {Modal, InputNumber, Form, Button, Input} from 'antd'
const FormItem = Form.Item;
let vis=false;
class ItemModel extends Component {
  constructor(props){
    super(props);
    this.state={
      project:[], //项目方案列表
      selectp:'', //选择的项目方案
    };
  }
  changeState=(key,val)=>{
      this.setState({[key]:val})
  };

  componentWillReceiveProps(nextProps){
      if( nextProps.newShow !== vis){
          vis=nextProps.newShow;
          if(nextProps.newShow){


              this.setState({
                  code:nextProps.code
              });
              this.props.form.setFieldsValue({
                  lowvalue: nextProps.minumum,//低阈值
                  heightvalue:nextProps.maximum,//高阈值itemid
                  memo:nextProps.memo
              });

          }
      }
  }
  componentDidMount(){

  }
  reset = ()=>{ //取消表单
    this.setState({
        projectid:'',
        heightvalue:'',
        lowvalue:''
    });
      this.props.form.resetFields();
      this.props.uploadreset()
  };
  handleFilterSubmit = ()=>{//查询提交
    const _this=this;
      this.props.form.validateFields((err, values) => {
          if (!err) {
              // var data=values;
             var data = {
                 code:this.state.code,
                 maximum:values.heightvalue,
                 minumum:values.lowvalue,
                 memo:values.memo,
             };
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
      <div className="ItemModel">
        <Modal
          title="监测点阈值编辑"
          visible={this.props.newShow}
          code={this.props.code}
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
              </FormItem>
              <FormItem label='低阈值' key='lowvalue'>
                  {getFieldDecorator('lowvalue', {
                      rules: [{
                          required: true, message: '请输低阈值!',
                      }],
                  })(
                      <InputNumber  key='memoInput' />
                  )}
              </FormItem>
              <FormItem label='备注' key='memo'>
                  {getFieldDecorator('memo')(
                      <Input  key='memoInput' />
                  )}
              </FormItem>
              <FormItem key="buts">
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

