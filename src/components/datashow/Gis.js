import React, { Component } from 'react';
import { List } from 'antd'
import Egraph from './../common/Egraph'
import './mapshow.less'
class Gis extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){

    }
    render() {       
        return (
            <div className="Gis">
                <List className='listitem'>
                    <List.Item key='ItemLandform'>地形地貌</List.Item>
                    <List.Item key='ItemInsar'>INSAR</List.Item>
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
export default Gis