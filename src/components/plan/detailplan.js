import React, { Component } from 'react';
import {Row, Col,Button} from 'antd'
import "../../style/yal/css/detailplan.css";
import center from '../../style/yal/image/center.png';


class Detailplan extends Component {
  constructor(props){
    super(props);
    this.state={
      page:1,
      equipment:'1'
    };
    this.params = {
        page:1,   
    }
  }
  componentDidMount(){

  }
  render() {
      
    return (
      <div className="Detailplan">
          <Row>
              <Col className="detailplantitle">
                  <span>预案详情</span>
              </Col>
          </Row>
          <Row className="addmyplan">
              <Col span={20}>
                  <span>分类：地质灾害</span>
              </Col>
              <Col span={4}>
                  <Button type="primary">添加至我的预案</Button>
              </Col>
          </Row>
          <Row className="detailplancenter">
              <Col>
                  <img src={center} alt="1"/>
              </Col>
          </Row>
          <Row className="detailplanbottom">
              <Col className="detailplanbottom-col">
                  <Button size = "large"　  type="button" className="submit">提交</Button>
                  <Button size = "large" className="draft">存草稿</Button>
                  <Button size = "large" className="colse">关闭</Button>
              </Col>
          </Row>




      </div>
    );
  }
}

export default Detailplan;
