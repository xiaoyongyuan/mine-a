import React from "react";
import {
  Input,
  Select,
  Form,
  Button,
  Checkbox,
  Radio,
  DatePicker,
  Upload,
  Icon,
  InputNumber,
  message
} from "antd";
import moment from "moment";
import ofterajax from "../../axios/ofter";
import "./index.less";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class FilterForm extends React.Component {
  state = {
    monitoring: [],
    equipment: [],
    moreSelects:[],
  };
  handleFilterSubmit = () => {
    //查询提交
    let fieldsValue = this.props.form.getFieldsValue();
    console.log(fieldsValue);
    this.props.filterSubmit(fieldsValue);
  };
  layerSubmit = () => {
    //弹窗提交
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var data = values;
        if (values.upload) data.fileurl = _this.state.fileurl;
        _this.props.filterSubmit(data);
        _this.props.form.resetFields();
      }
    });
  };
  reset = fafuns => {
    this.props.form.resetFields();
    if (fafuns) this.props[fafuns]();
  };
  selectChange = (key, val, type) => {
    this.props.form.setFieldsValue({ [key]: val });
    if (type) {
      this.setState({ dotint: val }, () => this.equipment());
    }
  };
  equipment = () => {
    //获取监测点下的设备
    if (this.state.dotint) {
      ofterajax.equipment({ dot: this.state.dot }).then(res => {
        this.setState({ equipment: res });
      });
    }
  };
  moreSelects = () => {
    //下拉搜索
    // console.log("下拉搜索");
    let _this=this;
    ofterajax.projectlist().then(res=>{ //项目列表
      if(res.success){
        console.log(res);
          var project=[];
          res.data.map(item=>project.push({code:item.code,name:item.projectname}) );
          _this.setState({ moreSelects: project });
          
      }
    })
  };
  uploadchange = info => {
    //上传文件
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const resp = info.file.response;
      if (resp.success) {
        this.setState({ fileurl: resp.data.url }, () => {
        });
      } else {
        message.error(resp.msg);
      }
    }
  };
  dot = (initialValue, own) => {
    ofterajax.dot().then(res => {
      if (res.length) {
        var dotint;
        if (initialValue) {
          dotint = initialValue;
        } else {
          own ? (dotint = "") : (dotint = res[0].pointid);
        }
        this.setState({
          monitoring: res,
          dotint: dotint
        });
      }
    });
  };
  initFormList = () => {
    const _this = this;
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if (formList.item && formList.item.length > 0) {
      formList.item.forEach((item, i) => {
        if (item.type === "RANGPICKER") {
          //双日期
          const RANGPICKER = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue
                  ? [moment(item.initialValue[0]), moment(item.initialValue[1])]
                  : null
              })(
                <RangePicker
                  showTime={item.showTime || false}
                  format={item.format || "YYYY-MM-DD"}
                />
              )}
            </FormItem>
          );
          formItemList.push(RANGPICKER);
          console.log(formItemList);
        } else if (item.type === "datePicker") {
          const datePicker = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: moment(item.initialValue)
              })(
                <DatePicker
                  showTime={item.showTime || false}
                  format={item.format || "YYYY-MM-DD"}
                />
              )}
            </FormItem>
          );
          formItemList.push(datePicker);
        } else if (item.type === "INPUT") {
          const INPUT = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue
              })(<Input key={item.field}  maxLength={100} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue
              })(
                <Select
                  style={{ width: item.width }}
                  placeholder={item.placeholder}
                >
                  {item.list.map(city => (
                    <Option key={city.code} value={city.code}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } 
        else if (item.type === "SELECTmore") {
          const SELECT = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  // placeholder="项目名称"
                  optionFilterProp="children"
                  style={{ width: item.width }}
                  placeholder={item.placeholder}
                  filterOption={(input, option) =>option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {item.list.map(city => (
                    <Option key={city.code} value={city.code}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        }else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                valuePropName: "checked",
                initialValue: item.initialValue //true | false
              })(<Checkbox>{item.label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type === "InputNumber") {
          const inputNumber = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue //true | false
              })(
                <InputNumber style={{ marginRight:"5px" }}
                  formatter={(value) =>
                    ` $${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}万元
            </FormItem>
          );
          formItemList.push(inputNumber);
        } else if (item.type === "Radiobut") {
          const Radiobut = (
            <FormItem label={item.label} key={item.field}>
              {getFieldDecorator(`${item.field}`, {
                rules: item.rules,
                initialValue: item.initialValue //true | false
              })(
                <Radio.Group buttonStyle="solid">
                  {item.list.map(city => (
                    <Radio.Button key={"item.field" + city.id} value={city.id}>
                      {city.text}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </FormItem>
          );
          formItemList.push(Radiobut);
        } else if (item.type === "monitoring") {
          //监测点列表
          if (!this.state.monitoring.length) {
            this.dot(item.initialValue, item.own);
          }
          const selectdot = (
            <FormItem label={item.label} key={item.field || "dot"}>
              {getFieldDecorator(`${item.field}` || "dot", {
                rules: item.rules,
                initialValue: _this.state.dotint
              })(
                <Select
                  key="dots"
                  style={{ minWidth: "100px" }}
                  placeholder={item.placeholder}
                  onChange={value =>
                    this.selectChange(item.field || "dot", value, "monitoring")
                  }
                >
                  {item.own ? (
                    <Option key="dotq1" value="">
                      所有
                    </Option>
                  ) : null}
                  {this.state.monitoring.map(city => (
                    <Option key={city.pointid} value={city.pointid}>
                      {city.checkname}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(selectdot);
        } else if (item.type === "equipment") {
          //设备列表
          if (!this.state.equipment) this.equipment();
          const selectdot = (
            <FormItem label={item.label} key={item.field || "eqipe"}>
              {getFieldDecorator(`${item.field}` || "equipment", {
                rules: item.rules,
                initialValue: item.initialValue
              })(
                <Select
                  key="equip"
                  style={{ minWidth: "100px" }}
                  placeholder={item.placeholder}
                  onChange={value =>
                    this.selectChange(item.field || "equipment", value)
                  }
                >
                  {item.own ? (
                    <Option key="equipment1" value="">
                      所有
                    </Option>
                  ) : null}
                  {this.state.equipment.map(city => (
                    <Option
                      key={"equipment" + city.pointid}
                      value={city.pointid}
                    >
                      {city.ename}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(selectdot);
        } else if (item.type === "upload") {
          //上传
          const uploade = (
            <Form.Item label={item.label} key="upload">
              {getFieldDecorator("upload", {
                rules: item.rules
              })(
                <Upload {...item.property} onChange={this.uploadchange}>
                  <Button>
                    <Icon type="upload" /> 选择文件
                  </Button>
                </Upload>
              )}
            </Form.Item>
          );
          formItemList.push(uploade);
        } else if (item.type === "moreSelect") {
          //moreSelect 下拉加搜索
          if (this.state.moreSelects.length==0) this.moreSelects();
          const moreSelect = (
            <FormItem label={item.label} key={item.field || "eqipe"}>
              {getFieldDecorator(`${item.field}` || "equipment", {
                rules: item.rules,
                // initialValue: item.initialValue
              })(
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
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(moreSelect);

        }else if (item.type === "moreSelectnum") {
          //moreSelect 下拉加搜索
          if (this.state.moreSelects.length==0) this.moreSelects();
          const moreSelect = (
            <FormItem label={item.label} key={item.field || "eqipe"}>
              {getFieldDecorator(`${item.field}` || "equipment", {
                rules: item.rules,
                // initialValue: item.initialValue
              })(
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
                      value={city.code}
                    >
                      {city.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(moreSelect);

        }else if (item.type === "button") {
          //button
          const Buttons = (
            <FormItem key="buts" style={{display:'flex',justifyContent:'flex-end'}}>
              {item.button.map((el, ind) => (
                <Button
                  key={"but" + ind}
                  type={el.type}
                  style={{ margin: "0 10px" }}
                  onClick={() => this[el.click](el.fafuns)}
                >
                  {el.label}
                </Button>
              ))}
            </FormItem>
          );
          formItemList.push(Buttons);
        } else {
        }
      });
    }
    return formItemList;
  };
  render() {
    const formList = this.props.formList;
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
      <div>
        {formList.type ? (
          <Form className="baseform" layout="inline" style={{display:'flex'}}>
            {this.initFormList()}
          </Form>
        ) : (
          <Form className="baseform" {...formItemLayout}>
            {this.initFormList()}
            {/* style={{display:'flex'}} */}
          </Form>
        )}
      </div>
    );
  }
}
export default Form.create({})(FilterForm);
