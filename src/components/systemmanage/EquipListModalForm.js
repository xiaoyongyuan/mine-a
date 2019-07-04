import React, { Component } from 'react';
import {Button, Form, Icon, Input, Upload} from 'antd';
import axios from "../../axios";
import "../../style/yal/css/userinfo.less";
const token={AUTHORIZATION: 'Bearer '+localStorage.getItem("token")};
const FormItem = Form.Item;
let vis=false;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
        lg:{span:9},
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
        lg:{span:15},
    },
};
class EquipListModalForm extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:props.visible || false,
            form:false
        };
    }
    componentDidMount() {

    }
    formref = () => { //将form传给父组件由父组件控制表单提交
        return this.props.form;
    };
    handleChange = info => {
        let fileList = [...info.fileList];
        console.log("info",info);
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };
    render(){
        const { getFieldDecorator } = this.props.form;   
        const _this=this;
        const props = {
            accept:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            // action:window.g.deviceURL+ '/api/equipmentImport',application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
            action:window.g.fileURL+"/api/uploadFile",
            onChange: this.handleChange,
            multiple: false,
        };
        return(
            <div className="tc-label">
                <Form {...formItemLayout}  layout="vertical">
                    <FormItem label="选择设备列表文件：">
                        {getFieldDecorator('filepath', {
                            rules: [{
                                required: true, message: '请选择设备列表文件!',
                            }],
                        })(
                            <Upload {...props} headers={token } fileList={this.state.fileList}>
                                <Button>
                                    <Icon type="upload" /> 导入设备列表
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default EquipListModalForm = Form.create({})(EquipListModalForm);