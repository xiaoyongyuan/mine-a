import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Icon,List,Card,Progress,Typography } from 'antd'

import './mapshow.less'
class Prodect extends Component {
    constructor(props){
        super(props);
        this.state={   
        };
    }

    componentDidMount(){


    }


    render() {
        
        return (
            <div className="Prodect">
                <dl className="columndl">
                    <dt className="columndt">项目管理<a className="columndtright"></a></dt>
                    <div className="egraph">
                            
                    </div>
                </dl>
            </div>
        );
    }
}
export default Prodect