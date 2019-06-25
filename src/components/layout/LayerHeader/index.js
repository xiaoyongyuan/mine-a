import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Select, Badge, Modal,message} from 'antd';
import axios from "../../../axios";
import './index.less';
const confirm = Modal.confirm;
class LayerHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
    hanleClose=()=>{
      const _this=this;
        confirm({
            title: '退出',
            content: '确认退出吗？',
            onOk() {
              axios.logout({}).then((res)=>{
                if(res.success){
                  localStorage.removeItem('token');
                  _this.props.history.push("/login")
                }else message.error(res.msg)
              })
            },
        });
    };
  render() {
    return (
      <div className="LayerHeader">
        <div className="header-left">
            <div className="logoIcon"></div>
            <span className="logo-vertical"></span>
            <div className="header-title">矿山地质环境动态监测预警系统</div>
        </div>
        <div className="header-right">
          <span>欢迎您</span>
          <Select defaultValue="Admin" style={{width:"90px"}}>
              <option value="Admin">Admin</option>
              <option value="Jack">Jack</option>
          </Select >
            <Badge count={5}>
              <i className="actionfont action-lingsheng iconclearance"/>
            </Badge>
          <i className="actionfont action-changjianwenti iconclearance"/>
          <i className="actionfont action-guanji iconclearance" onClick={this.hanleClose}/>
        </div>
      </div>
    );
  }
}
export default withRouter(LayerHeader);
