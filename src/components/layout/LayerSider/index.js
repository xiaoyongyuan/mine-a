import React, { Component } from 'react';
import { Menu } from 'antd';
import MenuConfig from './../../../routes/menuConfig';
import './index.less';

const SubMenu = Menu.SubMenu;
class LayerSider extends Component {
	constructor(props) {
    super(props);
    this.state = {
        menuTreeNode: []
    }
  }
  componentWillMount(){
    // this.setState({
    //   menuTreeNode:this.renderMenu(MenuConfig)
    // })
  }
  renderMenu = (data)=>{ //菜单渲染
    const _this=this;
    return data.map((el,i)=>{
      if(el.children&&el.children.length){
        return (
          <SubMenu key={el.key} title={el.title}>
            {_this.renderMenu(el.children)}
          </SubMenu>
        )
      }
      return (<Menu.Item key={el.key}>{el.title}</Menu.Item>)
    })
  }
  render() {
    return (
      <div className="LayerSider">
        <Menu mode="inline">
          {this.renderMenu(MenuConfig)}
        </Menu>      
      </div>
    );
  }
}

export default LayerSider;
