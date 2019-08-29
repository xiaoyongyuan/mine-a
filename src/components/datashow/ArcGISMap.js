import React, { Component } from 'react'
import esriLoader from 'esri-loader'
import './mapshow.less'
// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AllroadGobai } from '../../actions/postActions';

import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
import { isNull } from 'util';


class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    // this.tileMapUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
    this.state={
      view:null,
      map:null,
      FeatureLayer:null,
      taskLayer:null,
      Graphic:null,
      MapImageLayer:null,
      TileLayer:null,
      newMapImageLayer:null,
      sunhui1:null,
      caikuangqu:null,
      gongchang:null,
      bianjie:null,
      VectorTileLayer:null,
      permitsLayer:null,
      featureLayer3:null,
      featureLayer1:null,
      featureLayer2:null,
      kqdhLayer:null,
    }
  }
  componentDidMount() {
    this.initMap()
  }
  initMap() {
    const mapURL = {
      // url: "http://192.168.10.29:8080/arcgis/arcgis_js_api/library/4.11/dojo/dojo.js"
      url: "http://39.97.238.216:9999/arcgis_js_v412_api/arcgis_js_api/library/4.12/init.js"
     // url: "https://js.arcgis.com/4.12/"
      // url:window.g.mapURL+"/arcgis/arcgis_js_api/library/4.11/dojo/dojo.js"
    };
    esriLoader.loadModules([
      "esri/tasks/Locator",
      "esri/Map",
      "esri/Basemap",
      "esri/portal/Portal",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/layers/WebTileLayer",
      "esri/widgets/BasemapToggle",
      "esri/layers/MapImageLayer",
      "esri/layers/ElevationLayer",
      "esri/layers/TileLayer",
      "esri/layers/VectorTileLayer",
      "esri/widgets/Zoom",
      "esri/Graphic"
    ], mapURL).then(([
      // 小部件，没懂
      Locator,
      // 管理和覆盖2D和3D查看共有的图层的属性和方法。
      Map,
      Basemap,
      Portal,
      SceneView,
      FeatureLayer,
      WebTileLayer,
      // BasemapToggle允许最终用户在两个底图之间切换。比如实验点
      BasemapToggle,
      // MapImageLayer允许您显示和分析地图服务中定义的子图层中的数据
      MapImageLayer,
      // ElevationLayer是用于在SceneView中渲染高程的切片图层。通过将地图的地面属性设置为，可以将默认的世界高程图层添加到地图中。
      ElevationLayer,
      // Zoom缩放窗口小部件允许用户在视图中放大/缩小。
      TileLayer,
      VectorTileLayer,
      Zoom,
      Graphic
    ]) => {
      this.state.FeatureLayer=FeatureLayer;
      this.state.Graphic=Graphic;
      this.state.MapImageLayer=MapImageLayer;
      this.state.TileLayer=TileLayer;
      this.state.VectorTileLayer=VectorTileLayer;

      var mapBaseLayer = new WebTileLayer({
        urlTemplate:
          "https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png",
        subDomains: ["a", "b", "c", "d"],
        copyright:
          'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
          'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
          'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
          'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
      });
      var stamen = new Basemap({
        baseLayers: [mapBaseLayer],
        title: "Terrain",
        id: "terrain",
        thumbnailUrl:
          "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
      });

      var initCamera = {
        heading: 124.7,
        tilt: 82.9,
        position: {
          latitude: 40.713906,
          longitude: -111.848111,
          z: 1990
        }
      };

    


      var portal = new Portal({
        url: "https://beidou.esrichina.com/arcgis"
      })


      // 创建底图
      this.state.map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
      });




   
     let  _this = this;

      this.state.view = new SceneView({
        // center : [110.3038,39.3027],
        map: _this.state.map,
        container: "mapDiv",
      });
      //清空view组件
      this.state.view.ui.empty("top-left");
      var lng = 110.25197636123258, lat = 39.36945365936541;
      //初次加载跳转到地图中心点
      this.state.view.goTo({
        heading: 246.50443209217798,
        tilt: 73.67726241280418,
        center: [lng, lat],
        zoom: 14,
      });
    
      this.state.view.on("click", function (e) {
        //console.log(view.center);
      });

      
      

      this.state.view.when(function () {
        var toggle = new BasemapToggle({
          titleVisible: true,
          view: _this.state.view,
          nextBasemap: stamen
        });




        // var featureLayer = new FeatureLayer({
        //   // url:"https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/OpenBeerDatabase/FeatureServer/0",
        //   url:"https://beidou.esrichina.com/server/rest/services/Hosted/chengjiang_jiance1/SceneServer/0",
        //   outFields: ["*"],
        //   definitionExpression: "country = 'United States'",
        //   popupTemplate: {
        //     title: "{name}",
        //     actions: [
        //       {
        //         id: "find-brewery",
        //         image:
        //           "http://www.bdjjb.cn/img/1.png",
        //         title: "Brewery Info"
        //       }
        //     ],
        //     content: [
        //       {
        //         type: "fields",
        //         fieldInfos: [
        //           {
        //             fieldName: "name"
        //           },
        //           {
        //             fieldName: "address1",
        //             label: "address"
        //           },
        //           {
        //             fieldName: "city"
        //           },
        //           {
        //             fieldName: "state"
        //           },
        //           {
        //             fieldName: "phone"
        //           },
        //           {
        //             fieldName: "website"
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // });

        // map.add(featureLayer);
        // view.when(function () {
        //   // Watch for when features are selected
        //   view.popup.watch("selectedFeature", function (graphic) {
        //     if (graphic) {
        //       // Set the action's visible property to true if the 'website' field value is not null, otherwise set it to false
        //       var graphicTemplate = graphic.getEffectivePopupTemplate();
        //       graphicTemplate.actions.items[0].visible = graphic.attributes
        //         .website
        //         ? true
        //         : false;
        //     }
        //   });
        // });
        // view.when(function () {
        //   var popup = view.popup;
        //   popup.actionsMenuEnabled = false; // Set this to false to disable actions displaying in a menu
        //   popup.viewModel.on("trigger-action", function (event) {
        //     if (event.action.id === "find-brewery") {
        //       var attributes = popup.viewModel.selectedFeature.attributes;
        //       // Get the 'website' field attribute
        //       var info = attributes.website;
        //       // Make sure the 'website' field value is not null
        //       if (info) {
        //         // Open up a new browser using the URL value in the 'website' field
        //         window.open(info.trim());
        //       }
        //     }
        //   });
        // });
        //设置小控件的位置
        // var compass = new Compass({
        //   view: view
        // });
        // let navigationToggle = new NavigationToggle({
        //   view: view
        // });
        let zoom = new Zoom({
          view: _this.state.view
        });
        
        //this.state.view.ui._removeComponents(["attribution", "navigation-toggle", "compass", "zoom"]);
       // this.state.view.ui.add(zoom, "bottom-right");
        //this.state.view.ui.add(toggle, "top-right");

        //     var g = new Graphic({
        //       "geometry": { "type": "point", "latitude": lat, "longitude": lng, "spatialReference": { "wkid": 4326 } },
        //       "symbol": { "type": "simple-marker", "color": [226, 119, 40], },
        //       "attributes": { "id": 1, "name": "名称XXXXX", "value": "结果YYYYY" },
        //       "popupTemplate": {
        //           "content": "<p class='popup-con-title'>点位详情</p>"
        //           + "<div class='popup-con-con'>"
        //           + "<div>坐标位置.经度：" + lng + "</div>"
        //           + "<div>坐标位置.纬度：" + lat + "</div>"
        //           + "<div>形变监测网</div>"
        //           + "</div>"
        //       }
        //   });
        //   view.graphics.add(g);
        //   var g1 = new Graphic({
        //     "geometry": { "type": "point", "latitude": lat+0.01, "longitude": lng, "spatialReference": { "wkid": 4326 } },
        //     "symbol": { "type": "simple-marker", "color": [226, 119, 40], },
        //     "attributes": { "id": 1, "name": "名称XXXXX", "value": "结果YYYYY" },
        //     "popupTemplate": {
        //         "content": "<p class='popup-con-title'>点位详情</p>"
        //         + "<div class='popup-con-con'>"
        //         + "<div>坐标位置.经度：" + lng + "</div>"
        //         + "<div>坐标位置.纬度：" + lat + "</div>"
        //         + "<div>形变监测网</div>"
        //         + "</div>"
        //     }
        // });
        // view.graphics.add(g1);

        //   view.popup.autoOpenEnabled = false;
        //   view.on("click", function (event) {
        //     // Get the coordinates of the click on the view
        //     // around the decimals to 3 decimals

        //     console.log(event);
        //     var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        //     var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
        //     console.log(lat,lon);
        //     view.popup.open({
        //       // Set the popup's title to the coordinates of the clicked location
        //       title: "Reverse geocode: [" + lon + ", " + lat + "]",
        //       location: event.mapPoint // Set the location of the popup to the clicked location
        //     });

        //     locatorTask.locationToAddress(event.mapPoint)
        //     .then(function (response) {
        //       // If an address is successfully found, show it in the popup's content
        //       view.popup.content = response.address;
        //     })
        //     .catch(function (error) {
        //       // If the promise fails and no result is found, show a generic message
        //       view.popup.content = "No address was found for this location";
        //     });

        //   });
      });

      // 添加图层
      var permitsLayer = new this.state.MapImageLayer({
        // portalItem: {
        //   // autocasts as new PortalItem()
        //   portal:portal,
        //   id: "089bc8d0950c46ca8877902e0bb9dbb4"
        // }
        url: "https://beidou.esrichina.com/server/rest/services/halagou_yingxiang_q/MapServer",
        title: "Touristic attractions",
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        featureReduction: {
          type: "selection"
        },
      });
      this.state.map.add(permitsLayer);


      var elevLyr = new ElevationLayer({
        // Custom elevation service
        url: "https://120b482b.nat123.cc/server/rest/services/Hosted/DEM_2/ImageServer"
      });
      // Add elevation layer to the map's ground.
     // this.state.map.ground.layers.add(elevLyr);

      let featureLayer = new FeatureLayer({
        url: "https://120b482b.nat123.cc/server/rest/services/Hosted/bianjie/FeatureServer",
        title: "Touristic attractions",
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        featureReduction: {
          type: "selection"
        },
      })
      // map.add(featureLayer);

      let featureLayer2 = new FeatureLayer({
        url: "https://beidou.esrichina.com/server/rest/services/Hosted/xingbian_jiance4/FeatureServer",
        title: "Touristic attractions",
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        featureReduction: {
          type: "selection"
        },
      })
      //this.state.map.add(featureLayer2);
      //this.state.map.add(featureLayer2);

      




    })
  }
  componentWillUpdate(nextProps) {
    var _this=this;
    // 返回上一层，清理地球图层
    if(nextProps.identify==0){
      // this.state.map.removeAll();
      // 清理 矿区导航-路网,首页系统总览_空间分析
      if(this.state.taskLayer){
        this.state.map.remove(this.state.taskLayer);
      }
      // 清理 系统总揽:监测设备,基础数据
      if(_this.state.view.graphics){
        _this.state.view.graphics.removeAll();
      }
      // 清理 遥感监测:INSAR,高光谱,土地损毁与复垦 ,地形地貌
      if(this.state.newMapImageLayer||this.state.permitsLayer ||this.state.bianjie ||this.state.caikuangqu ||this.state.gongchang ||this.state.sunhui1||this.state.featureLayer1||this.state.featureLayer2||this.state.featureLayer3){
        this.state.map.remove(this.state.newMapImageLayer);
        this.state.map.remove(this.state.permitsLayer);
        this.state.map.remove(this.state.bianjie);
        this.state.map.remove(this.state.caikuangqu);
        this.state.map.remove(this.state.gongchang);
        this.state.map.remove(this.state.sunhui1);
        this.state.map.remove(this.state.featureLayer1);
        this.state.map.remove(this.state.featureLayer2);
        this.state.map.remove(this.state.featureLayer3);
      }
      // 清理 矿区导航
      if(this.state.kqdhLayer){
        this.state.map.remove(this.state.kqdhLayer);
      }
    }




    // 首页系统总览_矿区导航-总路网
    if(nextProps.identify=="Allroad"){
      if(this.state.kqdhLayer){
        this.state.map.remove(this.state.kqdhLayer);
      }
      var popupTemplate = {
        "title": "展示信息",
        "content":"道路名称为:{daolu_name},起点是:{start},终点是:{end},长度为:{length}" 
      } 
       this.state.kqdhLayer = new this.state.FeatureLayer({
          url: nextProps.Allroad,
          popupTemplate: popupTemplate
      });
      this.state.map.add(this.state.kqdhLayer);

 


      _this.state.view.when(function() {
        return _this.state.kqdhLayer.when(function() {
          var query = _this.state.kqdhLayer.createQuery();
          query.where = "1=1";
          return _this.state.kqdhLayer.queryFeatures(query);
        });
      }).then(getValues);
    
      function getValues(response) {
        // 促发redux,把数据返回
        _this.props.AllroadGobai(response);
      }
    }



    // 矿区导航-各个路网
    if(nextProps.identify=="network"){
          var feature = nextProps.network;
          _this.state.view.goTo(feature.geometry.extent.expand(2)).then(function() {
            _this.state.view.popup.open({
              features: [feature],
              location: feature.geometry.centroid
            });
          });

    }



    // 首页系统总览_空间分析
    if(nextProps.identify=="Spatia"){
      if(this.state.taskLayer){
        this.state.map.remove(this.state.taskLayer);
      }
      console.log(nextProps.Spatiadata);
       this.state.taskLayer = new this.state.TileLayer({
        url: nextProps.Spatiadata.layerurl,
        title: "Touristic attractions",
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        featureReduction: {
          type: "selection"
        },
      });
      this.state.map.add(this.state.taskLayer);
    }



    



    // 首页数据监测
    if(nextProps.identify=="Monitoringdata"){
      if(this.state.taskLayer){
        this.state.map.remove(this.state.taskLayer);
      }
       this.state.taskLayer = new this.state.FeatureLayer({
          url: nextProps.Monitorings.layerurl,
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
      });
      this.state.map.add(this.state.taskLayer);
      
    }








    // 遥感监测:
    if(nextProps.identify=="remote"){
      if(this.state.newMapImageLayer||this.state.permitsLayer ||this.state.bianjie ||this.state.caikuangqu ||this.state.gongchang ||this.state.sunhui1||this.state.featureLayer1||this.state.featureLayer2||this.state.featureLayer3){
        this.state.map.remove(this.state.newMapImageLayer);
        this.state.map.remove(this.state.permitsLayer);
        this.state.map.remove(this.state.bianjie);
        this.state.map.remove(this.state.caikuangqu);
        this.state.map.remove(this.state.gongchang);
        this.state.map.remove(this.state.sunhui1);
        this.state.map.remove(this.state.featureLayer1);
        this.state.map.remove(this.state.featureLayer2);
        this.state.map.remove(this.state.featureLayer3);
      }
      // 地形地貌
      if( nextProps.remotedata=='topographic'){
        //矿区边界
        this.state.bianjie = new this.state.VectorTileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/hualagou_bianjie/VectorTileServer"
        });
        // 地形地貌1
        this.state.featureLayer3 = new this.state.VectorTileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_denggaoxian1/VectorTileServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        });
        // 地形地貌2
        this.state.featureLayer1 = new this.state.TileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_shade1/MapServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        });
        // 地形地貌3
        this.state.featureLayer2 = new this.state.TileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_dixing_xuanran/MapServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        });

        this.state.map.add(this.state.bianjie);
        this.state.map.add(this.state.featureLayer1);
        this.state.map.add(this.state.featureLayer2);
        this.state.map.add(this.state.featureLayer3);
       }
      // INSAR
      if( nextProps.remotedata=='INSAR'){
       this.state.newMapImageLayer = new this.state.TileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_chenjiang_dem/MapServer"
        });
        this.state.map.add(this.state.newMapImageLayer);
      }
      // 高光谱
      if( nextProps.remotedata=='gaoguangpu'){
        this.state.newMapImageLayer = new this.state.TileLayer({
           url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_NDVI/MapServer"
         });
         this.state.map.add(this.state.newMapImageLayer);
       }

      //  土地损毁与复垦
      if( nextProps.remotedata=='land'){
         // 添加图层
         this.state.permitsLayer = new this.state.TileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/HAG_yingxiang_meihua1/MapServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        });
        
        // 土地损毁与复垦1
        this.state.sunhui1 = new this.state.VectorTileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/gongyequ/VectorTileServer"
        });
        // 土地损毁与复垦2
        this.state.caikuangqu = new this.state.FeatureLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/caikuanqu_dian/FeatureServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          }
        });
        // 土地损毁与复垦3
        this.state.gongchang = new this.state.FeatureLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/gongchang_dian/FeatureServer",
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          }
        });
        //矿区边界
        this.state.bianjie = new this.state.VectorTileLayer({
          url: "https://www.beidouhj.com/server/rest/services/Hosted/hualagou_bianjie/VectorTileServer"
        });
        this.state.map.add(this.state.permitsLayer)
        this.state.map.add(this.state.bianjie);
        this.state.map.add(this.state.gongchang);
        this.state.map.add(this.state.caikuangqu);
        this.state.map.add(this.state.sunhui1);
       }
    }


    




    // 系统总揽:监测设备
    if(nextProps.identify=="monit"){
      homeSystemMonitoring.MonitoringOne({"netid":nextProps.monitdata.netid})
      .then(res=>{
        console.log(res);
        if(_this.state.view.graphics){
          _this.state.view.graphics.removeAll();
        }
        //添加图层标注
        var mapdata=res.data;
        let newview=this.state.view;
        for(var i=0;i<=mapdata.length-1;i++){
          var x=mapdata[i].lnglat.split(',')[0];
          var y=mapdata[i].lnglat.split(',')[1];
          //将点的样式和位置放在Graphic里面
           let Graphic1 = new _this.state.Graphic({
             geometry: {
                type: 'point',
                longitude: x,
                latitude: y,
             },
              symbol: {
                 type: 'picture-marker',
                  url: 'http://info.beidouenv.com/UploadFile/Img/point_blue.png',
                  width: '32px',
                  height: '32px',
               },
              popupTemplate:{
                  content: "<p class='popup-con-title'>点位详情</p>"
                  + "<div class='popup-con-con'>"
                  + "<div>坐标位置.经度：" + x + "</div>"
                  + "<div>坐标位置.纬度：" + y + "</div>"
                  + "<div>形变监测网</div>"
                  + "</div>"
              }
           });
            //显示图标
            _this.state.view.graphics.add(Graphic1);
        }
      })

    }



    // 系统总揽:基础数据
    if(nextProps.identify=="database"){
      homeSystemMonitoring.groundFissure({"netid":nextProps.newPost.netid})
        .then(res => {
            if(_this.state.view.graphics){
              _this.state.view.graphics.removeAll();
            }
            //添加图层标注
            var mapdata=res.data;
            let newview=this.state.view;
            for(var i=0;i<=mapdata.length-1;i++){
              var x=mapdata[i].lnglat.split(',')[0];
              var y=mapdata[i].lnglat.split(',')[1];
              //将点的样式和位置放在Graphic里面
               let Graphic1 = new _this.state.Graphic({
                 geometry: {
                    type: 'point',
                    longitude: x,
                    latitude: y,
                 },
                  symbol: {
                     type: 'picture-marker',
                      url: 'http://info.beidouenv.com/UploadFile/Img/point_blue.png',
                      width: '32px',
                      height: '32px',
                   },
                  popupTemplate:{
                      content: "<p class='popup-con-title'>点位详情</p>"
                      + "<div class='popup-con-con'>"
                      + "<div>坐标位置.经度：" + x + "</div>"
                      + "<div>坐标位置.纬度：" + y + "</div>"
                      + "<div>形变监测网</div>"
                      + "</div>"
                  }
               });
                //显示图标
                _this.state.view.graphics.add(Graphic1);
            }
        });
    }
  }
  render() {
    return (
      <div className="ArcGISMap">
        <div className="mapDiv" id="mapDiv"></div>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  newPost: state.posts.item,
  monitdata: state.posts.monitdata,
  identify: state.posts.identify,
  remotedata: state.posts.remotedata,
  network: state.posts.network,
  Monitorings: state.posts.Monitorings,
  Spatiadata: state.posts.Spatiadata,
  Allroad: state.posts.Allroad,
})

ArcGISMap.propTypes = {
  AllroadGobai: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, { AllroadGobai })(ArcGISMap);
