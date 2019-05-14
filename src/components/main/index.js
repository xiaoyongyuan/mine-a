import React, { Component } from 'react';
import { Layout } from 'antd';
import LayerSider from './../layout/LayerSider';
import MenuRoutes from '../../routes/MenuRoutes';

import './index.less';
const {Header, Footer, Sider, Content} = Layout;
class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Layout>
          <Header className="Header">Header</Header>
          <Layout>
            <Sider className="Sider" style={{maxWidth:'280px'}}><LayerSider /></Sider>
            <Content className="Content"><MenuRoutes/></Content>
          </Layout>
          <Footer className="Footer">Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default Main;
