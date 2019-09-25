import React, { Component } from 'react';
import earthmap1k from '../../style/imgs/earthmap1k.jpg';
import './Earthrolling.less'
import { Row, Col } from "antd";
class Earthrolling extends Component {
    render() {
        return (
            <div>
                {/* width: "100%", */}
                <Row gutter={16}>
                    <Col xs={8} sm={10} md={2} lg={14} xl={16} >
                        <div className="earth" style={{ background:`url('${ earthmap1k }') repeat-x 0 0`,WebkitAnimation: "loop 50s linear infinite" }}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Earthrolling;