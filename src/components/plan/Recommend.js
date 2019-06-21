import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Select, Pagination, Typography, Modal, Radio, Button,Empty } from "antd";
import axios from '../../axios'
import Utils from "../../utils/utils";
import './index.less';
import icon from "../../style/ztt/imgs/icon.png";
const { Title,Paragraph } = Typography;
const confirm = Modal.confirm;
const Option = Select.Option;
class Recommend extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      page:1,
      pagination:{},
        recommendtype: '2',
        plantype:[], //类别
        selecttype:'' //选择的类别
    };
    this.params = {
        pageindex:1,
        pagesize:9,
    }
  }
    handleSizeChange = e => {
        this.setState({
            recommendtype: e.target.value,
            pageindex:1,
        },()=>this.requestList());
    };
  componentDidMount(){
    this.requestList();
      this.requersPlantType();
  }
  requestList=()=>{
      this.params.recommendtype=this.state.recommendtype;
      this.params.plantype=this.state.selecttype || 0;
      axios.ajax({
        baseURL:window.g.wangURL,
        method: 'get',
        url: '/api/getPlanByRecommendtype',
          data:this.params,
        // data: {
        //     pageindex:1,
        //     pagesize:9,
        //     recommendtype:this.state.recommendtype,
        //     plantype:this.state.selecttype || 0
        // }
      }).then((res)=>{
        if(res.success){
          this.setState({
              list:res.data,
              isempty:res.data.length,
              pagination:Utils.pagination(res,(current)=>{
                  this.params.pageindex=current;
                  this.requestList();
              })
          })
        }
      });
  };
  //查询下拉框内容
    requersPlantType = () =>{
        axios.ajax({
            baseURL:'http://192.168.10.29:8001/sys',
            method: 'get',
            url: '/api/dictionary',
            data: {
                dtype:'PLANTYPE',
            }
        }).then((res)=>{
            if(res.success){
                this.setState({
                    plantype:res.data
                })
            }
        });
    };
  add(code) {
    const _this=this;
      confirm({
          title: '添加',
          content: '确认添加至我的预案？',
          onOk() {
              axios.ajax({
                method: 'get',
                url: 'plan',
                data: {ids:code}
              }).then((res)=>{
                if(res.success){
                  _this.requestList()
                }
              });
          },
      });
    };
    handleChange=(selecttype)=>{ //选择类别
        console.log("selecttype",selecttype);
        this.setState({selecttype,page:1,},()=>this.requestList())
    };

    render() {
        const recommendtype = this.state.recommendtype;
        const isempty = this.state.isempty;
      return (
        <div className="MyPlan">
            <Row>
                <Col span={12}>
                    <Radio.Group value={recommendtype} onChange={this.handleSizeChange}>
                        <Radio.Button value="2">系统推荐预案</Radio.Button>
                        <Radio.Button value="1">企业预案</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={12} className="query-col">
                    <Select defaultValue={this.state.selecttype} style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value='' key='ss'>所有</Option>
                        {
                            this.state.plantype.map((el)=>(
                                <Option value={el.dvalue} key={el.dvalue}>{el.dname}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <div className="planlist">
              <Row gutter={16}>

                  {
                      isempty>0?
                      this.state.list.map((v,i)=>(
                          <Col className="gridcol" key={v.code} md={24} xl={12} xxl={8}>
                          <div className="detmain">
                          <Link className="" to={'/main/lookplan?id='+v.code}  style={{color:'rgba(0, 0, 0, 0.65)'}}>
                              {/*<Link className="" to={'/main/lookplan'}  style={{color:'rgba(0, 0, 0, 0.65)'}}>*/}
                          <div className="dettitle">
                            <div className="detlogo">
                              <img src={icon} />
                            </div>
                            <div className="detname">
                                <div className="plan-title">{v.plantitle}</div>
                              {/*<div><span className="greencolor">{v.cname}</span> {v.khdate}</div>*/}
                                <div><span className="greencolor">测试写死</span> 2019-10-12</div>
                                <div className="intro">
                                    {v.summary}
                                </div>
                                <div className="planMore">更多&gt;&gt;&gt;</div>
                            </div>
                          </div>
                          </Link>
                          {
                              //用companycode判断是否为我的预案，留下后期完成，
                              //if
                            v.states?
                                <div className="editbtn addmy">
                            <span onClick={(v)=>this.add(v.code)}  style={{color:'#fff',cursor:"pointer"}}>添加</span>
                            </div>
                            :null
                          }
                              {/*<Link className="intro" to={'/main/lookplan?id='+v.code}  style={{color:'rgba(0, 0, 0, 0.65)'}}>
                                  <div className="intro">
                                      {v.summary}
                                  </div>
                              </Link>*/}
                              {/*<Link  to={'/main/lookplan'}  style={{color:'rgba(0, 0, 0, 0.65)'}}>*/}
                                  {/*<div className="intro">*/}
                                      {/*{v.summary}*/}
                                  {/*</div>*/}

                              {/*</Link>*/}
                          </div>
                        </Col>
                      )):
                      <Empty />
                  }
            </Row>
            </div>
            <Pagination className="PaginationRight" hideOnSinglePage {...this.state.pagination}/>
        </div>
      );
  }
}

export default Recommend;
