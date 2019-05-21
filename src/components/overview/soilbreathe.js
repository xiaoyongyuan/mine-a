import React, { Component } from 'react';
import {Tabs,Row, Col,Select,Upload,Icon,Modal} from 'antd'
import easy from "../../style/yal/image/easy.png";
import "../../style/yal/css/soil.css";



class Soilbreathe extends Component {
  constructor(props){
    super(props);
    this.state={
      list:[],
      pagination:{},
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: '',
            },
        ],
    };
    this.params = {
        page:1,
    }
  }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });


  componentDidMount(){
  }

  render() {
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
          <div className="upload-up">
              <Icon type="plus" />
              <div className="ant-upload-text">点击上传地形地貌图</div>
          </div>
      );
    return (
      <div className="Soilbreathe">
          <Row className="upload-row">
              <Col className="upload-col" span={12}>
                  <div className="uploaddiv">
                      <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          // fileList={fileList}
                          onPreview={this.handlePreview}
                          onChange={this.handleChange}
                      >
                          {fileList.length >= 3 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                  </div>

              </Col>
              <Col span={12}>

              </Col>
          </Row>
      </div>
    );
  }
}

export default Soilbreathe;
