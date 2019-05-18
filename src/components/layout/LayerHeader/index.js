import React, { Component } from 'react';
import {Icon, Select} from 'antd';
import './index.less';
const Option = Select.Option;
class LayerHeader extends Component {
  render() {
    return (
      <div className="LayerHeader">
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
