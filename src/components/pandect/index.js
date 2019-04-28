import React, { Component } from 'react';
import { Layout } from 'antd';
import LayerHeader from './../layout/LayerHeader';
import './index.less';
const {Header, Content} = Layout;
class Pandect extends Component {
  render() {
    return (
      <div className="pandect">
        <Layout>
          <Header><LayerHeader /></Header>
        	<Content className='Content'>{this.props.children}</Content>
        </Layout>
      </div>
    );
  }
}

export default Pandect;
