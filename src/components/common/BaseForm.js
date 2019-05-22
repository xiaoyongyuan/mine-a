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
      equipment:[]
    }

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    selectChange=(key,val,type)=>{
        this.props.form.setFieldsValue({[key]:val})
        if(type){
            this.setState({dotint:val},()=>this.equipment())  
        }
    }
    equipment=()=>{ //获取监测点下的设备
        if(this.state.dotint){
            ofterajax.equipment({dot:this.state.dot}).then((res)=>{
                this.setState({equipment:res})
            })
        }
    }
    dot=(initialValue,own)=>{
        ofterajax.dot().then((res)=>{
            if(res.length){
                var dotint;
                if(initialValue){
                    dotint=initialValue
                }else own?dotint='':dotint=res[0].pointid
                this.setState({
                    monitoring:res,
                    dotint:dotint
                }) 
            }
            
        })  
        
        
        
    }

    initFormList = ()=>{
        const _this=this;
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length>0){
            formList.forEach((item,i)=>{
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
                                    style={{ width: item.width }}
                                    placeholder={item.placeholder}

                                >
                                    {item.list.map(city => (
                                        <Option key={city.code} value={city.code}>{city.name}</Option>
                                    ))} 
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={item.label} key={item.field}>
                        {
                            getFieldDecorator([item.field], {
                                valuePropName: 'checked',
                                initialValue: item.initialValue //true | false
                            })(
                                <Checkbox>
                                    {item.label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }else if(item.type === 'monitoring'){ //监测点列表
                    if(!this.state.monitoring.length){
                        this.dot(item.initialValue,item.own);
                    }
                    
                    const selectdot=<FormItem label={item.label} key={item.field || 'dot'}>
                        {
                            getFieldDecorator([item.field|| 'dot'], {
                                initialValue: _this.state.dotint
                            })(
                            <Select
                                key='dots'
                                style={{ minWidth: '100px' }}
                                placeholder={item.placeholder}
                                onChange={(value)=>this.selectChange(item.field|| 'dot',value,'monitoring')}
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
                }else if(item.type === 'equipment'){ //设备列表
                    if(!this.state.equipment)this.equipment();
                    const selectdot=<FormItem label={item.label} key={item.field || 'eqipe'}>
                        {
                            getFieldDecorator([item.field|| 'equipment'], {
                                initialValue: item.initialValue
                            })(
                            <Select
                                key='equip'
                                style={{ minWidth: '100px' }}
                                placeholder={item.placeholder}
                                onChange={(value)=>this.selectChange(item.field|| 'equipment',value)}
                            >
                                {item.own?<Option key='equipment1' value=''>所有</Option>:null}
                                {this.state.equipment.map(city => (
                                    <Option key={'equipment'+city.pointid} value={city.pointid}>{city.ename}</Option>
                                ))} 
                            </Select>
                        )
                        }
                    </FormItem>
                    formItemList.push(selectdot)

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