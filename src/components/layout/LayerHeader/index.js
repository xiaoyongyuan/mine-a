import React, { Component } from 'react';
import {Select,Badge} from 'antd';
import './index.less';
const Option = Select.Option;
class LayerHeader extends Component {
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
          <i className="actionfont action-guanji iconclearance"/>
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
