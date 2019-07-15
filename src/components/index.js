/**
 * 路由组件出口文件

 */
//大数据
import Datamanage from './datashow/datamanage'
import Projectmanage from './datashow/projectmanage'
import MapShow from './datashow/MapShow'


//设备管理
import Monitor from './equipment/Monitor'
import ClaaMonitor from './equipment/ClaaMonitor'
import Evideo from './equipment/Evideo'

//系统预案
import MyPlan from './plan/MyPlan'
import Recommend from './plan/Recommend'
import Edit from './plan/Edit'
import Lookplan from './plan/Lookplan'
import MyLookplan from './plan/MyLookplan'
import Detailplan from './plan/detailplan'


//项目管理
import Scheme from './project/Scheme'
import Funds from './project/Funds'
import Monitorpro from './project/monitorpro'
import AssessRepro from './project/AssessRepro'
import SurveyRepro from './project/SurveyRepro'
import ProspectRepro from './project/ProspectRepro'
import DesignRepro from './project/DesignRepro'
import Construction from './project/Construction'
import Supervisor from './project/Supervisor'
import MonitorRepro from './project/MonitorRepro'
import Monitorprolook from './project/monitorprolook'
import Treatment from './project/Treatment'
import CheckAccept from './project/CheckAccept'
import YearAccept from './project/YearAccept'

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
import companyinfoEdit from "./systemmanage/companyinfoEdit";
import ProjectinfoEdit from "./systemmanage/projectinfoEdit";
// import Test from "./systemmanage/test";

export default {
  Datamanage,Projectmanage,MapShow,
  Monitor,ClaaMonitor,Evideo,
  MyPlan,Recommend,Edit,Detailplan,Lookplan,MyLookplan,
  Scheme,Funds,Monitorpro,AssessRepro,SurveyRepro,ProspectRepro,Supervisor,MonitorRepro,Monitorprolook,Treatment,CheckAccept,YearAccept,
  Dotequip,Threshold,ThresholdDot,Warning,Dotdetails,
  Companyinfo,Userinfo,DesignRepro,Construction,Equipmanage,Basicdata,companyinfoEdit,ProjectinfoEdit,
    // Test
};
