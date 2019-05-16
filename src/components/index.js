/**
 * 路由组件出口文件

 */
//大数据
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
//地质灾害数据
import Fissure from './geology/Fissure'
import Insar from './geology/insar'
import Sediment from './geology/sediment'
import Displacement from './geology/displacement'
import Shapechange from './geology/shapechange'
import Rainfall from './geology/rainfall'
import Soilpressure from './geology/soilpressure'
import Detaildata from './geology/detaildata'
//含水层监测数据
import Waterlevel from './aquifer/waterlevel'
import Pressure from './aquifer/pressure'
import Qualityonline from './aquifer/qualityonline'
import Qualityeasy from './aquifer/qualityeasy'
import Qualityentirety from './aquifer/qualityentirety'
//地形地貌检测数据
import Landform from './landform/landform'
//水土污染监测数据
import Waterdetect from './pollution/waterdetect'
import Soildetect from './pollution/soildetect'
//土地损毁与复垦监测数据
import Highmark from './soil/highmark'
import Soilmar from './soil/soilmar'
import Reclamation from './soil/reclamation'
//地质灾害数据管理
import Mfissure from './geologymanage/fissure'
import Minsar from './geologymanage/insar'
import Msediment from './geologymanage/sediment'
import Mdisplacement from './geologymanage/displacement'
import Mshapechange from './geologymanage/shapechange'
import Mrainfall from './geologymanage/rainfall'
import Msoilpressure from './geologymanage/soilpressure'
//含水层数据管理
import Mwaterlevel from './aquifermanage/waterlevel'
import Mpressure from './aquifermanage/pressure'
import Monlinetest from './aquifermanage/onlinetest'
import Mqualityeasy from './aquifermanage/qualityeasy'
import Mqualityentirety from './aquifermanage/qualityentirety'
//地形地貌数据管理
import Mhigh from './landformmanage/high'
import Mhighupload from './landformmanage/highupload'
//水土污染数据管理
import Monlinesoil from './pollutionmanage/onlinesoil'
import Monlinewater from './pollutionmanage/onlinewater'
import Msoil from './pollutionmanage/soil'
import Mwater from './pollutionmanage/water'
//土地损毁与复垦数据管理
import Mhighmark from './soilmanage/highmark'
import Msoilmar from './soilmanage/soilmar'
import Mreclamation from './soilmanage/reclamation'
//设备管理
import Cnss from './equipment/cnss'
import Efissure from './equipment/fissure'
import Epressure from './equipment/pressure'
import Equality from './equipment/quality'
import Erainfall from './equipment/rainfall'
import Esoilpressure from './equipment/soilpressure'
import Evideo from './equipment/video'

export default {
  Datamanage,Projectmanage,
  Fissure,Insar,Sediment,Displacement,Shapechange,Rainfall,Soilpressure,Detaildata,
  Waterlevel,Pressure,Qualityonline,Qualityeasy,Qualityentirety,
  Landform,
  Waterdetect,Soildetect,
  Highmark,Soilmar,Reclamation,
  Mfissure,Minsar,Msediment,Mdisplacement,Mshapechange,Mrainfall,Msoilpressure,
  Mwaterlevel,Mpressure,Monlinetest,Mqualityeasy,Mqualityentirety,
  Mhigh,Mhighupload,
  Monlinesoil,Monlinewater,Msoil,Mwater,
  Mhighmark,Msoilmar,Mreclamation,
  Cnss,Efissure,Epressure,Equality,Erainfall,Esoilpressure,Evideo
};
