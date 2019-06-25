import React, { Component } from 'react';
import Egraph from './../common/Egraph'
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
                      <Egraph dataHeight='400' cahrtp='progressbar' />
                    </div>
                </dl>
            </div>
        );
    }
}
export default Prodect