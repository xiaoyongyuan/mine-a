import React, { Component } from 'react'
import esriLoader from 'esri-loader'

import './mapshow.less'

export default class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    // this.tileMapUrl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
  }
  componentDidMount() {
    this.initMap()
  }
  initMap() {
    const mapURL = {
      url: "https://js.arcgis.com/4.11/"
      //  url:window.g.mapURL+"/arcgis/arcgis_js_api/library/4.11/dojo/dojo.js"
    };
    esriLoader.loadModules([
      "esri/tasks/Locator",
      "esri/Map",
      "esri/Basemap",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/layers/WebTileLayer",
      "esri/widgets/BasemapToggle",
      "esri/widgets/Compass",
      "esri/widgets/NavigationToggle",
      "esri/widgets/Zoom",
      "esri/Graphic",

      "dojo/domReady!"
    ], mapURL).then(([
      Locator,
      Map,
      Basemap,
      SceneView,
      FeatureLayer,
      WebTileLayer,
      BasemapToggle,
      Compass,
      NavigationToggle,
      Zoom,
      Graphic


    ]) => {

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

      var locatorTask = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      });

      // Create a Map instance
      let map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
      });



      // map.addLayer(featureLayer,1);
      // Create a MapView instance (for 2D viewing) and reference the map instance
      // let view = new MapView({
      //   center : [120.2, 32.1],
      //   map: map,
      //   container : "mapDiv",
      //   zoom:5
      // });
      let view = new SceneView({
        // center : [110.3038,39.3027],
        map: map,
        container: "mapDiv",
        // qualityProfile: "high"

        //camera: initCamera
      });
      var lng = -111.59568463900906, lat = 40.914345945609;
      view.goTo({
        // center: [110.3038,39.3027],
        heading: 246.50443209217798,
        tilt: 73.67726241280418,
        center: [lng, lat],
        zoom: 16,
      });// latitude: 40.713906,
      // longitude: -111.848111,
      //这段主要是为了寻找合适的camera视角，设置好了就注释掉了
      view.on("click", function (e) {
        console.log(view.center);
      });
      view.when(function () {
        var toggle = new BasemapToggle({
          titleVisible: true,
          view: view,
          nextBasemap: stamen
        });

         




        // var featureLayer = new FeatureLayer({
        //   url:
        //     "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/OpenBeerDatabase/FeatureServer/0",
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
          view: view
        });
        // view.ui.add([toggle,zoom,navigationToggle,compass], "top-right");
        // view.ui.add(compass, "bottom-right");
        view.ui._removeComponents(["attribution", "navigation-toggle", "compass", "zoom"]);
        view.ui.add(zoom, "bottom-right");
        view.ui.add(toggle, "top-right");

        var g = new Graphic({
          "geometry": { "type": "point", "latitude": lat, "longitude": lng, "spatialReference": { "wkid": 4326 } },
          "symbol": { "type": "simple-marker", "color": [226, 119, 40], },
          "attributes": { "id": 1, "name": "名称XXXXX", "value": "结果YYYYY" },
          "popupTemplate": {
              "content": "<p class='popup-con-title'>点位详情</p>"
              + "<div class='popup-con-con'>"
              + "<div>坐标位置.经度：" + lng + "</div>"
              + "<div>坐标位置.纬度：" + lat + "</div>"
              + "<div>形变监测网</div>"
              + "</div>"
          }
      });
      view.graphics.add(g);
      var g1 = new Graphic({
        "geometry": { "type": "point", "latitude": lat+0.01, "longitude": lng, "spatialReference": { "wkid": 4326 } },
        "symbol": { "type": "simple-marker", "color": [226, 119, 40], },
        "attributes": { "id": 1, "name": "名称XXXXX", "value": "结果YYYYY" },
        "popupTemplate": {
            "content": "<p class='popup-con-title'>点位详情</p>"
            + "<div class='popup-con-con'>"
            + "<div>坐标位置.经度：" + lng + "</div>"
            + "<div>坐标位置.纬度：" + lat + "</div>"
            + "<div>形变监测网</div>"
            + "</div>"
        }
    });
    view.graphics.add(g1);

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

      //添加图层
      // let featureLayer = new FeatureLayer({
      //   url: "https://beidou.esrichina.com/server/rest/services/Hosted/test3d_WFL1/FeatureServer"
      // })
      // map.add(featureLayer);



    })
  }
  render() {
    return (
      <div className="ArcGISMap">
        <div className="mapDiv" id="mapDiv"></div>
      </div>
    )
  }
}
