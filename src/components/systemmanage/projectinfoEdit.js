import React, { Component } from 'react';
import {Button,Row,Col,Input, Icon, message } from "antd";
import "../../style/yal/css/companyinfoEdit.less";
import axios from "../../axios";
const { TextArea } = Input;
class projectinfoEdit extends Component {
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
            baseURL:window.g.bizserviceURL,
            method:'get',
            url:'api/getProject'
        }).then((res)=>{
            if(res.success){
                if(res.data !== null) {
                    console.log(res);
                    this.setState({
                        code:res.data.code,//編碼
                        projectcname: res.data.projectname,
                        intro: res.data.projectmemo,
                        projectusername: res.data.linkmen,//项目联系人
                        prijecttel: res.data.linktel,
                        emailaddress: res.data.emailaddress,
                        projectaddrs: res.data.addrs,
                        linktel: res.data.linktel,
                    });
                }
            }
        },(res)=>{});
    };

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
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    logo:info.file.response.data.url,
                }),
            );
        }
    };

    onChange = str => {
        this.setState({ str });
    };
    //编辑
    handleEditClick = () => {
        this.setState({
            oldprojectcname:this.state.projectcname,
            oldintro:this.state.projectmemo,
            oldprojectusername:this.state.linkmen,
            oldprijecttel:this.state.linktel,
            oldprojectemail:this.state.emailaddress,
            oldprojectaddrs:this.state.addrs,
            oldzcaddrs:this.state.zcaddrs,
        })
    };
    //提交
    handleSubmitClick = (e) =>{
        e.preventDefault();
        if(!this.demo()){
            return false;
        }
        this.setState({disabledbtn:true});
        this.setState({
            projectcname:this.state.projectcname,
            intro:this.state.intro,
            projectusername:this.state.projectusername,
            prijecttel:this.state.prijecttel,
            projectemail:this.state.projectemail,
            projectaddrs:this.state.projectaddrs,
            zcaddrs:this.state.zcaddrs,
            linktel:this.state.linktel,
        });
        const data={
            code:this.state.code,
            projectname:this.state.projectcname,
            projectmemo:this.state.intro,
            location:this.state.addrs,
            legalperson:this.state.username,
            linktel:this.state.linktel,
            emailaddress:this.state.emailaddress,
            address:this.state.zcaddrs,
            linkmen:this.state.projectusername,
            logo:this.state.logo,
        };
        axios.ajax({
            baseURL:window.g.bizserviceURL,
            method: 'put',
            url:'/api/project',
            data: data
        }).then((res)=>{
            if(res.success === 1){
                message.success('编辑成功',2,()=>window.location.href="#/main/companyinfo");
            }else if(res.success === 0){
                this.setState({disabledbtn:false});
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
    //开户时间
    InputkhdateOnchange = (e) =>{
        this.setState({
            khdate:e.target.value
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
            linktel:e.target.value
        });
    };
    //电子邮箱
    InputProjectEmailOnchange = (e) =>{
        this.setState({
            emailaddress:e.target.value
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
        console.log("obj",obj.value);
       if(filter.test(obj.value)){
           return true;
        }
        else{
           alert('您的电子邮件格式不正确');
           return false;
        }
    };

    render() {
        return (
            <div className="Companyinfo">
                <div className="box-padding">
                    <Row className="projectinfo">
                        <Col span={24}>
                            <p> <Icon type="bars" />项目信息</p>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            项目名称：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input  onChange={this.InputProjectNameOnchange.bind(this)} value={this.state.projectcname} />
                            <Input  value={this.state.code} type="hidden"/>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            项目简介：
                        </Col>
                        <Col span={21} className="t_l">
                            <TextArea autosize  onChange={this.InputProjectintroOnchange.bind(this)} value={this.state.intro} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="introbottom">
                            <p> </p>
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            项目联系人：
                        </Col>
                        <Col span={21} className="t_l">
                          <Input  onChange={this.InputProjectusernameOnChange.bind(this)} value={this.state.projectusername} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            联系电话：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input  onChange={this.InputProjectTelOnChange.bind(this)} value={this.state.linktel} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            电子邮箱：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input onBlur={this.demo} id="email"  onChange={this.InputProjectEmailOnchange.bind(this)} value={this.state.emailaddress} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            项目地址：
                        </Col>
                        <Col span={21} className="t_l">
                            <Input  onChange={this.InputProjectzcaddrsOnchange.bind(this)} value={this.state.projectaddrs} />
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

export default projectinfoEdit;
