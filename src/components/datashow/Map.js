import React, { Component } from 'react';
var BMap = window.BMap;
const BMAP_HYBRID_MAP=window.BMAP_HYBRID_MAP;
class Map extends Component {
    constructor(props){
       super(props);
       this.state={

       };
    }
    componentDidMount() {
        let map =new BMap.Map("allmap");
        map.centerAndZoom("西安",15);
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                BMAP_HYBRID_MAP,//混合地图
            ]}));
        map.setMapType(BMAP_HYBRID_MAP);
        map.enableScrollWheelZoom(true);
        //覆盖物
        var bdary = new BMap.Boundary();
        bdary.get("西安市雁塔区", function(rs){       //获取行政区域
            map.clearOverlays();        //清除地图覆盖物
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return ;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 1, strokeColor: "#938b0b"}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
            }
            map.setViewport(pointArray);    //调整视野

        });
    };
    render() {
        return(
            <div style={{width:"100%",height:this.props.mapHeight}} id="allmap">

            </div>
        );
    }
}
export default Map;