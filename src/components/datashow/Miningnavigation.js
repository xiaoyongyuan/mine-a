import React, { Component } from 'react'
import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
import './Miningnavigation.less'
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Networks,Allroad } from '../../actions/postActions';

class Miningnavigation extends Component {
    constructor(props){
        super(props);
        this.state={   
           // 当前页-1
           pagenum:1,
           // 总页数
           pagetotal:1,
           // 每页显示多少条
           everypage:7,
            // 路网总数
            totalcount:0,
            responsedata:[]
        };
    }
    componentDidMount(){
        homeSystemMonitoring.miniNavigationlist({layertype:2,pageindex:this.state.pagenum,pagesize:this.state.everypage})
        .then(res=>{
            // 总路网信息resux
            this.props.Allroad(res.data[0].layerurl);
        })
    }
    componentWillUpdate(nextProps) {
        this.state.responsedata = nextProps.AllroadGobai.features;
        var pagetotal=nextProps.AllroadGobai.features.length/this.state.everypage;
        this.state.pagetotal=pagetotal;
        if(this.state.pagenum==1){
            let div1=document.getElementById('pageone'); 
            div1.style.color='gray'; 
        }
        if(this.state.pagenum==pagetotal){
            let div2=document.getElementById('pagetwo');  
            div2.style.color='gray'; 
        }
        
    }

    // 上一页
    prev(){
        var pagenum=this.state.pagenum-1;
        let div1=document.getElementById('pageone'); 
        div1.style.color='white'; 
        let div2=document.getElementById('pagetwo'); 
        div2.style.color='white'; 
        if(pagenum<=1){
            pagenum=1;
            div1.style.color='gray'; 
        }
        this.setState({
            pagenum:pagenum
        })

        
    }

    // 下一页
    next(){
        var pagenum=this.state.pagenum+1;
        var pageindex=this.state.pageindex;
        let div1=document.getElementById('pageone'); 
        div1.style.color='white'; 
        let div2=document.getElementById('pagetwo'); 
        div2.style.color='white'; 

        if(pagenum>=this.state.pagetotal){
            pagenum=this.state.pagetotal;
            div2.style.color='gray'; 
        }
        this.setState({
            pagenum:pagenum
        })

        
    }
    // 上一页,下一页
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
          return <a>上一页</a>;
        }
        if (type === 'next') {
          return <a>下一页</a>;
        }
        return originalElement;
    }
    // 点击路网信息resux
    Changeglobe(val){
        this.props.Networks(val);
    }

    render() {
        var _this=this;
        
        return (
            <div className="Miningnavigation">
                <p className="myiconfont">
                    <span className="actionfont action-daohang"></span><span>矿区导航</span>
                </p>
                <div className="MiniAll"> 
                <div className="miniEcharts">
                    <div className="num">{ this.state.responsedata.length }</div>
                    <div className="numtitle">路网总数</div>
                </div>


                {/* 上一页下一页按钮 */}
                <div className="columndl" style={{marginBottom:'10px'}}>
                {/* id="Basedata-item-zw"   columndt */}
                    <div className="Basedata-item-zw" >
                        <div className="page" onClick={this.prev.bind(this)} id="pageone">上一页</div>
                        <div className="news">路网信息</div>
                        <div className="page" onClick={this.next.bind(this)} id="pagetwo">下一页</div>
                    </div>
                </div>

                {/* 内容 */}
                {
                        this.state.responsedata.slice((this.state.pagenum - 1) * this.state.everypage, this.state.everypage * this.state.pagenum).map(function(item,keys){
                        return (
                            <div className="Basedata-item-sbsl" 
                            onClick={_this.Changeglobe.bind(_this,item)}
                            key={ item.uid }>
                                <div className="itemname">{ item.attributes.daolu_name }</div>
                                <div className="jcwname">
                                    <div className="jcwword">
                                        <div>起点: { item.attributes.start }</div>
                                        <div>终点: { item.attributes.end_ }</div>
                                    </div>
                                    <div className="distance">
                                        {item.attributes.length}M
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    AllroadGobai: state.posts.AllroadGobai,
})

Miningnavigation.propTypes = {
    Networks: PropTypes.func.isRequired,
    Allroad: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, { Networks,Allroad })(Miningnavigation); 