import React, { Component } from 'react';
import {Button,Modal,Row,Col,Typography,Input,Upload, Icon, message } from "antd";
import "../../style/yal/css/companyinfoEdit.less";
import axios from "../../axios";
import Utils from "../../utils/utils";

const { TextArea } = Input;
const { Paragraph } = Typography;
class companyinfoEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            str:'北斗环境',
            isEdite:true
        };
    }
    componentDidMount(){
        this.requestList();
    };
    requestList = ()=>{
        const quparams = {
            code: 1,
        };
        axios.ajax({
            // baseURL:window.g.cuiURL,
            method: 'get',
            url: '/api/companyById',
            data: quparams,
        }).then((res)=>{
            console.log("res",res);
            if(res.success){
                this.setState({
                    cname:res.data.cname,//企业名称
                    addrs:res.data.location,//企业地址
                    username:res.data.legalperson,//法人
                    logo:res.data.logo,//企业logo
                    tel:res.data.linktel,//联系电话
                    email:res.data.emailaddress,
                    zcaddrs:res.data.address,//企业注册地址
                    khdate:res.data.khdate,
                    projectcname:res.data.cname,
                    intro:res.data.currentinfo,
                    projectusername:res.data.linkmen,//项目联系人
                    prijecttel:res.data.linktel,
                    projectemail:res.data.emailaddress,
                    projectaddrs:res.data.addrs
                })
            }
        });
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    //上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
    beforeUpload = (file) => {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     message.error('You can only upload JPG file!');
        // }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     message.error('Image must smaller than 2MB!');
        // }
        // return isJPG && isLt2M;
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log("url地址",info.file.response.data.url);
            // Get this url from response in real world.
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
        console.log('Content change:', str);
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
            oldkhdate:this.state.khdate,
            oldprojectcname:this.state.projectcname,
            oldintro:this.state.intro,
            oldprojectusername:this.state.projectusername,
            oldprijecttel:this.state.prijecttel,
            oldprojectemail:this.state.projectemail,
            oldprojectaddrs:this.state.projectaddrs,
            oldzcaddrs:this.state.zcaddrs,
        })
    };
    //提交
    handleSubmitClick = (e) =>{
        e.preventDefault();
        this.setState({
            cname:this.state.cname,
            addrs:this.state.addrs,
            username:this.state.username,
            isEdite:true,
            tel:this.state.tel,
            email:this.state.email,
            khdate:this.state.khdate,
            projectcname:this.state.projectcname,
            intro:this.state.intro,
            projectusername:this.state.projectusername,
            prijecttel:this.state.prijecttel,
            projectemail:this.state.projectemail,
            projectaddrs:this.state.projectaddrs,
            zcaddrs:this.state.zcaddrs,
        });
        const data={
            code:"1",
            cname:this.state.cname,
            location:this.state.addrs,
            legalperson:this.state.username,
            linktel:this.state.tel,
            emailaddress:this.state.email,
            address:this.state.zcaddrs,
            currentinfo:this.state.intro,
            linkmen:this.state.projectusername,
            logo:this.state.logo,
            // roleIds:1,
            // prijecttel:this.state.prijecttel,
            // projectemail:this.state.projectemail,
            // projectaddrs:this.state.projectaddrs,
            // zcaddrs:this.state.zcaddrs,
        };
        axios.ajax({
            baseURL:'http://192.168.10.29:8001/sys',
            method: 'put',
            url: '/api/company',
            data: data
        }).then((res)=>{
            if(res.success === 1){
                console.log("编辑成功！");
                message.success('编辑成功！', 3);
                window.location.href="#/main/companyinfo";
                this.requestList();
            }
            if(res.success === 0){
                message.error('修改企业失败，企业角色必传！',3);
            }
        });
    };
    //取消
    handleCancleClick = () =>{
        window.location.href="#/main/companyinfo";
        /*this.setState({
            cname:this.state.oldcname,
            addrs:this.state.oldaddrs,
            logo:this.state.oldlogo,
            username:this.state.oldusername,
            isEdite:true,
            tel:this.state.oldtel,
            email:this.state.oldemail,
            khdate:this.state.oldkhdate,
            projectcname:this.state.oldprojectcname,
            intro:this.state.oldintro,
            projectusername:this.state.oldprojectusername,
            prijecttel:this.state.oldprijecttel,
            projectemail:this.state.oldprojectemail,
            projectaddrs:this.state.oldprojectaddrs,
            zcaddrs:this.state.oldzcaddrs,
        })*/
    };
    //输入企业名称
    InputonChange = (e) =>{
        console.log(e.target.value);
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
                       {/* <Col span={12} className="canclebtn-col">
                           <Button className="canclebtn" onClick={this.handleEditClick}>编辑</Button>
                        </Col>*/}
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            企业名称：
                        </Col>
                        <Col span={21} className="t_l">
                             <Input onChange={this.InputonChange.bind(this)} value={this.state.cname} />
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
                                action={imageUrl}
                                beforeUpload={this.beforeUpload}
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
                           <Input   onChange={this.InputEmailOnchange.bind(this)} value={this.state.email} />
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
                        <Col span={3} className="t_r">
                            开户时间：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input  onChange={this.InputkhdateOnchange.bind(this)} value={this.state.khdate} />
                        </Col>
                    </Row>
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
                           <Input  onChange={this.InputProjectTelOnChange.bind(this)} value={this.state.prijecttel} />
                        </Col>
                    </Row>
                    <Row className="equ_row">
                        <Col span={3} className="t_r">
                            电子邮箱：
                        </Col>
                        <Col span={21} className="t_l">
                           <Input  onChange={this.InputProjectEmailOnchange.bind(this)} value={this.state.projectemail} />
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
                                <Button type="primary" onClick={this.handleSubmitClick}>提交</Button>
                                <Button className="canclebtn" onClick={this.handleCancleClick}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default companyinfoEdit;