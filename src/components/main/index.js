import React, { Component } from 'react';
import { Layout } from 'antd';
import LayerSider from './../layout/LayerSider';
import LayerHeader from './../layout/LayerHeader';
import LayerCrumb from './../layout/LayerCrumb';
import MenuRoutes from '../../routes/MenuRoutes';

import './index.less';
const {Header, Footer, Sider, Content} = Layout;

class Main extends Component {
  constructor(props){
    super(props);
    this.state={  
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <div className="Main">
        <Layout>
          <Header className="Header"><LayerHeader /></Header>
          <Layout>
            <Sider className="Sider" width='220px'><LayerSider /></Sider>
            <Content className="Content">
             
              <MenuRoutes/>
            </Content>
          </Layout>
            <Footer className="Footer">陕西北斗环境信息产业有限公司</Footer>
        </Layout>
      </div>
    );
  }
}
export default Main;
