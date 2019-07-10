import React, { Component } from 'react';
import {Button, Form, Icon, message, Modal, Upload} from 'antd';
import "../../style/yal/css/userinfo.less";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};
class EquipListModalForm extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:props.visible || false,
            form:false
        };
        this.fileList={
            filepath:[],
        };
    }
    componentDidMount() {

    }
    reset = ()=>{ //取消表单
        this.fileList={
            filepath:[],
        };
        this.props.form.resetFields();
        this.props.uploadreset();
    };
    handleChange = (info,fileurl) => {
        let switchUp=true;
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        console.log('info.file.size',info.file);
        if( info.file.size / 1024 / 1024 > 20){ //只能上传20M以内的文件
            message.error('请上传20M以内的文件');
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
    handleFilterSubmit = ()=>{//表单提交
        const _this=this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var data={};
                data.filePath=values.filepath.fileList[0].url;
                _this.props.filterSubmit(data);
                _this.props.form.resetFields();
                _this.reset();
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const property = {
            accept:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            action:window.g.fileURL+"/api/uploadFile",
            multiple: false,
            headers:{AUTHORIZATION: 'Bearer '+localStorage.getItem("token")},//请求头
        };
        return(
            <div className="tc-label">
                <Modal
                    title="上传"
                    visible={this.props.newShow}
                    onCancel={this.reset}
                    footer={null}
                >
                    <Form {...formItemLayout}  layout="vertical">
                        <FormItem label="选择设备列表文件：">
                            {getFieldDecorator('filepath', {
                                rules: [{
                                    required: true, message: '请选择设备列表文件!',
                                }],
                            })(
                                <Upload fileList={this.fileList.filepath} onChange={(info)=>this.handleChange(info,'filepath')} {...property}>
                                    <Button>
                                        <Icon type="upload" /> 导入设备列表
                                    </Button>
                                </Upload>
                            )}
                        </FormItem>
                        <FormItem key="buts" style={{display:'flex',justifyContent:'flex-end'}}>
                            <Button style={{ margin: '0 10px' }} onClick={this.reset}>取消</Button>
                            <Button type='primary' onClick={this.handleFilterSubmit}>确定</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default EquipListModalForm = Form.create({})(EquipListModalForm);