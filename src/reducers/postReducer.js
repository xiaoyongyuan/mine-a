import { Earth,Monit_Type,Remote_Type } from '../actions/types';
// reducer的作用: 返回新的状态

const initialState = {
  items: [],
  item: {},
  monitdata:{},
  identify:'',
  remotedata:''
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
    default:
      return state;
  }
}