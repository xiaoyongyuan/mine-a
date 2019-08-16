import { Earth,Monit_Type,Remote_Type } from './types';

// 分发操作
// 一,首页系统总览
// 一,1基础数据
export const ChangeEarth = postData => dispatch => {
  dispatch({
    type: Earth,
    payload: postData
  })
}
//  一,2监测设备
export const Monitoring = postData => dispatch => {
  dispatch({
    type: Monit_Type,
    payload: postData
  })
}


// 二,首页遥感监测
export const RemoteSensing = postData => dispatch => {
  dispatch({
    type: Remote_Type,
    payload: postData
  })
}


