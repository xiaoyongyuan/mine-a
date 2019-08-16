import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'


// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoteSensing } from '../../actions/postActions';

import './mapshow.less'
class Gis extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){

    }
    // 点击各个监测网,触发redux
    insar(val){
        this.props.RemoteSensing(val);
    }
    render() {       
        return (
            <div className="Gis">
                <List className='listitem'>
                    <List.Item key='ItemLandform'>地形地貌</List.Item>
                    <List.Item key='ItemInsar' onClick={()=>this.insar('INSAR')}>INSAR</List.Item>
                    <List.Item key='ItemHyperspectral'>高光谱</List.Item>
                    <List.Item key='ItemDestru'>土地损毁与复垦</List.Item>
                </List>
                <dl className="columndl">
                    <dt className="columndt">土地损毁</dt>
                    <div className="egraph">
                        <Egraph key='sunh' dataHeight='150' cahrtp='shmeter' />
                    </div>
                </dl>
                <dl className="columndl">
                    <dt className="columndt">土地复垦</dt>
                    <div className="egraph">
                        <Egraph key='fuk' dataHeight='150' cahrtp='meter' />    
                    </div>
                </dl>
            </div>
        );
    }
}

Gis.propTypes = {
    RemoteSensing: PropTypes.func.isRequired
}

export default connect(null, { RemoteSensing })(Gis); 