import React, { Component } from 'react';
import earthmap1k from '../../style/imgs/earthmap1k.jpg';
import './Earthrolling.less'

class Earthrolling extends Component {
    render() {
        return (
            <div>
                <div className="earth" style={{ width: "450px",height: "450px",background:`url('${ earthmap1k }') repeat-x 0 0`,WebkitAnimation: "loop 50s linear infinite" }}></div>
            </div>
        )
    }
}
export default Earthrolling;