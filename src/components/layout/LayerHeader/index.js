import React, { Component } from 'react';
import {Select, Badge, Modal} from 'antd';
import './index.less';
import axios from "../../../axios";
const Option = Select.Option;
const confirm = Modal.confirm;
class LayerHeader extends Component {
    hanleClose=()=>{
        confirm({
            title: '退出',
            content: '确认退出吗？',
            onOk() {},
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
        {/* <div className="HeaderTitle">
        	<Icon type="check-circle" />
        	<span>矿山地质环境动态监测预警系统</span>
        </div>
        <div className="HeaderRight">
        	<div className="SelectMode">
				      <Select defaultValue="数据管理">
					      <Option value="数据管理">数据管理</Option>
					      <Option value="项目管理">项目管理</Option>
					    </Select>
        	</div>
        	<div className="messages">
        			<Icon type="message" />
        	</div>
        </div>*/}
      </div>
    );
  }
}

export default LayerHeader;
