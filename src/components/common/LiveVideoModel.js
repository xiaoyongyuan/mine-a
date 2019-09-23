import React, { Component } from 'react';
import {Modal} from 'antd'
// import axios from "../../axios";
// import moment from 'moment';
// const FormItem = Form.Item;
// const { RangePicker, } = DatePicker;
// let vis=false;
class LiveVideoModel extends Component {
  constructor(props){
    super(props);
    this.state={
         visible: false,
    };
  }
  componentDidMount(){
      

  }
    componentWillReceiveProps(nextProps){
        // if( nextProps.newShow !== vis){
        //     vis=nextProps.newShow;
            // if(nextProps.newShow){
            //     this.setState({
            //         code:nextProps.code
            //     }, () => {
            //         this.requestdata();
            //     });
            // }
        // }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

  render() {
    return (
      <div className="UploadModel">
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <video id="myPlayer" autoplay src="http://hls01open.ys7.com/openlive/72b0e54e4e4047edb0e8d3827dc98db0.m3u8" controls playsInline webkit-playsinline></video>
        </Modal>
      </div>
    );
  }
}
export default LiveVideoModel;

