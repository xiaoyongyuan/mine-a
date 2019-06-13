import React, { Component } from 'react';
import Etable from "../common/Etable"
import {Button, message, Switch} from "antd";
import axios from "../../axios";
import Utils from "../../utils/utils";
import ItemModel from "./ThresholdDotModel";

class Threshold extends Component {
    constructor(props){
        super(props);
        this.state={
            newShow:false
        };
    }

    componentDidMount() {
        this.requestList();
    }
    changeState=(key,val)=>{
        this.setState({[key]:val})
    };
    uploadOk=(params)=>{ //上传提交
        this.setState({newShow:false});
        const _this=this;
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'post',
            url: '/threshold_dot',
            data: params
        })
            .then((res)=>{
                if(res.success){
                    _this.requestList();
                }else{message.warn(res.msg)}
            });
    };
    requestList=()=>{
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'get',
            url: '/thresholddotlist',
            data: this.params
        })
            .then((res)=>{
                if(res.success){
                    this.setState({
                        list:res.data,
                        pagination:Utils.pagination(res,(current)=>{
                            this.params.pageindex=current;
                            this.requestList();
                        })
                    })
                }
            });
    };
    isstart = (code) =>{
        console.log("code",code);
        axios.ajax({
            baseURL:window.g.easyURL,
            method: 'put',
            url: '/threshold_net',
            data: code
        }).then((res)=>{
            if(res.success){
                message.success('设置成功！');
                // this.setState({
                //     list:res.data,
                //     pagination:Utils.pagination(res,(current)=>{
                //         this.params.pageindex=current;
                //         this.requestList();
                //     })
                // })
            }
        });
    };
    onChange = (checked) =>{
        console.log(`switch to ${checked}`);
    };

    render() {
        const columns=[{
            title: '序号',
            dataIndex: 'index',
            render: (text, record,index) => (index+1),
        },{
            title: '名称',
            dataIndex: 'name',
        },{
            title: '生成时间',
            dataIndex: 'createon',
        },{
            title: '低阈值',
            dataIndex: 'lower',
        },{
            title: '高阈值',
            dataIndex: 'high',
        },{
            title: '状态',
            // dataIndex: 'status',
            render:(text, record,index) =>{
                return(
                    <div>
                    {
                        record.status === 0?<span className="redcolor">未生效</span>:<span className="greencolor">已生效</span>
                    }
                    </div>
                )
            }
        },{
            title: '监测网阈值',
            dataIndex: 'status',
            render:(text, record,index) =>{
                return(
                    <div className="tableoption">
                        {/*<a className="greencolor" onClick={()=>this.preview(record.filepath)}>预览</a>*/}
                        {
                            text?
                                <span className="redcolor" onClick={()=>this.isstart(0)}>解除</span>:
                                <span className="greencolor" onClick={()=>this.isstart(1)}>应用</span>
                        }
                    </div>
                )
            }
        },{
            title: '备注',
            dataIndex: 'remark',
        },];
        return (
            <div className="Threshold">
                <div className="selectForm">
                    <div className="leftForm">
                        {/*<BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>*/}
                    </div>
                    <div className="rightOpt">
                        <Button type="primary" onClick={()=>this.changeState('newShow',true)}>新增</Button>
                    </div>
                </div>
                <Etable
                    ref="pageChange"
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    // pagination={this.state.pagination}
                />
                <ItemModel newShow={this.state.newShow} filterSubmit={this.uploadOk} uploadreset={()=>this.changeState('newShow',false)} />
            </div>
        );
    }
}

export default Threshold;
