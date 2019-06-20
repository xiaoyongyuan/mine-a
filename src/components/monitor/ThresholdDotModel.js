import React, { Component } from 'react';
import {Modal,InputNumber, Select, Form, Button} from 'antd'
import ofteraxios from '../../axios/ofter'
const FormItem = Form.Item;
const Option = Select.Option;
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
  componentWillMount(){


  }
  componentWillReceiveProps(nextProps){
      if( nextProps.newShow !== vis){
          vis=nextProps.newShow;
          if(nextProps.newShow){
              ofteraxios.thresholdDotlist(this.props.netid).then(res=>{ //监测点列表
                  if(res.success){
                      var project=[];
                      res.data.map(item=>project.push({code:item.code,name:item.pointname}));
                      this.setState({project,selectp:project.length?project[0].code:''})
                  }
              })

              // this.setState({
              //     code:nextProps.code,
              //     type:nextProps.type
              // }, () => {
              //     this.requestdata();
              // });

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
          console.log("values234",values);
          if (!err) {
              var data=values;
              // data.filename_cad=_this.state.cad;
              // data.itemtype=2;
              // data.filepath=_this.state.filepath;
              // data.excel=_this.state.excel;
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
          title="监测点阈值新增"
          visible={this.props.newShow}
          code={this.props.code}
          onCancel={this.reset}
          footer={null}
        >
          <Form className='baseform' {...formItemLayout} >
              <FormItem label='监测点' key='projectid'>
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
              <FormItem label='高阈值' key='heightvalue'>
                  {
                      getFieldDecorator('heightvalue')(
                          <InputNumber key='memoInput' />
                      )
                  }
              </FormItem>
              <FormItem label='低阈值' key='lowvalue'>
                  {
                      getFieldDecorator('lowvalue')(
                          <InputNumber key='memoInput' />
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

export default ItemModel=Form.create({})(ItemModel);

