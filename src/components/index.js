/**
 * 路由组件出口文件

 */
//大数据
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
//数据总览
//地质灾害数据
import Fissure from './geology/Fissure'
import Insar from './insar/insar'
import Sediment from './geology/sediment'
import Displacement from './geology/displacement'
import Shapechange from './geology/shapechange'
import Rainfall from './geology/rainfall'
import Soilpressure from './geology/soilpressure'
import Detaildata from './geology/detaildata'
//数据预览
import Aquifer from './overview/Aquifer'
import Landform from './overview/Landform'
import Pollution from './overview/Pollution'
import Soil from './overview/Soil'
//-----------
//数据管理
import Geologymanage from './manage/Geologymanage'
import Insarmanage from './manage/Insarmanage'
import Aquifermanage from './manage/Aquifermanage'
import Landformmanage from './manage/Landformmanage'
import Pollutionmanage from './manage/Pollutionmanage'
import Soilmanage from './manage/Soilmanage'



//设备管理
import Monitor from './equipment/Monitor'
import ClaaMonitor from './equipment/ClaaMonitor'
import Evideo from './equipment/Evideo'

//系统预案
import MyPlan from './plan/MyPlan'
import Recommend from './plan/Recommend'
import Edit from './plan/Edit'

export default {
  Datamanage,Projectmanage,
  Fissure,Insar,Sediment,Displacement,Shapechange,Rainfall,Soilpressure,Detaildata,
  
  Aquifer,Landform,Pollution,Soil,
  Geologymanage,Insarmanage,Aquifermanage,Landformmanage,Pollutionmanage,Soilmanage,
  Monitor,ClaaMonitor,Evideo,
  MyPlan,Recommend,Edit,

};
