import React, { Component } from 'react'
import SpatiEcharts from '../common/SpatiEcharts'
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spatia } from '../../actions/postActions';

import './Spatialanalyze.less'
import menubg from '../../style/imgs/menubg.png';
import triangleR from '../../style/imgs/triangleR.png';
import triangleL from '../../style/imgs/triangleL.png';





class Spatialanalyze extends Component {
    constructor(props){
        super(props);
        this.state={
            spatialanalysis:[],
            ifshow:-1,
            ifshow2:false,
            show:true,
            total:0
        };
    }
    
    componentDidMount(){
        homeSystemMonitoring.spatialan()
        .then(res => {
            if(res.success){
                this.setState({
                    spatialanalysis:res.data,
                    total:res.total
                })
            }
            console.log(res);
            
        })
    }
    shrink(val,tal){
        
        // 所以受点击的li
        var doc = document.querySelectorAll("li.sub-menu");
        // 方向
        var direction = document.querySelectorAll("img.directionimg");
        // 第二层ul(控制其他ul不显示)
        var twoul = document.querySelectorAll("ul.twoul");
        for(var i=0;i<twoul.length;i++){
            twoul[i].setAttribute('style','display: none');
            direction[i].setAttribute('src',triangleR);
        }
        
        // 获取受点击的li下面的方向
        var thisdirection = doc[val].children[0].children[2];
        // 获取受点击的li下面的ul
        var thisul = doc[val].children[1];
        // 控制是否是第二次点击
        if(val==this.state.ifshow && this.state.ifshow2){
            thisdirection.setAttribute('src',triangleR);
            thisul.setAttribute('style','display: none');
            this.setState({
                ifshow:-1,
                ifshow2:false
            })
        }else{
            thisdirection.setAttribute('src',triangleL);
            thisul.setAttribute('style','display: block');
            this.setState({
                ifshow:val,
                ifshow2:true
            })
        }
    }
    menucont(val,inde){
        // 获取第几个大li被点击了
        let ifshow = this.state.ifshow;
        // 所有第二层li
        let docli = document.querySelectorAll("li.twoli");
        for(var i=0;i<docli.length;i++){
            docli[i].setAttribute('style','background-color: none;');
        }
        // 改变受点击的li的背景颜色
        var doc = document.querySelectorAll("li.sub-menu")[ifshow].children[1].children[inde].setAttribute('style','background-color: rgba(12,62,94,1);')


        // 点击各个空间分析,触发redux
        this.props.Spatia(val);

    }
    

    render() {
        const _this=this;
        return (
            <div className="Spatialanalyze">
                <p className="myiconfont">
                    <span className="actionfont action-jichushujuguanli"></span><span>空间分析</span>
                </p>
                <div className="SpatialanalyzeAll">
                    {/* 标题 */}
                    <div className="spatiaTitle">
                        <div className="num">{ this.state.total }</div>
                        <div className="titlename">空间分析</div>
                    </div>
                    
                    


                    {/* 下拉导航 */}
                    <div id="leftside-navigation">
                        <ul className="nano-content" id="nano-content"
                         style={{ background:`url('${ menubg }') 100% 100% / cover no-repeat`,border:'none'}}>
                            { this.state.spatialanalysis.map(function(spatidata,keys){
                                return (
                                    <li className="sub-menu" key={keys}>
                                        <div className="onetitle"
                                        onClick={_this.shrink.bind(_this,keys)}>
                                            <div className="num">{ spatidata.LAYERITEMTYPENUM }</div>
                                            <div className="titlecontent">{ spatidata.DNAME }</div>
                                            <img className="directionimg" src={ triangleR } />
                                        </div>
                                        
                                        <ul className="twoul">
                                            {spatidata.MenuChildren?spatidata.MenuChildren.map(function(item2,key2){
                                                return ( 
                                                    <li key={key2} className="twoli">
                                                        <div onClick={_this.menucont.bind(_this,item2,key2)}>
                                                        { item2.layername }
                                                        </div>
                                                    </li>
                                                )
                                            }):""}
                                        </ul>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>




                    {/* 空间分析成果占比 */}
                    <div className="columndl" style={{margin:'30px 0'}}>
                        <div className="columndt">空间分析成果占比</div>
                    </div>


                    {/* echarts */}
                    <SpatiEcharts />

                </div>
            </div>
        )
    }
}




Spatialanalyze.propTypes = {
    Spatia: PropTypes.func.isRequired
}


export default connect(null, { Spatia })(Spatialanalyze); 