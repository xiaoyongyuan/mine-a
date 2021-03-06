import React, { Component } from 'react';
import {Button,Row,Col,Input,Upload, Icon, message,Form } from "antd";
import "../../style/yal/css/companyinfoEdit.less";
import axios from "../../axios";
const { TextArea } = Input;
const FormItem = Form.Item;
const token={AUTHORIZATION: 'Bearer '+localStorage.getItem("token")};
class companyinfoEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            str:'北斗环境',
            isEdite:true,
            disabledbtn:false, //按钮可点击状态
        };
    }
    componentDidMount(){
        this.requestList();
    };
    requestList = ()=>{

        axios.ajax({
            baseURL:window.g.fileURL,
            method: 'get',
            url: '/api/companyByLoginUser',

        }).then((res)=>{
            if(res.success){
                this.setState({
                    code:res.data.code,//編碼
                    cname:res.data.cname,//企业名称
                    addrs:res.data.location,//企业地址
                    username:res.data.legalperson,//法人
                    logo:res.data.logo,//企业logo
                    tel:res.data.linktel,//联系电话
                    email:res.data.emailaddress,
                    zcaddrs:res.data.address,//企业注册地址
                    projectcname:res.data.cname,
                    intro:res.data.currentinfo,
                    projectusername:res.data.linkmen,//项目联系人
                    prijecttel:res.data.linktel,
                    projectemail:res.data.emailaddress,
                    projectaddrs:res.data.addrs
                })
            }
        },(res)=>{});
    };

    beforeUpload=(file)=> {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('请上传JPG/PNG图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片大小在2MB内!');
        }
        return isJpgOrPng && isLt2M;
      }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl => {
                if(info.file.response.success==0){
                    message.error(info.file.response.msg);
                    return;
                }

                this.setState({
                    imageUrl,
                    loading: false,
                    logo:info.file.response.data.url,
                })
            
            
            });
        }
    };

    onChange = str => {
        this.setState({ str });
    };
    //编辑
    handleEditClick = () => {
        this.setState({
            oldcname:this.state.cname,
            oldlogo:this.state.logo,
            oldaddrs:this.state.addrs,
            oldusername:this.state.username,
            isEdite:false,
            oldtel:this.state.tel,
            oldemail:this.state.email,
            oldprojectcname:this.state.projectcname,
            oldintro:this.state.intro,
            oldprojectusername:this.state.projectusername,
            oldprijecttel:this.state.prijecttel,
            oldprojectemail:this.state.projectemail,
            oldprojectaddrs:this.state.projectaddrs,
            oldzcaddrs:this.state.zcaddrs,
        })
    };
    //邮箱失去焦点
    demo = (e) => {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var obj = document.getElementById("email"); //要验证的对象
        if(filter.test(obj.value)){
            return true;
        }
        else{
            alert('您的电子邮件格式不正确');
            return false;
        }
    };
    //提交
    handleSubmitClick = (e) =>{
        e.preventDefault();
        if(!this.demo()){
            return false;
        }
        this.setState({disabledbtn:true});
        this.setState({
            cname:this.state.cname,
            addrs:this.state.addrs,
            username:this.state.username,
            isEdite:true,
            tel:this.state.tel,
            email:this.state.email,
            projectcname:this.state.projectcname,
            intro:this.state.intro,
            projectusername:this.state.projectusername,
            prijecttel:this.state.prijecttel,
            projectemail:this.state.projectemail,
            projectaddrs:this.state.projectaddrs,
            zcaddrs:this.state.zcaddrs,
        });
        const data={
            code:this.state.code,
            cname:this.state.cname,
            location:this.state.addrs,
            legalperson:this.state.username,
            linktel:this.state.tel,
            emailaddress:this.state.email,
            address:this.state.zcaddrs,
            currentinfo:this.state.intro,
            linkmen:this.state.projectusername,
            logo:this.state.logo,
        };
        axios.ajax({
            baseURL:window.g.fileURL,
            method: 'put',
            url: '/api/company',
            data: data
        }).then((res)=>{
            if(res.success === 1){
                message.success('编辑成功',2,()=>window.location.href="#/main/companyinfo");
            }else if(res.success === 0){
                this.setState({disabledbtn:false})
                message.error('修改企业失败');
            }
        },(res)=>{});
    };
    //取消
    handleCancleClick = () =>{
        window.location.href="#/main/companyinfo";
    };
    //输入企业名称
    InputonChange = (e) =>{
        this.setState({
            cname:e.target.value
        });
    };
    //输入企业地址
    InputassressonChange = (e) =>{
        this.setState({
            addrs:e.target.value
        });
    };
    //法人
    InputusernameOnChange = (e) =>{
        this.setState({
            username:e.target.value
        });
    };
    //联系电话
    InputTelOnChange = (e) =>{
        this.setState({
            tel:e.target.value
        });
    };
    //企业邮箱
    InputEmailOnchange = (e) =>{
        this.setState({
            email:e.target.value
        })
    };
    //企业注册地址
    InputzcaddrsOnchange = (e) =>{
        this.setState({
            zcaddrs:e.target.value
        })
    };
    //项目名称
    InputProjectNameOnchange = (e) =>{
        this.setState({
            projectcname:e.target.value
        })
    };
    //项目简介
    InputProjectintroOnchange = (e) =>{
        this.setState({
            intro:e.target.value
        })
    };
    //项目联系人
    InputProjectusernameOnChange = (e) =>{
        this.setState({
            projectusername:e.target.value
        });
    };
    //联系电话
    InputProjectTelOnChange = (e) =>{
        this.setState({
            prijecttel:e.target.value
        });
    };
    //电子邮箱
    InputProjectEmailOnchange = (e) =>{
        this.setState({
            projectemail:e.target.value
        })
    };
    //项目地址
    InputProjectzcaddrsOnchange = (e) =>{
        this.setState({
            projectaddrs:e.target.value
        })
    };
    //邮箱失去焦点
    demo = (e) => {
        var filter=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
        var obj = document.getElementById("email"); //要验证的对象
       if(filter.test(obj.value)){
           return true;
        }
        else{
           alert('您的电子邮件格式不正确');
           return false;
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传企业logo</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div className="Companyinfo">
                <div className="box-padding">
                    <Row>
                        <Col span={12}>
                            <p> <Icon type="bars" />企业信息</p>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业名称：
                        </Col>
                        <Col span={21} className="t_l">
                             <Input onChange={this.InputonChange.bind(this)} value={this.state.cname} />
                             <Input  value={this.state.code} type="hidden"/>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业logo：
                        </Col>
                        <Col span={21} className="t_l">
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={window.g.fileURL+"/api/uploadFile"}
                                beforeUpload={this.beforeUpload}
                                headers={token}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="logo" /> : uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="introbottom">
                            <p> </p>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业地址：
                        </Col>
                        <Col span={21} className="t_l">
                            <Input   onChange={this.InputassressonChange.bind(this)} value={this.state.addrs} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            法人：
                        </Col>
                        <Col span={21} className="t_l">
                            <Input   onChange={this.InputusernameOnChange.bind(this)} value={this.state.username} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            联系电话：
                        </Col>
                        <Col span={21} className="t_l">
                            <Input   onChange={this.InputTelOnChange.bind(this)} value={this.state.tel} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业邮箱：
                        </Col>
                        <Col span={21} className="t_l">
                            {/*<FormItem label="用户名：">*/}
                                {/*{*/}
                                    {/*(*/}
                                    {/*<Input onBlur={this.demo} id="email"   onChange={this.InputEmailOnchange.bind(this)} value={this.state.email} />*/}
                                    {/*)*/}
                                {/*}*/}
                            {/*</FormItem>*/}
                            <Input onBlur={this.demo} id="email"   onChange={this.InputEmailOnchange.bind(this)} value={this.state.email} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业注册地址：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input   onChange={this.InputzcaddrsOnchange.bind(this)} value={this.state.zcaddrs} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col className="t_r_button" span={12} push={3}>
                            <div>
                                <Button type="primary" disabled={this.state.disabledbtn} onClick={this.handleSubmitClick}>提交</Button>
                                <Button className="canclebtn" disabled={this.state.disabledbtn} onClick={this.handleCancleClick}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default companyinfoEdit;
