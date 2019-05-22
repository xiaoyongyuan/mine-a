import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import moment from 'moment'
import axios from '../../axios'
import ofterajax from '../../axios/ofter'

import "./index.less"
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class FilterForm extends React.Component{
    state={
      monitoring:[],
    }

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    selectChange=(key,val)=>{
        console.log(key,val)
        this.props.form.setFieldsValue({[key]:val})

    }
    dot=()=>{
        const _this=this;
        ofterajax.dot().then((res)=>{
            this.setState({monitoring:res})
        })
        
    }

    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type==='RANGPICKER'){
                    const RANGPICKER = <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field],{
                                initialValue: item.initialValue?[moment(item.initialValue[0]),moment(item.initialValue[1])]:null
                            })(
                                <RangePicker showTime={item.showTime || false} format={item.format || "YYYY-MM-DD"}/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(RANGPICKER)
                }else if(item.type==='datePicker'){
                    const datePicker = <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field],{
                                initialValue: moment(item.initialValue)
                            })(
                                <DatePicker showTime={item.showTime || false} format={item.format || "YYYY-MM-DD"}/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(datePicker)
                }else if(item.type === 'INPUT'){
                    const INPUT = <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field],{
                                initialValue: item.initialValue
                            })(
                                <Input key={item.field} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field], {
                                initialValue: item.initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={item.placeholder}

                                >
                                    {item.list.map(city => (
                                        <Option value={city.code}>{city.name}</Option>
                                    ))} 
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }else if(item.type === 'monitoring'){ //监测点列表
                    if(!this.state.monitoring.length){
                        this.dot();
                    }
                    var initial='';
                    if(item.initial){
                        item.initial=initial
                    }else{
                        if(item.own){
                           item.initial='' 
                        }else{
                            if(this.state.monitoring.length)item.initial=this.state.monitoring[0].pointid
                        }
                    }
                    const selectdot=<FormItem label={item.label} key={item.field || 'dot'}>
                        {
                            getFieldDecorator([item.field|| 'dot'], {
                                initialValue: initial
                            })(
                            <Select
                                key='dots'
                                style={{ minWidth: '100px' }}
                                placeholder={item.placeholder}
                                onChange={(value)=>this.selectChange(item.field|| 'dot',value)}
                            >
                                {item.own?<Option key='dotq1' value=''>所有</Option>:null}
                                {this.state.monitoring.map(city => (
                                    <Option key={city.pointid} value={city.pointid}>{city.checkname}</Option>
                                ))} 
                            </Select>
                        )
                        }
                    </FormItem>
                    formItemList.push(selectdot)
                
                }else if(item.type === 'sensor'){ //传感器列表 

                }else if(item.type === 'equiptype'){ //传感器列表 

                }else{}
            })
        }
        return formItemList;
    }
    render(){
        return (
            <Form className='baseform' layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);