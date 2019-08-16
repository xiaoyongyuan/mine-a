import React, { Component } from 'react'
import './Miningnavigation.less'

export default class Miningnavigation extends Component {
    constructor(props){
        super(props);
        this.state={   
            // 当前页-1
            pagenum:0,
            // 总页数
            pagetotal:1,
            // 每页显示多少条
            everypage:7,
            responsedata:[
                {"id":1,"name":"一路网","begin":"矿区一","end":"矿区二","distance":232,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/xingbian_jiance4/FeatureServer"},
                {"id":2,"name":"二路网","begin":"矿区二","end":"矿区三","distance":60,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":3,"name":"三路网","begin":"矿区四","end":"矿区五","distance":20,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":4,"name":"四路网","begin":"矿区六","end":"矿区七","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":5,"name":"五路网","begin":"矿区八","end":"矿区九","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":6,"name":"六路网","begin":"矿区十","end":"矿区十一","distance":75,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":7,"name":"七路网","begin":"矿区十二","end":"矿区十三","distance":25,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":8,"name":"一路网","begin":"2矿区一","end":"矿区二","distance":232,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/xingbian_jiance4/FeatureServer"},
                {"id":9,"name":"二路网","begin":"2矿区二","end":"矿区三","distance":60,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":10,"name":"三路网","begin":"2矿区四","end":"矿区五","distance":20,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":11,"name":"四路网","begin":"2矿区六","end":"矿区七","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":12,"name":"五路网","begin":"2矿区八","end":"矿区九","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":13,"name":"六路网","begin":"2矿区十","end":"矿区十一","distance":75,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":14,"name":"七路网","begin":"2矿区十二","end":"矿区十三","distance":25,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":15,"name":"一路网","begin":"3矿区一","end":"矿区二","distance":232,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/xingbian_jiance4/FeatureServer"},
                {"id":16,"name":"二路网","begin":"3矿区二","end":"矿区三","distance":60,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":17,"name":"三路网","begin":"3矿区四","end":"矿区五","distance":20,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":18,"name":"四路网","begin":"3矿区六","end":"矿区七","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":19,"name":"五路网","begin":"3矿区八","end":"矿区九","distance":10,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":20,"name":"六路网","begin":"3矿区十","end":"矿区十一","distance":75,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
                {"id":21,"name":"七路网","begin":"3矿区十二","end":"矿区十三","distance":25,"url":"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance5/FeatureServer"},
            ],
            
        };
    }
    componentWillMount(nextProps,nextState){
        var pagetotal=this.state.responsedata.length/this.state.everypage;
        this.setState({
            pagetotal:pagetotal
        })
    }
    // 上一页
    prev(){
        var pagenum=this.state.pagenum-1;
        
        if(pagenum<=0){
            pagenum=0
        }
        this.setState({
            pagenum:pagenum
        })
    }
    // 下一页
    next(){
        var pagenum=this.state.pagenum+1;
        
        if(pagenum>=this.state.pagetotal){
            pagenum=this.state.pagetotal-1
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
    // 点击路网信息
    Changeglobe(val){

    }

    render() {
        var _this=this;
        
        return (
            <div className="Miningnavigation">
                <p className="myiconfont">
                    <span class="actionfont action-daohang"></span><span>矿区导航</span>
                </p>
                <div className="MiniAll"> 
                <div className="miniEcharts">
                    <div className="num">{ this.state.responsedata.length }</div>
                    <div className="numtitle">路网总数</div>
                </div>


                {/* 上一页下一页按钮 */}
                <div className="columndl" style={{marginBottom:'10px'}}>
                    <div className="columndt Basedata-item-zw" id="Basedata-item-zw">
                        <div className="page"  onClick={this.prev.bind(this)}>上一页</div>
                        <div className="news">路网信息</div>
                        <div className="page" onClick={this.next.bind(this)}>下一页</div>
                    </div>
                </div>
                
                {/* 内容 */}
                {
                    this.state.responsedata.slice(this.state.pagenum * this.state.everypage, this.state.everypage * (this.state.pagenum + 1)).map(function(item,keys){
                        return (
                            <div className="Basedata-item-sbsl" 
                            onClick={_this.Changeglobe.bind(_this,item)}
                            key={item.id}>
                                <div className="itemname">{item.name}---{item.id}</div>
                                <div className="jcwname">
                                    <div className="jcwword">
                                        <div>起点: {item.begin}</div>
                                        <div>终点: {item.begin}</div>
                                    </div>
                                    <div className="distance">
                                        {item.distance} KM
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
