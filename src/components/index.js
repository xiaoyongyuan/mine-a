/**
 * 路由组件出口文件

 */
//大数据
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
import MapShow from './datashow/MapShow'

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
import Lookplan from './plan/Lookplan'
import Detailplan from './plan/detailplan'


//项目管理
import Scheme from './project/Scheme'
import Funds from './project/Funds'
import Addproject from './project/addproject'
import Monitorpro from './project/monitorpro'
import AssessRepro from './project/AssessRepro'
import SurveyRepro from './project/SurveyRepro'
import ProspectRepro from './project/ProspectRepro'
import DesignRepro from './project/DesignRepro'
import Construction from './project/Construction'
import Supervisor from './project/Supervisor'
import MonitorRepro from './project/MonitorRepro'
import Treatment from './project/Treatment'
import CheckAccept from './project/CheckAccept'

//监测数据
import Dotequip from './monitor/Dotequip'
import Threshold from './monitor/Threshold'
import ThresholdDot from './monitor/ThresholdDot'
import Warning from './monitor/Warning'
import Dotdetails from './monitor/Dotdetails'

//系统管理
import Companyinfo from './systemmanage/companyinfo'
import Userinfo from './systemmanage/userinfo'
import Equipmanage from './systemmanage/equipmanage'
import Basicdata from './systemmanage/basicdata'

export default {
  Datamanage,Projectmanage,MapShow,
  Insar,Detaildata,Soilbreathe,
  Aquifer,Landform,Pollution,Soil,Preview,Geology,
  Insarmanage,Aquifermanage,Landformmanage,Pollutionmanage,Soilmanage,
  Monitor,ClaaMonitor,Evideo,
  MyPlan,Recommend,Edit,Detailplan,Lookplan,
  Scheme,Funds,Addproject,Monitorpro,AssessRepro,SurveyRepro,ProspectRepro,Supervisor,MonitorRepro,Treatment,CheckAccept,
  Dotequip,Threshold,ThresholdDot,Warning,Dotdetails,
  Companyinfo,Userinfo,DesignRepro,Construction,Equipmanage,Basicdata,
};
