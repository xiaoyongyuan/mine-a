/**
 * 路由组件出口文件

 */
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
//数据总览
//地质灾害
import Fissure from './geology/Fissure'
import Insar from './geology/insar'
import Sediment from './geology/sediment'

//含水层监测数据
import Waterlevel from './aquifer/waterlevel'


export default {
  Datamanage,Projectmanage,
  Fissure,Insar,Sediment,
  Waterlevel,
};
