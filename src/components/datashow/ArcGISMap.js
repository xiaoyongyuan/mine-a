import React, { Component } from 'react'
import esriLoader from 'esri-loader'

import './mapshow.less'
 
export default class ArcGISMap extends Component{
    constructor(props){
        super(props)
       // this.tileMapUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
       // this.tileMapUrl = "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/"
        this.tileMapUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
    }
    componentDidMount(){
        this.initMap()
    }
    initMap(){
        const mapURL = {
            url:"http://192.168.10.29:8080/arcgis/arcgis_js_api/library/4.11/dojo/dojo.js"
        }
        esriLoader.loadModules([
          "esri/Map",
          "esri/Basemap",
          "esri/layers/TileLayer", 
          "esri/views/SceneView",
          "esri/layers/FeatureLayer",
          "dojo/domReady!"
        ], mapURL).then(([Map,Basemap,TileLayer,SceneView,FeatureLayer])=>{
            let layer = new TileLayer({
              url: this.tileMapUrl       
            })
            let baseMap = new Basemap({
              baseLayers: [layer],  
              title: "Basemap",  
              id: "myBasemap" 
            });
            // Create a Map instance
            let map = new Map({
              //basemap: baseMap,
              basemap: "hybrid",
              ground: "world-elevation"
            });
            // Create a MapView instance (for 2D viewing) and reference the map instance
            let view = new SceneView({
              center : [110.3038,39.3027],
              map:map,
              container: "mapDiv",
            });
            //移除工具栏
            view.ui.components = [];
             view.goTo({
              heading: 59.508787762783214,
              tilt: 85.90401895291156,
              z: 2389.9690436590463,
              center: [-111.84777338495346, 40.60083446525946],
              zoom: 18
            });
         
          let pointLayer = new FeatureLayer({
                  //url: "https://beidou.esrichina.com/server/rest/services/Hosted/cornerPoint1/FeatureServer"
                  url:"https://beidou.esrichina.com/server/rest/services/Hosted/test3d_WFL1/FeatureServer"
          });

          map.add(pointLayer);
        })

    }
    render(){
        return(
            <div className="ArcGISMap">
                <div className="mapDiv" id="mapDiv"></div>
            </div>
        )
    }
}
