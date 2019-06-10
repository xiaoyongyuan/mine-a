import React, { Component } from 'react';
import moment from 'moment';
import Itemshow from './Itemshow';
import { Icon} from 'antd'
import ArcGISMap from './ArcGISMap';



import './mapshow.less'
class MapShow extends Component {
    constructor(props){
        super(props);
        this.state={ 
            leftLayer:true,
            showitem:'gis', 
        };
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        const _this=this;
        setInterval(()=>{
                _this.setState({systime:moment().format('YYYY-MM-DD hh:mm:ss')})
        },1000)


    }
    clickbtn=(val)=>{
        this.setState({showitem:val})
    }
    trigger=()=>{
        const tigclose=this.state.tigclose;
        this.setState({tigclose:!tigclose})
    }

    render() {
        return (
            <div className="MapShow">
                <div className="arcgis">
                    <ArcGISMap />
                </div>
                <div className="leftmove" style={this.state.tigclose?{transform:'translateX(-100%)'}:null} >
                <div className="leftLayer" style={this.state.tigclose?{transform:'translateX(-100%)'}:null}>
                    <div className="switchRound">
                        <p><span>{this.state.systime}</span><Icon type="setting" theme="filled" /></p>
                    </div>
                    <div className="roundBtn">
                        <div className="roundline">
                            <div className={this.state.showitem=='pandect'?'showitem rounditem pandect':'rounditem pandect'} onClick={()=>this.clickbtn('pandect')}>总览</div>
                            <div className={this.state.showitem=='monitor'?'showitem rounditem monitor':'rounditem monitor'} onClick={()=>this.clickbtn('monitor')}>监测</div>
                            <div className={this.state.showitem=='gis'?'showitem rounditem gis':'rounditem gis'} onClick={()=>this.clickbtn('gis')}>遥感</div>
                            <div className={this.state.showitem=='prodect'?'showitem rounditem prodect':'rounditem prodect'} onClick={()=>this.clickbtn('prodect')}>项目</div>
                        </div>
                    </div>
                    <div className="itemshow">
                        <Itemshow showitem={this.state.showitem} />   
                    </div>
                    
                </div>
                <div className="trigger" onClick={this.trigger}>
                    <div className="triggercont"><Icon type={this.state.tigclose?'double-right':'double-left'} /></div>
                </div>
                </div>
            </div>
        );
    }
}
export default MapShow