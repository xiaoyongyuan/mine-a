import { Core_Type,Earth,Monit_Type,Remote_Type,Network_Type,CleanLayers_Type,
  Monitoring_Type,Spatia_Type,Allroad_Type,AllroadGobai_Type,Changelayers_Type,
  Camera_Type,Location_Type,HistoricalLayer_Type,HistoryEveryone_Type
 } from './types';
// 分发操作
// 点击小地球回到中心点
export const Core = postData => dispatch => {
  dispatch({
    type: Core_Type,
    payload: postData
  })
}
// 直播摄像头
export const Cameras = postData => dispatch => {
  dispatch({
    type: Camera_Type,
    payload: postData
  })
}
// 菜单栏
export const Location = postData => dispatch => {
  dispatch({
    type: Location_Type,
    payload: postData
  })
}

// 一,系统总览——1基础数据
export const ChangeEarth = postData => dispatch => {
  dispatch({
    type: Earth,
    payload: postData
  })
}


//  一,系统总览——+2监测设备
export const Monitoring = postData => dispatch => {
  
  dispatch({
    type: Monit_Type,
    payload: postData
  })
}


// 一,3首页系统总览——矿区导航各个路网
export const Networks = network => dispatch => {
  dispatch({
    type: Network_Type,
    payload: network
  })
}
// 一,3.1首页系统总览——矿区导航总路网
export const Allroad  = network => dispatch => {
  dispatch({
    type: Allroad_Type,
    payload: network
  })
}

// 一,3.2首页系统总览——矿区导航总路网数据回原组件
export const AllroadGobai  = network => dispatch => {
  dispatch({
    type: AllroadGobai_Type,
    payload: network
  })
}

// 一,4首页系统总览——空间分析各个分析
export const Spatia = Spatias => dispatch => {
  dispatch({
    type: Spatia_Type,
    payload: Spatias
  })
}

// 二,1,首页遥感监测
export const RemoteSensing = postData => dispatch => {
  dispatch({
    type: Remote_Type,
    payload: postData
  })
}

// 二,2,首页遥感监测——历史图层
export const HistoricalLayer = postData => dispatch => {
  dispatch({
    type: HistoricalLayer_Type,
    payload: postData
  })
}

// 二,3,首页遥感监测——历史图层_点击各个年限图层
export const HistoryEveryone = postData => dispatch => {
  dispatch({
    type: HistoryEveryone_Type,
    payload: postData
  })
}

// 三,1,首页数据监测--监测网
export const Monitoringdatas = datas => dispatch => {
  dispatch({
    type: Monitoring_Type,
    payload: datas
  })
}
// 三,2,首页数据监测--山水。。。
export const changelayers = datas => dispatch => {
  dispatch({
    type: Changelayers_Type,
    payload: datas
  })
}

// 四，返回上一层，清理地球图层
export const CleanLayers = layers => dispatch => {
  dispatch({
    type: CleanLayers_Type,
    payload: layers
  })
}




