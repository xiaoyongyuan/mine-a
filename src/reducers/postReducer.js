import { Earth,Monit_Type,Remote_Type,Network_Type,CleanLayers_Type,Monitoring_Type,Spatia_Type,Allroad_Type,AllroadGobai_Type } from '../actions/types';
// reducer的作用: 返回新的状态

const initialState = {
  items: [],
  item: {},
  monitdata:{},
  identify:'',
  remotedata:'',
  network:{},
  Monitorings:{},
  Spatiadata:{},
  Allroad:'',
  AllroadGobai:{}
}

export default function (state = initialState, action) {
  switch (action.type) {
    // 首页系统总览,基础数据
    case Earth:
      return {
        ...state,
        identify:"database",
        item: action.payload
      }
    // 首页系统总览,监测设备
    case Monit_Type:
      return {
        ...state,
        identify:"monit",
        monitdata: action.payload
      }
    // 首页遥感监测
    case Remote_Type:
      return {
        ...state,
        identify:"remote",
        remotedata: action.payload
      }
    // 矿区导航-各个路网
    case Network_Type:
      return {
        ...state,
        identify:"network",
        network: action.payload
      }
    // 矿区导航-总路网
    case Allroad_Type:
      return {
        ...state,
        identify:"Allroad",
        Allroad: action.payload
      }
    // 矿区导航_总路网_数据回原组件
    case AllroadGobai_Type:
      return {
        ...state,
        AllroadGobai: action.payload
      }
    // 返回上一层，清理地球图层
    case CleanLayers_Type:
      return {
        ...state,
        identify:action.payload
      }
    // 首页数据监测
    case Monitoring_Type:
      return {
        ...state,
        identify:"Monitoringdata",
        Monitorings:action.payload
      }
    // 首页系统总览_空间分析
    case Spatia_Type:
      return {
        ...state,
        identify:"Spatia",
        Spatiadata:action.payload
      }
    default:
      return state;
  }
}