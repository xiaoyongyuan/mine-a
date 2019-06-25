import React, { Component } from 'react';
import axios from '../../axios'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState} from 'draft-js';
import draftjstoh from 'draftjs-to-html'
import htmltod from 'html-to-draftjs'
import {Input,Row,Col,Select,Button,message } from "antd";
import "./index.less";
import {Link} from "react-router-dom";
const Option = Select.Option;
const { TextArea } = Input;
class Edit extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      editorState:EditorState.createEmpty(),
      plantype:[], //类别
      selecttype:'', //选择的类别
      abstract:'' //摘要
    };
    this.params = {
        page:1,   
    }
  }
  componentDidMount(){
    const _this=this;
    const ids=this.props.query.id;
    console.log("ids",ids);
      this.requersPlantType();
    if(ids){
      this.setState(
          {
              code:ids
          },()=>_this.requestList()
      );
    }
  }
    requersPlantType = () =>{
        axios.ajax({
            method: 'get',
            url: '/sys/api/dictionary',
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
  requestList=()=>{
    axios.ajax({
      method: 'get',
      url: '/bizservice/api/getPlanById',
      data: {planId:this.state.code}
    }).then((res)=>{
      if(res.success){
          console.log("res",res);
        // const data=res.data;
        // const editorS=this.state.editorState;
        const planinfo = res.data.planinfo;
        const contentBlock=htmltod(planinfo);
        const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState:editorState, //内容
          inputval:res.data.plantitle, //标题
            abstract:res.data.summary,//摘要
          selecttype:res.data.plantype //类别
        },()=>{
          console.log('ddddd',editorState)
        })
      }
    });
  };
  selectopt=(type,selecttype)=>{ //选择类别
      console.log("12",type,selecttype);
    this.setState({
            [type]:selecttype
        }
    )
  };
    //输入标题
    InputvalOnchange = (e) =>{
        this.setState({
            inputval:e.target.value
        });
    };
    //输入摘要
  changetext=(e)=>{
    this.setState({
          abstract:e.target.value
      });
  };
  onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };
  onEditorStateChange = (editorState) => {
      this.setState({
          editorState
      });
  };
  getContent=(states)=>{ //获取内容

    const params={
        states, //是否为草稿
        planinfo:draftjstoh(convertToRaw(this.state.editorState.getCurrentContent())), //内容
        plantitle:this.state.inputval, //标题
        plantype:this.state.selecttype, //类别
        summary:this.state.abstract,//摘要
    };
    console.log(params,'console.log(params)')
    if(!params.planinfo || !params.plantitle || !params.plantype || !params.summary) message.warn('请填写完整！');
      const ids=this.props.query.id;
     if(ids === undefined){
         axios.ajax({
             method: 'post',
             url: '/bizservice/api/plan',
             data: params
         }).then((res)=>{
             if(res.success){
                 message.success('新增成功！', 2).then(()=>window.history.go(-1));
             }
         });
     }else {
         params.code=ids;
         axios.ajax({
             method: 'put',
             url: '/bizservice/api/plan',
             data: params
         }).then((res)=>{
             if(res.success){
                 message.success('编辑成功！', 2).then(()=>window.history.go(-1));
             }
         });
     }

  };
  render() {
    const { editorState } = this.state;
      
    return (
      <div className="Edit">
        <Row className="plantit">
            <Col span={2} className="leftlabel" >标题：</Col>
            <Col span={10}><Input placeholder="请输入标题" onChange={this.InputvalOnchange.bind(this)} value={this.state.inputval}/></Col>
        </Row>
        <Row className="plantit">
            <Col span={2} className="leftlabel">类别：</Col>
            <Col span={10}>
                <Select value={this.state.selecttype} placeholder="请选择类别" style={{ width: 120 }} onChange={(value)=>this.selectopt('selecttype',value)}>
                      {
                        this.state.plantype.map((el)=>(
                          <Option value={el.dvalue} key={el.dvalue}>{el.dname}</Option>
                        ))
                      }
                  </Select>
            </Col>
        </Row>
        <Row className="plantit">
            <Col span={2} className="leftlabel">摘要：</Col>
            <Col span={10}>
                <TextArea value={this.state.abstract} onChange={(e)=>this.changetext(e)} rows={4} />
            </Col>
        </Row>
        <div className="editor">
          <Editor
              editorState={editorState}
              onEditorStateChange={this.onEditorStateChange}
          />
        </div>
        <Row className="plantit">
            <Button type="primary" onClick={()=>this.getContent(1)}>发布</Button>
            <Button className="butstyle" onClick={()=>this.getContent(0)}>存为草稿</Button>
            <Link className="detmain" to={'/main/myplan'}>
                <Button type="dashed">关闭</Button>
            </Link>
        </Row>
      </div>
    );
  }
}

export default Edit;
