import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.less';
import MenuRoutes from '../../routes/MenuRoutes';

const { Content} = Layout;
class Pandect extends Component {
  render() {
    return (
      <div className="pandect">
        <Layout>
        	<Content className='Content'>
            <MenuRoutes />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Pandect;
