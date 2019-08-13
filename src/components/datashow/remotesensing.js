import React, { Component } from 'react';
import RemoteEchart from "../common/RemoteEchart";
import RemoteEchart1 from "../common/RemoteEchart1";
import './Remotesensing.less';

class Remotesensing extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    componentDidMount(){
        
    }


    render() {
        
        return (
            <div className="Remotesensing">
                <div className="RemoteAll">

                <RemoteEchart1 />
                <RemoteEchart />
                </div>
            </div>
        );
    }
}
export default Remotesensing