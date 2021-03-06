import React, { Component } from 'react';
import BaseForm from "../common/BaseForm";
import {Button, message, Icon, Menu, Dropdown,Radio} from "antd";
import Etable from "../common/Etable";
import EquipListModalForm from './EquipListModalForm.js';
import axios from "../../axios";
import PageBreadcrumb from "../common/PageBreadcrumb";
import Utils from "../../utils/utils";
import ofteraxios from "../../axios/ofter";
import logoimg from "../../style/imgs/logo.png";
class Equipmanage extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            page: 1,
            equiptypeArr:[],
            newShow:false,
            routes:[
                {path: '', breadcrumbName: '系统管理'},
                {path: '/main/equipmanage', breadcrumbName: '设备列表'},
              ]
        };
        this.formList={
            type:'inline',
            item:[
                {
                    type: 'INPUT',
                    label: '设备编码/名称/厂家',
                    field:'combination',
                    placeholder:'请输入设备编码/名称/厂家',
                },
                {
                    type: 'SELECTmore',
                    label: '设备类型',
                    field: 'devicetype',
                    placeholder: '全部',
                    initialValue: '',
                    list:this.state.equiptypeArr,
                    width:"195px"
                },{
                    type:'button',
                    button:[
                        {
                            label:'查询',
                            type:"primary",
                            click:'handleFilterSubmit',
                        },
                        {
                            label:'重置',
                            click:'reset',
                        },
                    ]
                }
            ]
        }
    };
    params={
        pageindex:1
    };
    componentWillMount(){
        this.requestListEquiptype();
    }
    uploadOk=(params)=>{ //上传提交
        this.changeState('newShow',false);
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'post',
            url: 'api/equipmentImport',
            data: params
        }).then((res)=>{
            if(res.success){
                message.success('导入成功！', 3);
                this.requestList();
            }
        },(res)=>{});
    };
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    componentDidMount(){
        this.requestList();
    };
    requestListEquiptype = () =>{//设备类型
        ofteraxios.equiptypelistquery().then(res=>{ 
            if(res.success){
                res.data.map(
                    item=>this.state.equiptypeArr.push(
                        {
                            code:item.dvalue,
                            name:item.dname
                        }
                    )
                );
                this.state.equiptypeArr.unshift({
                    code:'',
                    name:'全部'
                })
            }
        },(res)=>{});
    };
    requestList = ()=>{
        const _this=this;
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: 'api/equipmentinfo',
            data: _this.params
        }).then((res)=>{
            if(res.success){
                _this.setState({
                    list:res.data,
                    pagination:Utils.pagination(res,(current)=>{
                        this.params.pageindex=current;
                        this.requestList();
                    })
                })
            }
        },(res)=>{});
    };
    handleFilterSubmit=(params)=>{ //查询
        this.params=params;
        this.params.pageindex=1;
        this.requestList();
    };
    export = () =>{
        axios.ajax({
            baseURL:window.g.deviceURL,
            method: 'get',
            url: 'api/exportEquipment',
        }).then((res)=>{
            if(res.success){
                window.location.href = window.g.fileURL+"/api/download?fileName=" + res.msg + "&delete=" + true + "&access_token=" +localStorage.getItem("token");
                message.success('导出成功！', 3);
                this.requestList();
            }
        },(res)=>{});
    };
    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '设备图片',
            dataIndex: 'picpath',
            render: (text,record,index) =>{
                return(
                    <div>
                        {
                            text !== null?
                            <img src={window.g.filesURL+text} alt="" style={{width:'100px',height:'50px' }} />:
                                <img src={logoimg}alt="" style={{width:'100px',height:'50px' }}></img>
                        }
                    </div>
                )
            }
        },{
            title: '设备名称',
            dataIndex: 'devicename',
        },{
            title: '设备编码',
            dataIndex: 'devicecode',
        },{
            title: '设备类型',
            dataIndex: 'dname',
        },{
            title: '入库时间',
            dataIndex: 'createon',
        },{
            title: '生产厂家',
            dataIndex: 'sccj',
        },{
            title: '单位',
            dataIndex: 'units',
        },{
            title: '状态',
            dataIndex: 'states',
            render: (text,record,index) =>{
                return(
                    <div>
                        {
                            text === '1'?
                                '已使用':
                                '未使用'
                        }
                    </div>
                )
            }
        },];
        const menu = (
            <Menu>
              <Menu.Item>
              <a  href="http://info.beidouenv.com/uploadFile/sbrk.xlsx" className="bluecolor">下载导入模板</a>
              </Menu.Item>
            </Menu>
          );
        return (
            <div className="Equipmanage">
                <PageBreadcrumb routes={this.state.routes} />
                <div className="simple">
                    <div className="selectForm">
                        <div className="leftForm">
                            <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                        </div>
                        <div className="rightOpt">
                            <Radio.Group>
                                <Radio.Button onClick={()=>this.changeState('newShow',true)} style={{verticalAlign:"bottom",backgroundColor: "#0062A1",color:" #fff",border:"none",borderRight:"1px solid white"}} value="1"> 
                                    <span className="actionfont action-daoru"/>
                                    <span>导入</span>
                                </Radio.Button>
                                <Dropdown overlay={menu}>
                                    <Radio.Button style={{verticalAlign:"bottom",backgroundColor: "#0062A1",color:" #fff",border:"none",borderLeft:"1px solid white"}} value="0">
                                        <Icon type="down" />
                                    </Radio.Button>
                                </Dropdown>
                            </Radio.Group>
                            
                            <Button type="primary" style={{ verticalAlign:"bottom",marginLeft:'20px', }} onClick={this.export} ><span className="actionfont action-daochu1"/>&nbsp;&nbsp;导出</Button>
                        </div>
                    </div>

                    <Etable
                        ref="pageChange"
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                    <EquipListModalForm
                        newShow={this.state.newShow}
                        filterSubmit={this.uploadOk}
                        uploadreset={()=>this.changeState('newShow',false)}
                    />
                </div>
            </div>
        );
    }
}
export default Equipmanage;
