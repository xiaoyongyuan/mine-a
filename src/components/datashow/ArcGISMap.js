import React, { Component } from 'react';
import esriLoader from 'esri-loader';

// redux需要
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AllroadGobai,Core,Cameras,HistoricalLayer } from '../../actions/postActions';

import homeSystemMonitoring from "../../axios/homeSystemMonitoring";
import { isNull } from 'util';

import { Modal , Select } from 'antd';
const { Option } = Select;

class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    // this.tileMapUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
    this.state={
      visible: false,
      bof:0,
      player:"",
      bf:"",
      hd: "",
      sd: "",

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
      permitsLayer2:null,
      camera:null
    }
  }
  componentDidMount() {
    this.initMap()
  }
  initMap() {
    const mapURL = {
      url: window.g.arcgisfile+"/file/arcgis_js_v412_api/arcgis_js_api/library/4.12/init.js"
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
      "esri/widgets/Expand",
      "esri/widgets/Legend",
      "esri/widgets/Zoom",
      "esri/Graphic",
      "esri/widgets/Compass",
      "esri/widgets/LayerList",
      // "app/Recenter"




      //       "esri/widgets/Bookmarks",
      //       "dojo/query",
      //       "dojo/on",
      //       "dojo/_base/connect"
      // "esri/dijit/OverviewMap",

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
      Expand,
      Legend,
      Zoom,
      Graphic,
      Compass,
      LayerList,
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
      //清空view组件 小工具
      this.state.view.ui.empty("top-left");
      let lng = 110.21661767900059, lat = 39.322323289229026;
      //初次加载跳转到地图中心点
      this.state.view.goTo({
        heading: 0,
        tilt: 73.67726241280418,
        center: [lng, lat],
        zoom: 14,
      });
      // 正北方向
      this.state.view.rotation = 0;


      // 地球被拖动
      this.state.view.on("drag", function(event){
        if(event.action=="end"){
          // console.log(event);
          _this.props.Core("1");
        }
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
      // });

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

      



      //矿区边界
      this.state.bianjie = new this.state.VectorTileLayer({
        url: "https://www.beidouhj.com/server/rest/services/Hosted/hualagou_bianjie/VectorTileServer"
      });
      this.state.map.add(this.state.bianjie);
      // 添加图层
      this.state.permitsLayer2 = new this.state.TileLayer({
        url: "https://www.beidouhj.com/server/rest/services/Hosted/halagou_August/MapServer",
              title: "Touristic attractions",
              elevationInfo: {
                mode: "relative-to-scene"
              },
              outFields: ["*"],
              featureReduction: {
                type: "selection"
              },
      });
      this.state.map.add(this.state.permitsLayer2);
     

      // 地图小工具
      this.state.view.ui._removeComponents(["attribution", "navigation-toggle", "compass", "zoom"]);
      this.state.view.ui.add(
        [
          new BasemapToggle({
            titleVisible: true,
            view: this.state.view,
            nextBasemap: stamen,
            group: "top-right"
          }),

          new Expand({//图例
            view: this.state.view,
            content: new Legend({view: this.state.view,style: "card"}),
            group: "top-right",
            expanded: false
          }),
          new Zoom({
            view: this.state.view,
            group: "bottom-right"
          }),
          new Compass({
              view: this.state.view,
              group: "top-right",
            }),
        ],
        "top-right"
      );
    
      // 直播
      this.state.view.on("click", function(event) {
        var screenPoint = {
         x: event.x,
         y: event.y
        };
        //  Search for graphics at the clicked location
         _this.state.view.hitTest(screenPoint).then(function(response) {

           var result = response.results[0];
           if (result && result.graphic.attributes.cameras && result.graphic.attributes.cameras=="cameras") {
            //  var lon = result.mapPoint.longitude;
            //  var lat = result.mapPoint.latitude;
       
            //  console.log("Hit surface at (" + lon + ", " + lat + "), graphic:", result.graphic || "none");
            //  console.log(result.graphic.attributes);

              _this.setState({
                visible: true,
                hd: result.graphic.attributes.hd,
                sd: result.graphic.attributes.sd,
                bf:result.graphic.attributes.sd,
              });
              _this.state.player = new window.EZUIKit.EZUIPlayer("myPlayer1");
           }
         });
       });
       

      
    })
  }

 // 模态框
  handleCancel = e => {
    // console.log(e);
    // this.state.player.stop();
    this.setState({
      visible: false,
    });
  };
  // 直播模态框中的下拉
  handleChange= val =>{
    // console.log(val);
    let _this=this;
    let valu=val.key;
    // console.log(this.state[valu]);
    this.setState({
      bf:this.state[valu]
    },()=>{
      _this.state.player = new window.EZUIKit.EZUIPlayer("myPlayer1");
    })
  }

  // 清理地球图层
  removeAllmap(){
      this.state.view.graphics.removeAll();
      this.state.map.removeAll();
      this.state.map.add(this.state.bianjie);
      this.state.map.add(this.state.permitsLayer2);
      this.props.HistoricalLayer({name:"清理地球图层",map:[{title:"2009-2",FeatureLayer:[],TileLayer:[]}]});
     
  }

  // 点击小地球回到中心点
  clean(){
    let lng = 110.21661767900059, lat = 39.322323289229026;
    this.state.view.goTo({
      heading: 0,
      tilt: 73.67726241280418,
      center: [lng, lat],
      zoom: 14,
    });
  }
  // 摄像头显示图层
  showcamera(){
    if(this.state.camera){
      this.state.map.remove(this.state.camera);
    }
   
    this.state.camera = new this.state.FeatureLayer({
        url: "https://www.beidouhj.com/server/rest/services/Hosted/%E6%91%84%E5%83%8F%E5%A4%B4%E7%9B%91%E6%8E%A7%E7%BD%91/FeatureServer",
        title: "Touristic attractions",
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        featureReduction: {
          type: "selection"
        },
    });
    this.state.map.add(this.state.camera);  
  }

  // 首页系统总览_矿区导航-总路网
  allroad(Allroad){
    var _this=this;
    if(this.state.kqdhLayer){
      this.state.map.remove(this.state.kqdhLayer);
    }
    var popupTemplate = {
      "title": "展示信息",
      "content":"道路名称为:{daolu_name},起点是:{start},终点是:{end},长度为:{length}" 
    } 
     this.state.kqdhLayer = new this.state.FeatureLayer({
        url: Allroad,
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
  network(network){
    var _this=this;
    var feature = network;
    _this.state.view.goTo(feature.geometry.extent.expand(2)).then(function() {
      _this.state.view.popup.open({
        features: [feature],
        location: feature.geometry.centroid
      });
    });
  }

  // 首页系统总览_空间分析
  spatia(layerurl){
    if(this.state.taskLayer){
      this.state.map.remove(this.state.taskLayer);
    }
    // console.log(nextProps.Spatiadata);
     this.state.taskLayer = new this.state.TileLayer({
      url: layerurl,
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

   // 首页数据监测——山水
   shanshui(mountain){
      if(this.state.taskLayer){
        this.state.map.remove(this.state.taskLayer);
      }
       this.state.taskLayer = new this.state.FeatureLayer({
          url: mountain,
          popupTemplate: {
            // autocasts as new PopupTemplate()
            title: "{name}",
            content: [
              {
                type: "fields", // FieldsContentElement
                fieldInfos: [
                  {
                    fieldName: "device_type",
                    visible: true,
                    label: "传感器",
                    format: {
                      places: 0,
                      digitSeparator: true
                    }
                  },
                  {
                    fieldName: "monitor_network",
                    visible: true,
                    label: "监测网",
                    format: {
                      places: 0,
                      digitSeparator: true
                    },
                    statisticType: "sum"
                  },
                  {
                    fieldName: "x",
                    visible: true,
                    label: "x"
                  },
                  {
                    fieldName: "y",
                    visible: true,
                    label: "y"
                  },
                  {
                    fieldName: "z",
                    visible: true,
                    label: "z"
                  },
                  {
                    fieldName: "jichushuju",
                    visible: true,
                    label: "基础数据"
                  },
                  {
                    fieldName: "xianyoushuju",
                    visible: true,
                    label: "实时数据"
                  },
                  {
                    fieldName: "shujuzongshu",
                    visible: true,
                    label: "数据总数"
                  }
                ]
              },
              {
                type: "attachments" // AttachmentsContentElement
              }
            ]
          },
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

   // 首页数据监测——监测网
   Monitoringdata(layerurl){
    if(this.state.taskLayer){
      this.state.map.remove(this.state.taskLayer);
    }
     this.state.taskLayer = new this.state.FeatureLayer({
        url: layerurl,
        popupTemplate: {
          // autocasts as new PopupTemplate()
          title: "{name}",
          content: [
            {
              type: "fields", // FieldsContentElement
              fieldInfos: [
                {
                  fieldName: "device_type",
                  visible: true,
                  label: "传感器",
                  format: {
                    places: 0,
                    digitSeparator: true
                  }
                },
                {
                  fieldName: "monitor_network",
                  visible: true,
                  label: "监测网",
                  format: {
                    places: 0,
                    digitSeparator: true
                  },
                  statisticType: "sum"
                },
                {
                  fieldName: "x",
                  visible: true,
                  label: "x"
                },
                {
                  fieldName: "y",
                  visible: true,
                  label: "y"
                },
                {
                  fieldName: "z",
                  visible: true,
                  label: "z"
                },
                {
                  fieldName: "jichushuju",
                  visible: true,
                  label: "基础数据"
                },
                {
                  fieldName: "xianyoushuju",
                  visible: true,
                  label: "实时数据"
                },
                {
                  fieldName: "shujuzongshu",
                  visible: true,
                  label: "数据总数"
                }
              ]
            },
            {
              type: "attachments" // AttachmentsContentElement
            }
          ]
        },
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
  remote(remotedata){
    // this.removeAllmap();
    this.state.view.graphics.removeAll();
    this.state.map.removeAll();
    this.state.map.add(this.state.bianjie);
    this.state.map.add(this.state.permitsLayer2);
    let _this=this;
    console.log(remotedata);

    if(remotedata.map.length==1){
      let myfl = remotedata.map[0].FeatureLayer;
      let mytl = remotedata.map[0].TileLayer;
      for(var i=0;i<myfl.length;i++){
        this.state.map.add(new this.state.FeatureLayer({
          url: myfl[i],
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        }));
      }

      for(var j=0;j<mytl.length;j++){
        this.state.map.add(new this.state.TileLayer({
                url:mytl[j],
                title: "Touristic attractions",
                elevationInfo: {
                  mode: "relative-to-scene"
                },
                outFields: ["*"],
                featureReduction: {
                  type: "selection"
                },
        }));
      }
      
      this.props.HistoricalLayer(remotedata);
    }else if(remotedata.map.length>1){
      this.props.HistoricalLayer(remotedata);
    }
  }

  // 历史图层点击各个图层
  historyEveryone(Everyone){
    console.log(Everyone);
    this.state.view.graphics.removeAll();
    this.state.map.removeAll();
    this.state.map.add(this.state.bianjie);
    this.state.map.add(this.state.permitsLayer2);

      let myfl = Everyone.FeatureLayer;
      let mytl = Everyone.TileLayer;
      for(var i=0;i<myfl.length;i++){
        this.state.map.add(new this.state.FeatureLayer({
          url: myfl[i],
          title: "Touristic attractions",
          elevationInfo: {
            mode: "relative-to-scene"
          },
          outFields: ["*"],
          featureReduction: {
            type: "selection"
          },
        }));
      }

      for(var j=0;j<mytl.length;j++){
        this.state.map.add(new this.state.TileLayer({
                url:mytl[j],
                title: "Touristic attractions",
                elevationInfo: {
                  mode: "relative-to-scene"
                },
                outFields: ["*"],
                featureReduction: {
                  type: "selection"
                },
        }));
      }
  }


  // 系统总揽:监测设备
  monit(netid){
    let _this=this;
    homeSystemMonitoring.MonitoringOne({"netid":netid})
    .then(res=>{
      if(res.success){
        if(_this.state.view.graphics){
          _this.state.view.graphics.removeAll();
        }
        //添加图层标注
        var mapdata=res.data;
        let newview=this.state.view;
        for(var i=0;i<=mapdata.length-1;i++){
          var x=mapdata[i].lnglat.split(',')[0];
          var y=mapdata[i].lnglat.split(',')[1];
          var pointname = mapdata[i].pointname;
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
                  title:pointname,
                  content:"<table class='esri-widget__table' summary='属性和值列表'><tbody>"
                    +"<tr><th class='esri-feature__field-header'>点位名称</th><td class='esri-feature__field-data'>"+pointname+"</td></tr>"
                    +"<tr><th class='esri-feature__field-header'>监测网</th><td class='esri-feature__field-data'></td></tr>"
                    +"<tr><th class='esri-feature__field-header'>坐标位置.经度</th><td class='esri-feature__field-data'>"+x+"</td></tr>"
                    +"<tr><th class='esri-feature__field-header'>坐标位置.纬度</th><td class='esri-feature__field-data'>"+y+"</td></tr>"
                    +"<tr><th class='esri-feature__field-header'>基础数据</th><td class='esri-feature__field-data'></td></tr>"
                    +"<tr><th class='esri-feature__field-header'>实时数据</th><td class='esri-feature__field-data'></td></tr>"
                    +"<tr><th class='esri-feature__field-header'>数据总数</th><td class='esri-feature__field-data'></td></tr></tbody></table>"
              }
           });
            //显示图标
            _this.state.view.graphics.add(Graphic1);
        }
      }
    })

  }


  // 系统总揽:基础数据
  database(netid){
    let _this=this;
    homeSystemMonitoring.groundFissure({"netid":netid})
      .then(res => {
        if(res.success){
          if(_this.state.view.graphics){
            _this.state.view.graphics.removeAll();
          }
          
          //添加图层标注
          var mapdata=res.data;
          let newview=this.state.view;
          var mapdata=res.data;
          for(var i=0;i<=mapdata.length-1;i++){
            var x=mapdata[i].lnglat.split(',')[0];
            var y=mapdata[i].lnglat.split(',')[1];
            var pointname = mapdata[i].pointname;
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
                popupTemplate: {
                  title:pointname,
                  content:"<table class='esri-widget__table' summary='属性和值列表'><tbody>"
                  +"<tr><th class='esri-feature__field-header'>点位名称</th><td class='esri-feature__field-data'>"+pointname+"</td></tr>"
                  +"<tr><th class='esri-feature__field-header'>监测网</th><td class='esri-feature__field-data'></td></tr>"
                  +"<tr><th class='esri-feature__field-header'>坐标位置.经度</th><td class='esri-feature__field-data'>"+x+"</td></tr>"
                  +"<tr><th class='esri-feature__field-header'>坐标位置.纬度</th><td class='esri-feature__field-data'>"+y+"</td></tr>"
                  +"<tr><th class='esri-feature__field-header'>基础数据</th><td class='esri-feature__field-data'></td></tr>"
                  +"<tr><th class='esri-feature__field-header'>实时数据</th><td class='esri-feature__field-data'></td></tr>"
                  +"<tr><th class='esri-feature__field-header'>数据总数</th><td class='esri-feature__field-data'></td></tr></tbody></table>"
                },
             });
              //显示图标
              _this.state.view.graphics.add(Graphic1);
          }
          
        }
      });
  }
   
  
  
  

  componentWillUpdate(nextProps) {
    var _this=this;
    this.state.view.popup.visible=false;
    // 返回上一层，清理地球图层
    if(nextProps.identify==0){
      this.removeAllmap();
    }

    // 点击小地球回到中心点
    if(nextProps.core=="core"){
      this.clean();
    }

  // 摄像头关闭图层
    if(nextProps.identify=="camera" && nextProps.camera==1){
      this.removeAllmap();
    }

    // 摄像头显示图层
    if(nextProps.identify=="camera"&& nextProps.camera==2){
        this.showcamera();
    }

    // 首页系统总览_矿区导航-总路网
    if(nextProps.identify=="Allroad"){
      this.allroad(nextProps.Allroad);
    }



    // 矿区导航-各个路网
    if(nextProps.identify=="network"){
      this.network(nextProps.network);
    }



    // 首页系统总览_空间分析
    if(nextProps.identify=="Spatia"){
      this.spatia(nextProps.Spatiadata.layerurl);
    }


    // 首页数据监测——山水
    if(nextProps.identify=="shanshui"){
      this.shanshui(nextProps.mountain);
    }
    



    // 首页数据监测——监测网
    if(nextProps.identify=="Monitoringdata"){
      this.Monitoringdata(nextProps.Monitorings.layerurl);
    }








    // 遥感监测:
    if(nextProps.identify=="remote"){
      this.remote(nextProps.remotedata);
    }

    // 遥感监测:历史图层各个年限
    if(nextProps.identify=="historyEveryone"){
      this.historyEveryone(nextProps.historyEveryone);
    }




    // 系统总揽:监测设备
    if(nextProps.identify=="monit"){
      this.monit(nextProps.monitdata.netid);
    }



    // 系统总揽:基础数据
    if(nextProps.identify=="database"){
      this.database(nextProps.newPost.netid);
    }
  }
  
  render() {
    return (
      <div className="ArcGISMap">
        <div className="mapDiv" id="mapDiv"></div>
        <Modal
              title="直播"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width="60%"
              footer={null}
              destroyOnClose={true}
            >
            <div style={{textAlign:"right",paddingBottom:"10px"}}>
              <Select
                labelInValue
                defaultValue={{ key: 'sd' }}
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                <Option value="hd">高清</Option>
                <Option value="sd">流畅</Option>
              </Select>
            </div>
              {/* <div id="playWind" style={{width: "100%", height: "100%"}}></div> */}
              <video style={{width:"100%",height:"100%"}} className="myPlayer" id="myPlayer1" autoPlay src={this.state.bf} controls playsInline webkit-playsinline={this.state.bof ? 1 : 0}></video>
              {/* <video style={{width:"100%",height:"100%"}} className="myPlayer" id="myPlayer2" autoPlay src="http://hls01open.ys7.com/openlive/72b0e54e4e4047edb0e8d3827dc98db0.m3u8" controls playsInline webkit-playsinline={this.state.bof ? 1 : 0}></video> */}
            </Modal>
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
  mountain: state.posts.mountain,
  core: state.posts.core,
  camera: state.posts.camera,
  historyEveryone: state.posts.historyEveryone,
})

ArcGISMap.propTypes = {
  AllroadGobai: PropTypes.func.isRequired,
  Core: PropTypes.func.isRequired,
  Cameras: PropTypes.func.isRequired,
  HistoricalLayer: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { AllroadGobai,Core,Cameras,HistoricalLayer })(ArcGISMap);
