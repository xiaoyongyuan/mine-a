import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu,Icon } from 'antd';
import MenuConfig from './../../../routes/menuConfig';

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from '../../../actions/postActions';

import './index.less';

const SubMenu = Menu.SubMenu;
class LayerSider extends Component {
	constructor(props) {
    super(props);
    this.state = {
        identify:"original",
        currentKey:'', //当前页面
        falocation:"",
        mylocation:"",
        menuTreeNode: []
    }
  }
 
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig.menuList);
    this.setState({
        menuTreeNode
    })
  }

  componentDidMount(){
    console.log(localStorage);
    console.log(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.identify=="location"){
      let mylocation=nextProps.location;

      let falocation="";
      MenuConfig.menuList.map((item,key)=>{
        if(item.children){
          for(var j=0;j<item.children.length;j++){
            if(item.children[j].key==mylocation){
              falocation=item.key;
              return;
            }
          }
        }
      });
      console.log(falocation);
      console.log(mylocation);
      this.setState({
        identify:nextProps.identify,
        falocation,
        mylocation,
        currentKey: mylocation
      })


    }
  }
  onTitleClick=(key,dom)=>{

  };
  handleClick = ({ item, key }) => {
    console.log(item);
    console.log(key);
    if (key === this.state.currentKey) {
        return false;
    }

    this.setState({
        currentKey: key
    });

    // redux知道全局location，菜单展开
    let Mylocation=key;
    this.props.Location(Mylocation);
  };
  renderMenu = (data)=>{ //菜单渲染
    const _this=this;
    return data.map((el,i)=>{
      if(el.children&&el.children.length){
        return (
          <SubMenu key={el.key} 
            title={
              <span>
                {el.icon && <i className={'actionfont '+el.icon} />}
                <span className="nav-text">{el.title}</span>
              </span>
            } 
            onTitleClick={this.onTitleClick}>
            {_this.renderMenu(el.children)}
          </SubMenu>
        )
      }
      return (<Menu.Item key={el.key}><NavLink to={el.key}>
          {el.icon && <i className={'actionfont '+el.icon} />}
          <span className="nav-text">{el.title}</span>
        </NavLink></Menu.Item>)
    })
  };
  render() {
    return (
      <div className="LayerSider">
      {this.state.identify=="location"?
        <Menu mode="inline"
        // SubMenu
        defaultOpenKeys={[this.state.falocation]}
        // // Menu.Item
        selectedKeys={[this.state.mylocation]}
        onClick={this.handleClick}>
          { this.state.menuTreeNode }
        </Menu> 
        :
        null
        }     
        {this.state.identify=="original"?
        <Menu mode="inline"
        // SubMenu
        defaultOpenKeys={[this.state.falocation]}
        // // Menu.Item
        selectedKeys={[this.state.mylocation]}
        onClick={this.handleClick}>
          { this.state.menuTreeNode }
        </Menu> 
        :
        null
        }   
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.posts.location,
  identify: state.posts.identify,
})

LayerSider.propTypes = {
  Location: PropTypes.func.isRequired
}
export default connect(mapStateToProps, { Location })(LayerSider);