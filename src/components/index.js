/**
 * 路由组件出口文件

 */
//大数据
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
//数据总览明细
import Detaildata from './geology/detaildata'

//数据预览
import Aquifer from './overview/Aquifer'
import Insar from './overview/insar'
import Soilbreathe from './overview/soilbreathe'
import Geology from './overview/geology'
import Landform from './overview/Landform'
import Pollution from './overview/Pollution'
import Soil from './overview/Soil'
import Preview from './overview/preview'
//-----------
//数据管理
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
import Detailplan from './plan/detailplan'

export default {
  Datamanage,Projectmanage,
  Insar,Detaildata,Soilbreathe,
  
  Aquifer,Landform,Pollution,Soil,Preview,Geology,
  Insarmanage,Aquifermanage,Landformmanage,Pollutionmanage,Soilmanage,
  Monitor,ClaaMonitor,Evideo,
  MyPlan,Recommend,Edit,Detailplan,

};
